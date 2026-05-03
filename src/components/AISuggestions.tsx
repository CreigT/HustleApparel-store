import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Sparkles, Loader2, RefreshCw } from 'lucide-react';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default function AISuggestions() {
  const [prompt, setPrompt] = useState('');
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      // 1. Generate text suggestion/concept
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Act as a street fashion designer. Create a unique graphic T-shirt design concept based on this theme: "${prompt}". Provide a name for the design and a detailed visual description. Format: { "name": "...", "description": "..." }`,
        config: { responseMimeType: 'application/json' }
      });
      
      const resData = JSON.parse(response.text);
      setSuggestion(`${resData.name}: ${resData.description}`);

      // 2. Generate a visual representation (Using the nano-banana image models as per skill)
      const imageResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            { text: `A flat layout of a streetwear graphic T-shirt design. The design on the shirt is: ${resData.description}. Modern, high-fashion, minimalist, black background, photorealistic.` }
          ]
        }
      });

      for (const part of imageResponse.candidates[0].content.parts) {
        if (part.inlineData) {
          setGeneratedImage(`data:image/png;base64,${part.inlineData.data}`);
          break;
        }
      }
    } catch (error) {
      console.error('AI error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="ai-designer" className="bg-[#151619] border border-white/10 rounded-2xl p-8 mb-20 shadow-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Sparkles className="text-orange-500" />
        <h2 className="text-2xl font-bold uppercase tracking-tighter">AI Design Lab</h2>
      </div>
      
      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <p className="text-zinc-400 mb-6 text-sm">
            Enter a vibe (e.g., "Web3 Cyberpunk", "Cali Sunset Hustle") and let our AI 
            engineer a custom design concept for your next drop.
          </p>
          
          <div className="flex flex-col gap-4">
            <input 
              type="text" 
              placeholder="Enter your design vibe..." 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="bg-black border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
              id="ai-prompt-input"
            />
            <button 
              onClick={handleGenerate}
              disabled={loading}
              className="bg-orange-500 hover:bg-orange-600 disabled:bg-zinc-700 text-black font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-95"
              id="generate-design-btn"
            >
              {loading ? <Loader2 className="animate-spin" /> : <RefreshCw size={18} />}
              {loading ? 'Hustling...' : 'Generate Design Concept'}
            </button>
          </div>

          {suggestion && (
            <div className="mt-8 p-4 bg-black/50 border-l-2 border-orange-500 rounded-r-lg" id="ai-suggestion-text">
              <p className="text-white font-medium uppercase text-xs mb-2 tracking-widest text-orange-500 italic">Hustle Logic Suggestion</p>
              <p className="text-zinc-300 text-sm leading-relaxed">{suggestion}</p>
            </div>
          )}
        </div>

        <div className="aspect-[3/4] bg-black rounded-lg border border-white/5 flex items-center justify-center relative overflow-hidden group">
          {generatedImage ? (
            <img 
              src={generatedImage} 
              alt="AI Generated Design" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="text-zinc-800 flex flex-col items-center gap-4 text-center p-10">
              <Sparkles size={64} className="opacity-20" />
              <p className="text-zinc-600 uppercase text-xs font-bold tracking-[0.2em]">Preview will appear here</p>
            </div>
          )}
          {loading && (
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="animate-spin text-orange-500" size={32} />
                <span className="text-zinc-500 text-xs font-bold uppercase animate-pulse">Running Neural Networks</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { google } from 'googleapis';
import webpush from 'web-push';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

// Setup VAPID keys for push notifications
if (process.env.VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY && process.env.VAPID_EMAIL) {
  webpush.setVapidDetails(
    `mailto:${process.env.VAPID_EMAIL}`,
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
  );
}

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Simple Auth Storage (In-memory for prototype, use DB for production)
let googleTokens: any = null;

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.APP_URL}/auth/callback`
);

// API Routes
app.get('/api/auth/google/url', (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/spreadsheets',
      'https://www.googleapis.com/auth/gmail.send'
    ],
    prompt: 'consent'
  });
  res.json({ url });
});

app.get(['/auth/callback', '/auth/callback/'], async (req, res) => {
  const { code } = req.query;
  try {
    const { tokens } = await oauth2Client.getToken(code as string);
    googleTokens = tokens;
    res.send(`
      <html>
        <body>
          <script>
            window.opener.postMessage({ type: 'OAUTH_AUTH_SUCCESS' }, '*');
            window.close();
          </script>
          <p>Connected successfully! You can close this window.</p>
        </body>
      </html>
    `);
  } catch (error) {
    res.status(500).send('Authentication failed');
  }
});

app.get('/api/auth/status', (req, res) => {
  res.json({ connected: !!googleTokens });
});

// Inventory logic (Google Sheets)
app.post('/api/order', async (req, res) => {
  const { items, customerEmail, customerName } = req.body;
  
  if (!googleTokens) {
    return res.status(401).json({ error: 'Google account not connected' });
  }

  try {
    oauth2Client.setCredentials(googleTokens);
    const sheets = google.sheets({ version: 'v4', auth: oauth2Client });
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

    // 1. Record in Google Sheets (Simplified)
    // Assuming a spreadsheet exists or using a default one (would need ID in env)
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
    if (spreadsheetId) {
      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: 'Sheet1!A:E',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [[new Date().toISOString(), customerName, customerEmail, JSON.stringify(items), 'Ordered']]
        }
      });
    }

    // 2. Send Email Confirmation
    const rawEmail = [
      `To: ${customerEmail}`,
      'Subject: Order Confirmation - Hustle Apparel',
      '',
      `Hi ${customerName},`,
      '',
      'Thank you for your order! We are processing it now.',
      '',
      `Items: ${items.map((i: any) => i.name).join(', ')}`,
      '',
      'Stay Hustlin\',',
      'Hustle Apparel Team'
    ].join('\n');

    const encodedEmail = Buffer.from(rawEmail).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    
    await gmail.users.messages.send({
      userId: 'me',
      requestBody: { raw: encodedEmail }
    });

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to process order' });
  }
});

// Push Notification Subscriptions
let subscriptions: any[] = [];
app.post('/api/notifications/subscribe', (req, res) => {
  const subscription = req.body;
  subscriptions.push(subscription);
  res.status(201).json({});
});

app.post('/api/notifications/broadcast', async (req, res) => {
  const { title, body } = req.body;
  const payload = JSON.stringify({ title, body });

  const notifications = subscriptions.map(sub => 
    webpush.sendNotification(sub, payload).catch(err => console.error('Push error:', err))
  );

  await Promise.all(notifications);
  res.json({ success: true });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import apiRouter from './api.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '../..');
const app = express();
const port = 3000;
const origins = (process.env.CORS_ORIGINS || '').split(',').map((v) => v.trim()).filter(Boolean);
const roleRoutes: Record<string, Set<string>> = {
  learner: new Set(['dashboard','subjects','course','path','lesson','assessments','assessment-practice','assessment-assignment','assessment-topic-test','assessment-exam','progress','community','rafiki','announcements','subscription']),
  tutor: new Set(['dashboard','classes','class-create','class-manage','class-assignments','content','content-text','content-video','content-audio','content-pdf','content-shorts','content-live','assessments','assessment-assignment','assessment-quiz','assessment-test','assessment-exam','live','live-studio','live-integrations','live-evidence','community','learner-insights','question-bank','question-bank-import','question-bank-ai','announcements']),
  admin: new Set(['dashboard','curriculum','users','subscriptions','community','question-bank','question-bank-import','question-bank-ai','announcements','content-governance','analytics','settings']),
  crm: new Set(['dashboard','leads','customers','schools','campaigns','newsletters','retention','automations','support','subscriptions','reports','analytics'])
};

app.set('trust proxy', 1);
app.disable('x-powered-by');
app.use(helmet({ 
  contentSecurityPolicy: false,
  frameguard: false,
  crossOriginEmbedderPolicy: false 
}));
app.use(compression());
app.use(cors({ origin: (origin, cb) => { if (!origin || origins.length === 0 || origins.includes(origin)) return cb(null, true); return cb(new Error('Origin not allowed')); }, credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use('/api', rateLimit({ windowMs: 60_000, limit: 180, standardHeaders: 'draft-7', legacyHeaders: false }));

app.get('/healthz', (_req, res) => res.status(200).json({ status: 'ok', service: 'tesea-web-api', time: new Date().toISOString() }));
app.get('/readyz', (_req, res) => res.status(200).json({ status: 'ready' }));
app.get('/assets/config.js', (_req, res) => {
  const publicConfig = {
    apiBaseUrl: process.env.API_BASE_URL || '',
    apiVersion: process.env.API_VERSION || 'v1',
    mode: process.env.API_MODE || (process.env.NODE_ENV === 'production' ? 'live' : 'mock'),
    oauth: {
      google: { clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || '', redirectUri: process.env.GOOGLE_OAUTH_REDIRECT_URI || '' },
      microsoft: { clientId: process.env.MICROSOFT_OAUTH_CLIENT_ID || '', tenant: process.env.MICROSOFT_OAUTH_TENANT || 'common', redirectUri: process.env.MICROSOFT_OAUTH_REDIRECT_URI || '' }
    },
    rafikiAi: {
      enabled: process.env.RAFIKI_AI_ENABLED === 'true' || true,
      provider: process.env.RAFIKI_AI_PROVIDER || 'custom',
      model: process.env.RAFIKI_AI_MODEL || 'gemini-1.5-flash',
      endpoint: process.env.RAFIKI_AI_ENDPOINT || '/api/v1/ai/chat',
      maxTokens: parseInt(process.env.RAFIKI_AI_MAX_TOKENS || '2048', 10),
      temperature: parseFloat(process.env.RAFIKI_AI_TEMPERATURE || '0.7')
    },
    payment: {
      enabled: process.env.PAYMENT_ENABLED === 'true' || true,
      provider: process.env.PAYMENT_PROVIDER || 'azampay',
      mode: process.env.PAYMENT_MODE || 'sandbox',
      currency: process.env.PAYMENT_CURRENCY || 'TZS',
      merchantId: process.env.PAYMENT_MERCHANT_ID || '',
      publicKey: process.env.PAYMENT_PUBLIC_KEY || '',
      callbackUrl: process.env.PAYMENT_CALLBACK_URL || '/api/v1/payments/webhook'
    }
  };
  res.type('application/javascript').set('Cache-Control', 'no-store').send(`window.TESEA_CONFIG=${JSON.stringify(publicConfig)};`);
});
app.use('/api/v1', apiRouter);

app.use(express.static(root, { index: false, maxAge: process.env.NODE_ENV === 'production' ? '1h' : 0, etag: true }));
for (const slug of ['subjects','learning-path','plans','about']) app.get(`/${slug}/`, (_req, res) => res.sendFile(path.join(root, slug, 'index.html')));
app.get('/', (_req, res) => res.sendFile(path.join(root, 'index.html')));
app.get('/app/signin', (_req, res) => res.sendFile(path.join(root, 'index.html')));
app.get('/app/signup', (_req, res) => res.sendFile(path.join(root, 'index.html')));
app.get('/app/:role/:page', (req, res) => {
  const role = req.params.role === 'super-admin' ? 'admin' : req.params.role;
  if (!roleRoutes[role] || !roleRoutes[role].has(req.params.page)) return res.status(404).json({ code: 'ROUTE_NOT_FOUND', role, page: req.params.page });
  return res.sendFile(path.join(root, 'index.html'));
});
for (const role of ['learner','tutor','admin','super-admin','crm']) {
  const canonical = role === 'super-admin' ? 'admin' : role;
  app.get(`/${role}`, (_req, res) => res.redirect(302, `/app/${canonical}/dashboard`));
}

app.get(/.*/, (req, res) => {
  if (req.path.includes('.')) return res.status(404).json({ code: 'NOT_FOUND' });
  return res.status(404).sendFile(path.join(root, 'index.html'));
});
app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => { console.error(err); res.status(500).json({ code: 'INTERNAL_ERROR', message: 'Unexpected server error' }); });
app.listen(port, () => console.log(`TESEA web + API listening on :${port}`));

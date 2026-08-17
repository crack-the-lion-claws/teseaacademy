import { Router } from 'express';
import { z } from 'zod';
import { createRecord, patchRecord, store, type JsonRecord, type Role } from './store.js';

const router = Router();
const email = z.string().email();
const roleSchema = z.enum(['learner', 'tutor', 'admin', 'crm']);
const bodyObject = z.record(z.string(), z.unknown());

function issueSession(user: {id: string; name: string; email: string; role: Role; form?: string}) {
  return { user, token: `dev-access-${user.id}-${Date.now()}`, refreshToken: `dev-refresh-${user.id}-${Date.now()}` };
}
function collection<T extends JsonRecord>(items: T[]) { return { data: items, count: items.length }; }
function findById(items: JsonRecord[], id: string) { return items.find((item) => item.id === id); }
function createIn(items: JsonRecord[], prefix: string, body: JsonRecord) { const record = createRecord(prefix, body); items.unshift(record); return record; }

router.post('/auth/signup', (req, res) => {
  const parsed = z.object({ name: z.string().min(2), email, password: z.string().min(8), form: z.string().optional() }).safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ code: 'VALIDATION_ERROR', issues: parsed.error.issues });
  if (store.users.some((u) => u.email.toLowerCase() === parsed.data.email.toLowerCase())) return res.status(409).json({ code: 'EMAIL_EXISTS', message: 'An account already exists for this email.' });
  const user = { id: `USR-${Date.now()}`, name: parsed.data.name, email: parsed.data.email, role: 'learner' as Role, form: parsed.data.form || 'Form 3' };
  store.users.push(user);
  return res.status(201).json(issueSession(user));
});
router.post('/auth/signin', (req, res) => {
  const parsed = z.object({ email, password: z.string().min(1) }).safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ code: 'VALIDATION_ERROR', issues: parsed.error.issues });
  let user = store.users.find((u) => u.email.toLowerCase() === parsed.data.email.toLowerCase());
  if (!user) {
    user = { id: `USR-${Date.now()}`, name: parsed.data.email.split('@')[0], email: parsed.data.email, role: 'learner' as Role, form: 'Form 3' };
    store.users.push(user);
  }
  return res.json(issueSession(user));
});
router.post('/auth/refresh', (req, res) => res.json(issueSession(store.users[0])));
router.get('/auth/me', (req, res) => res.json({ user: store.users[0] }));

router.get('/users', (_req, res) => res.json(collection(store.users as unknown as JsonRecord[])));
router.post('/users', (req, res) => {
  const parsed = z.object({ name: z.string().min(2), email, role: roleSchema, form: z.string().optional() }).safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ code: 'VALIDATION_ERROR', issues: parsed.error.issues });
  const user = { id: `USR-${Date.now()}`, ...parsed.data };
  store.users.push(user);
  return res.status(201).json(user);
});
router.get('/users/:userId', (req, res) => {
  const user = store.users.find((u) => u.id === req.params.userId);
  return user ? res.json(user) : res.status(404).json({ code: 'NOT_FOUND' });
});
router.patch('/users/:userId', (req, res) => {
  const user = store.users.find((u) => u.id === req.params.userId);
  if (!user) return res.status(404).json({ code: 'NOT_FOUND' });
  Object.assign(user, req.body);
  return res.json(user);
});

const subjects = [
  ['MTH','Mathematics'],['ENG','English Language'],['KIS','Kiswahili'],['BIO','Biology'],['CHE','Chemistry'],['PHY','Physics'],['GEO','Geography'],['HIS','History'],['CIV','Civics'],['CSC','Computer Science']
].map(([id, name]) => ({ id, name }));
router.get('/curriculum/subjects', (_req, res) => res.json({ data: subjects }));
router.get('/curriculum/subjects/:subjectId/forms/:formId/tree', (req, res) => res.json({ subjectId: req.params.subjectId, formId: req.params.formId, topics: [], version: 1 }));
router.put('/curriculum/subjects/:subjectId/forms/:formId/tree', (req, res) => res.json({ subjectId: req.params.subjectId, formId: req.params.formId, ...req.body, updatedAt: new Date().toISOString() }));

for (const [path, key, prefix] of [
  ['/lessons', 'lessons', 'LES'], ['/assessments', 'assessments', 'ASM'], ['/classes', 'classes', 'CLS'], ['/community/posts', 'communityPosts', 'POST'],
  ['/crm/leads', 'crmLeads', 'LEAD'], ['/crm/campaigns', 'crmCampaigns', 'CMP'], ['/support/cases', 'supportCases', 'SUP'], ['/announcements', 'announcements', 'ANN']
] as const) {
  router.get(path, (_req, res) => res.json(collection(store[key])));
  router.post(path, (req, res) => {
    const parsed = bodyObject.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ code: 'VALIDATION_ERROR' });
    return res.status(201).json(createIn(store[key], prefix, parsed.data));
  });
}

router.post('/classes/:classId/roster/import', (req, res) => res.status(202).json({ jobId: `ROSTER-${Date.now()}`, classId: req.params.classId, status: 'accepted' }));
router.post('/assessments/:assessmentId/attempts', (req, res) => res.status(201).json(createRecord('ATT', { assessmentId: req.params.assessmentId, status: 'in_progress' })));
router.post('/attempts/:attemptId/submit', (req, res) => res.json({ attemptId: req.params.attemptId, status: 'submitted', submittedAt: new Date().toISOString() }));
router.get('/learners/:learnerId/evidence', (req, res) => res.json({ learnerId: req.params.learnerId, mastery: [], readiness: 0 }));
router.post('/live-sessions', (req, res) => res.status(201).json(createRecord('LIVE', req.body)));
router.post('/integrations/meetings/:provider/connect', (req, res) => res.json({ provider: req.params.provider, status: 'configuration_required' }));
router.post('/community/posts/:postId/report', (req, res) => {
  const c = createIn(store.moderationCases, 'MOD', { postId: req.params.postId, source: 'community-report', status: 'open' });
  return res.status(201).json(c);
});
router.get('/moderation/cases', (_req, res) => res.json(collection(store.moderationCases)));
router.post('/moderation/posts/:postId/hide', (req, res) => res.json({ postId: req.params.postId, visibility: 'hidden' }));
router.post('/moderation/posts/:postId/restore', (req, res) => res.json({ postId: req.params.postId, visibility: 'visible' }));
router.delete('/moderation/posts/:postId', (req, res) => {
  const i = store.communityPosts.findIndex((p) => p.id === req.params.postId); if (i >= 0) store.communityPosts.splice(i, 1); return res.status(204).send();
});
router.get('/subscriptions/me', (_req, res) => res.json({ status: 'trial', planId: 'free', entitlement: 'introductory-access' }));
router.get('/subscriptions/me/invoices', (_req, res) => res.json({ data: [] }));
router.post('/subscriptions/checkout', (req, res) => res.status(201).json({ id: `CHK-${Date.now()}`, status: 'provider_configuration_required', planId: req.body?.planId }));
router.post('/crm/leads/:leadId/convert', (req, res) => {
  const lead = findById(store.crmLeads, req.params.leadId); if (!lead) return res.status(404).json({ code: 'NOT_FOUND' }); patchRecord(lead, { stage: 'Active' }); return res.json({ lead, converted: true });
});
router.get('/platform/settings', (_req, res) => res.json(store.settings));
router.put('/platform/settings', (req, res) => { store.settings = { ...store.settings, ...req.body, updatedAt: new Date().toISOString() }; return res.json(store.settings); });
router.post('/events', (req, res) => { const event = createIn(store.events, 'EV', req.body || {}); return res.status(202).json(event); });
router.get('/events', (_req, res) => res.json(collection(store.events)));

router.use((req, res) => res.status(501).json({ code: 'API_CONTRACT_NOT_IMPLEMENTED', message: 'Route exists as a contract boundary but needs a production service adapter.', method: req.method, path: req.originalUrl }));

export default router;

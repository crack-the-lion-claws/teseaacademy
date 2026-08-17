export type Role = 'learner' | 'tutor' | 'admin' | 'crm';
export type JsonRecord = Record<string, unknown>;

const now = () => new Date().toISOString();
const id = (prefix: string) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

export const store = {
  users: [
    { id: 'USR-DEMO-LEARNER', name: 'Demo Learner', email: 'learner@tesea.local', role: 'learner' as Role, form: 'Form 3' },
    { id: 'USR-DEMO-TUTOR', name: 'Demo Tutor', email: 'tutor@tesea.local', role: 'tutor' as Role },
    { id: 'USR-DEMO-ADMIN', name: 'Demo Admin', email: 'admin@tesea.local', role: 'admin' as Role },
    { id: 'USR-DEMO-CRM', name: 'Demo CRM', email: 'crm@tesea.local', role: 'crm' as Role }
  ],
  classes: [] as JsonRecord[],
  lessons: [] as JsonRecord[],
  assessments: [] as JsonRecord[],
  communityPosts: [] as JsonRecord[],
  moderationCases: [] as JsonRecord[],
  crmLeads: [] as JsonRecord[],
  crmCampaigns: [] as JsonRecord[],
  supportCases: [] as JsonRecord[],
  announcements: [] as JsonRecord[],
  events: [] as JsonRecord[],
  settings: {} as JsonRecord
};

export function createRecord(prefix: string, data: JsonRecord): JsonRecord {
  return { id: id(prefix), ...data, createdAt: now(), updatedAt: now() };
}

export function patchRecord(record: JsonRecord, data: JsonRecord): JsonRecord {
  Object.assign(record, data, { updatedAt: now() });
  return record;
}

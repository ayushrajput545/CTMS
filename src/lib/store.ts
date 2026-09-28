import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User, Study, Site, Participant, SafetyEvent, ComplianceItem, AuditLog } from "./types";
import { MOCK_USERS, MOCK_STUDIES, MOCK_SITES, MOCK_PARTICIPANTS, MOCK_SAFETY_EVENTS, MOCK_COMPLIANCE, MOCK_AUDIT } from "./mock-data";

interface AppState {
  currentUser: User | null;
  login: (email: string) => void;
  logout: () => void;

  users: User[];
  studies: Study[];
  sites: Site[];
  participants: Participant[];
  safetyEvents: SafetyEvent[];
  complianceItems: ComplianceItem[];
  auditLogs: AuditLog[];

  addSafetyEvent: (event: Omit<SafetyEvent, "id" | "status" | "caseId">) => void;
  updateStudyProgress: (studyId: string, newProgress: number) => void;
  addAuditLog: (action: string, module: string, record: string) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      currentUser: null,
      users: MOCK_USERS,
      studies: MOCK_STUDIES,
      sites: MOCK_SITES,
      participants: MOCK_PARTICIPANTS,
      safetyEvents: MOCK_SAFETY_EVENTS,
      complianceItems: MOCK_COMPLIANCE,
      auditLogs: MOCK_AUDIT,

      login: (email: string) =>
        set((state) => ({
          currentUser: state.users.find((u) => u.email === email) || null,
        })),

      logout: () => set({ currentUser: null }),

      addSafetyEvent: (event) =>
        set((state) => {
          const newEvent: SafetyEvent = {
            ...event,
            id: `se${state.safetyEvents.length + 1}`,
            caseId: `SAE-2026-0${state.safetyEvents.length + 15}`,
            status: "Open",
          };

          setTimeout(
            () => get().addAuditLog("Reported new AE/SAE", "Safety", newEvent.caseId),
            0
          );

          return { safetyEvents: [newEvent, ...state.safetyEvents] };
        }),

      updateStudyProgress: (studyId, newProgress) =>
        set((state) => ({
          studies: state.studies.map((s) =>
            s.id === studyId ? { ...s, progress: newProgress } : s
          ),
        })),

      addAuditLog: (action, moduleName, record) =>
        set((state) => {
          const user = state.currentUser;
          if (!user) return state;

          const newLog: AuditLog = {
            id: `a${state.auditLogs.length + 1}`,
            timestamp: new Date().toISOString(),
            user: user.name,
            role: user.role,
            action,
            module: moduleName,
            record,
          };

          return { auditLogs: [newLog, ...state.auditLogs] };
        }),
    }),
    {
      name: "ayusetu-storage",
    }
  )
);
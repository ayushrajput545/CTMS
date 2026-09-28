import { User, Study, Site, Participant, SafetyEvent, ComplianceItem, AuditLog } from "./types";

export const MOCK_USERS: User[] = [
    { id: "1", name: "System Admin", email: "admin@ayusetu.demo", role: "Administrator", organization: "AIIA", status: "Active", lastLogin: "2026-09-28T10:00:00Z" },
    { id: "2", name: "Dr. Ananya Sharma", email: "principal@ayusetu.demo", role: "Principal Coordinator", organization: "AIIA New Delhi", status: "Active", lastLogin: "2026-09-27T14:30:00Z" },
    { id: "3", name: "Rahul Verma", email: "coordinator@ayusetu.demo", role: "Study Coordinator", organization: "NIA Jaipur", status: "Active", lastLogin: "2026-09-28T09:15:00Z" },
];

export const MOCK_STUDIES: Study[] = [
    { id: "s1", studyId: "AYU-2026-001", title: "Effect of Ayurvedic Intervention on Type 2 Diabetes", type: "Interventional", status: "Recruiting", phase: "Phase III", sites: 4, targetParticipants: 240, enrolledParticipants: 176, startDate: "2026-01-15", pi: "Dr. Ananya Sharma", progress: 73 },
    { id: "s2", studyId: "AYU-2026-002", title: "Comparative Evaluation of Ayurvedic Therapy on Osteoarthritis", type: "Observational", status: "Ongoing", phase: "Phase IV", sites: 2, targetParticipants: 150, enrolledParticipants: 150, startDate: "2025-06-10", pi: "Dr. Sunil Gupta", progress: 100 },
    { id: "s3", studyId: "AYU-2026-003", title: "Safety Profile of Ashwagandha in Healthy Volunteers", type: "Interventional", status: "Planning", phase: "Phase I", sites: 1, targetParticipants: 50, enrolledParticipants: 0, startDate: "2026-11-01", pi: "Dr. Ramesh Kumar", progress: 0 },
];

export const MOCK_SITES: Site[] = [
    { id: "site1", studyId: "s1", name: "AIIA New Delhi", investigator: "Dr. Ananya Sharma", status: "Active", enrolled: 82, target: 100 },
    { id: "site2", studyId: "s1", name: "NIA Jaipur", investigator: "Dr. Manish Verma", status: "Active", enrolled: 67, target: 100 },
    { id: "site3", studyId: "s1", name: "IPGT&RA Jamnagar", investigator: "Dr. K. Patel", status: "Pending", enrolled: 27, target: 40 },
];

export const MOCK_PARTICIPANTS: Participant[] = [
    { id: "p1", participantId: "PT-001", studyId: "s1", siteId: "site1", enrollmentDate: "2026-02-01", status: "Enrolled", lastVisit: "2026-08-15", nextVisit: "2026-10-15" },
    { id: "p2", participantId: "PT-002", studyId: "s1", siteId: "site1", enrollmentDate: "2026-02-10", status: "Enrolled", lastVisit: "2026-09-01", nextVisit: "2026-11-01" },
    { id: "p3", participantId: "PT-003", studyId: "s1", siteId: "site2", enrollmentDate: "2026-03-05", status: "Withdrawn", lastVisit: "2026-05-10" },
    { id: "p4", participantId: "PT-023", studyId: "s1", siteId: "site2", enrollmentDate: "2026-04-12", status: "Enrolled", lastVisit: "2026-09-10", nextVisit: "2026-10-20" },
];

export const MOCK_SAFETY_EVENTS: SafetyEvent[] = [
    { id: "se1", caseId: "SAE-2026-014", studyId: "s1", participantId: "p4", eventType: "Gastrointestinal", description: "Severe nausea and vomiting after intervention", severity: "Serious", date: "2026-09-24", status: "Under Review" },
    { id: "se2", caseId: "AE-2026-089", studyId: "s2", participantId: "p1", eventType: "Headache", description: "Mild headache lasting 2 hours", severity: "Mild", date: "2026-09-26", status: "Reviewed" },
];

export const MOCK_COMPLIANCE: ComplianceItem[] = [
    { id: "c1", title: "CTRI Update Required", category: "Regulatory", studyId: "s1", dueDate: "2026-09-28", status: "Due Soon" },
    { id: "c2", title: "IEC Annual Report", category: "Ethics", studyId: "s2", dueDate: "2026-10-15", status: "Compliant" },
    { id: "c3", title: "Missing Consent Form PT-012", category: "Data", studyId: "s1", dueDate: "2026-09-25", status: "Overdue" },
];

export const MOCK_AUDIT: AuditLog[] = [
    { id: "a1", timestamp: "2026-09-27T10:15:00Z", user: "Dr. Ananya Sharma", role: "Principal Coordinator", action: "Approved Protocol Amendment", module: "Studies", record: "AYU-2026-001" },
    { id: "a2", timestamp: "2026-09-28T09:30:00Z", user: "Rahul Verma", role: "Study Coordinator", action: "Updated Recruitment Count", module: "Recruitment", record: "AYU-2026-001", previousValue: "164", newValue: "176" },
];

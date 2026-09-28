export type Role = "Administrator" | "Principal Coordinator" | "Study Coordinator";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  organization: string;
  status: "Active" | "Inactive";
  lastLogin?: string;
}

export interface Study {
  id: string;
  studyId: string; // e.g., AYU-2026-001
  title: string;
  type: string;
  status: "Planning" | "Recruiting" | "Ongoing" | "Completed" | "Halted";
  phase: string;
  sites: number;
  targetParticipants: number;
  enrolledParticipants: number;
  startDate: string;
  pi: string; // Principal Investigator
  progress: number;
}

export interface Site {
  id: string;
  studyId: string;
  name: string;
  investigator: string;
  status: "Active" | "Pending" | "Closed";
  enrolled: number;
  target: number;
}

export interface Participant {
  id: string;
  participantId: string; // e.g., PT-001
  studyId: string;
  siteId: string;
  enrollmentDate: string;
  status: "Screening" | "Enrolled" | "Completed" | "Withdrawn";
  lastVisit: string;
  nextVisit?: string;
}

export interface SafetyEvent {
  id: string;
  caseId: string;
  studyId: string;
  participantId: string;
  eventType: string;
  description: string;
  severity: "Mild" | "Moderate" | "Serious";
  date: string;
  status: "Open" | "Under Review" | "Reviewed" | "Closed";
  assignedTo?: string;
}

export interface ComplianceItem {
  id: string;
  title: string;
  category: "Ethics" | "Regulatory" | "Data";
  studyId: string;
  dueDate: string;
  status: "Compliant" | "Due Soon" | "Action Required" | "Overdue";
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  action: string;
  module: string;
  record: string;
  previousValue?: string;
  newValue?: string;
}

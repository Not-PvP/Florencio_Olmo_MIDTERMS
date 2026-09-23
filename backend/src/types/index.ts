export interface User {
  id: string;
  email: string;
  password: string;
}

export type IncidentStatus = "open" | "in_progress" | "resolved";
export type IncidentSeverity = "low" | "medium" | "high" | "critical";

export interface Incident {
  id: string;
  title: string;
  description: string;
  status: IncidentStatus;
  severity: IncidentSeverity;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface JwtPayload {
  id: string;
  email: string;
}

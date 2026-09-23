export type IncidentStatus = "open" | "in_progress" | "resolved";
export type IncidentSeverity = "low" | "medium" | "high" | "critical";

export interface Incident {
  id: string;
  title: string;
  description: string;
  status: IncidentStatus;
  severity: IncidentSeverity;
  createdAt: string;
  updatedAt: string;
}

export interface State {
  user: { id: string; email: string } | null;
  token: string | null;
  incidents: Incident[];
  loading: boolean;
  error: string | null;
}

export type Action =
  | { type: "SET_AUTH"; payload: { user: any; token: string } }
  | { type: "FETCH_SUCCESS"; payload: Incident[] }
  | { type: "CREATE_SUCCESS"; payload: Incident }
  | { type: "UPDATE_SUCCESS"; payload: Incident }
  | { type: "DELETE_SUCCESS"; payload: string }
  | { type: "SET_ERROR"; payload: string };

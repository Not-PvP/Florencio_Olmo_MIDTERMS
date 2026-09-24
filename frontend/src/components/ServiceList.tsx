import { useContext, useEffect } from "react";
import { ServiceContext } from "../context/ServiceContext";
import { deleteService, fetchServiceRequests, updateService } from "../api/serviceRequest";
import type { Microservice } from "../types";
import { Button, Card, Grid, Muted, Row, Select } from "./styles";

export const IncidentList: React.FC = () => {
  const context = useContext(ServiceContext);
  if (!context) throw new Error("IncidentList must be used within an IncidentProvider.");
  const { state, dispatch } = context;

  const handleError = (error: unknown) => {
    const message = (error as Error).message;
    if (message.includes("token")) {
      dispatch({ type: "LOGOUT" });
    }
    dispatch({ type: "SET_ERROR", payload: message });
  };

  useEffect(() => {
    const loadIncidents = async () => {
      dispatch({ type: "FETCH_START" });

      try {
        const data = await fetchServiceRequests();
        dispatch({ type: "FETCH_SERVICES_SUCCESS", payload: data });
      } catch (error) {
        const message = (error as Error).message;
        if (message.includes("token")) dispatch({ type: "LOGOUT" });
        dispatch({ type: "SET_ERROR", payload: message });
      }
    };
    loadIncidents();
  }, [dispatch]);

  const handleUpdate = async (id: number, changes: Partial<Pick<Microservice, "environment" | "status">>) => {
    try {
      const updated = await updateService(id, changes);
      dispatch({ type: "UPDATE_SERVICE_SUCCESS", payload: updated });
    } catch (error) {
      handleError(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this ticket?")) return;
    try {
      await deleteService(id);
      dispatch({ type: "DELETE_SERVICE_SUCCESS", payload: id });
    } catch (error) {
      handleError(error);
    }
  };

  if (state.loading) return <p>Loading incidents...</p>;
  if (state.services.length === 0) return <p>No incidents. All systems go ✅</p>;

  return (
    <Grid>
      {state.services.map((incident) => (
        <Card key={incident.id} $severity={incident.severity}>
          <h4>{incident.title}</h4>
          <p>{incident.description}</p>
          <Muted>
            by {incident.reporter_email ?? "unknown"}
            {incident.created_at && ` • ${new Date(incident.created_at).toLocaleString()}`}
          </Muted>

          <Row>
            <label>
              <Muted>Severity</Muted>
              <br />
              <Select
                value={incident.severity}
                onChange={(e) => handleUpdate(incident.id, { severity: e.target.value as Incident["severity"] })}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </Select>
            </label>
            <label>
              <Muted>Status</Muted>
              <br />
              <Select
                value={incident.status}
                onChange={(e) => handleUpdate(incident.id, { status: e.target.value as Incident["status"] })}
              >
                <option value="open">Open</option>
                <option value="in_progress">In progress</option>
                <option value="resolved">Resolved</option>
              </Select>
            </label>
          </Row>

          <Button $variant="danger" onClick={() => handleDelete(incident.id)}>
            Delete
          </Button>
        </Card>
      ))}
    </Grid>
  );
};

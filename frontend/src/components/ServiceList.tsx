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

  const handleUpdate = async (id: string, changes: Partial<Pick<Microservice, "environment" | "status">>) => {
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
      {state.services.map((service) => (
        <Card key={service.id} $environment={service.environment}>
          <h4>{service.name}</h4>
=

          <Row>
            <label>
              <Muted>Environment</Muted>
              <br />
              <Select
                value={service.environment}
                onChange={(e) => handleUpdate(service.id, { environment: e.target.value as Microservice["environment"] })}
              >
                <option value="development">Development</option>
                <option value="staging">Staging</option>
                <option value="production">Production</option>
              </Select>
            </label>
            <label>
              <Muted>Status</Muted>
              <br />
              <Select
                value={service.status}
                onChange={(e) => handleUpdate(service.id, { status: e.target.value as Microservice["status"] })}
              >
                <option value="healthy">Healthy</option>
                <option value="degraded">Degraded</option>
                <option value="down">Down</option>
              </Select>
            </label>
          </Row>

          <Button $variant="danger" onClick={() => handleDelete(service.id)}>
            Delete
          </Button>
        </Card>
      ))}
    </Grid>
  );
};

import { useContext, useEffect, useState } from "react";
import { ServiceContext } from "../context/ServiceContext";
import { createService, updateService } from "../api/serverRequest";
import type { Microservice } from "../types";

export const ServiceForm = ({ editing, onDone }: { editing: Microservice | null; onDone: () => void }) => {
  const context = useContext(ServiceContext);
  const [form, setForm] = useState({ name: "", environment: "development", status: "healthy" });

  useEffect(() => {
    if (editing) {
      setForm({ name: editing.name , environment: editing.environment, status: editing.status });
    } else {
      setForm({ name: "", environment: "development", status: "healthy" });
    }
  }, [editing]);

  if (!context) return null;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (editing) {
        const updated = await updateService(editing.id, form);
        context.dispatch({ type: "UPDATE_SERVICE_SUCCESS", payload: updated });
      } else {
        const created = await createService(form);
        context.dispatch({ type: "CREATE_SERVICE_SUCCESS", payload: created });
      }
      onDone();
    } catch (error) {
      alert((error as Error).message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editing ? "Edit ItServiceRequests" : "Add ItServiceRequests"}</h2>
      <label>requester_name<input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="name" /></label>
      <label>environment<select value={form.environment} onChange={e => setForm({ ...form, environment: e.target.value })}><option value="development">development</option><option value="staging">staging</option><option value="production">production</option></select></label>
      <label>status<select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}><option value="healthy">healthy</option><option value="degraded">degraded</option><option value="down">down</option></select></label>
      <button type="submit">{editing ? "Save Changes" : "Add ItServiceRequests"}</button>
      {editing && <button type="button" onClick={onDone}>Cancel</button>}
    </form>
  );
};

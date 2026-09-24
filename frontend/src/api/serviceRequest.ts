import type { Microservice } from "../types";

const API_BASE = "http://localhost:3000/api";

const getHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const fetchServiceRequests = async (search = ""): Promise<Microservice[]> => {
  const response = await fetch(`${API_BASE}/it_service_requests?search=${encodeURIComponent(search)}`);
  if (!response.ok) throw new Error("Failed to fetch it service requests.");
  return response.json();
};

export const createService = async (item: Omit<Microservice, "id">): Promise<Microservice> => {
  const response = await fetch(`${API_BASE}/it_service_requests`, {
    method: "POST", headers: getHeaders(), body: JSON.stringify(item),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to create.");
  return data;
};

export const updateService = async (id: number, item: Partial<Omit<Microservice, "id">>): Promise<Microservice> => {
  const response = await fetch(`${API_BASE}/it_service_requests/${id}`, {
    method: "PUT", headers: getHeaders(), body: JSON.stringify(item),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to update.");
  return data;
};

export const deleteService = async (id: number): Promise<Microservice> => {
  const response = await fetch(`${API_BASE}/it_service_requests/${id}`, {
    method: "DELETE", headers: getHeaders(),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Failed to delete.");
  return data;
};

import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:3000/api",
});

// TODO: attach Authorization header from stored token via interceptor

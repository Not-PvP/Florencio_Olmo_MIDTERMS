import { createContext, useContext, useReducer } from "react";
import type { ReactNode, Dispatch } from 'react';
import type { Action, State } from "../types";

const initialState: State = {
  user: null,
  token: localStorage.getItem("token"),
  selectedEnvironment: "ALL",
  services: [],
  loading: false,
  error: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_AUTH":
      localStorage.setItem('token', action.payload.token);
      return state;
    case "LOGOUT":
      localStorage.removeItem("token",);
      return state;
    case "SET_ENV_FILTER":
      return { ...state, selectedEnvironment: action.payload};
    case "FETCH_SERVICES_SUCCESS":
      return { ...state, services: action.payload, loading: false, error: null };
    case "CREATE_SERVICE_SUCCESS":
      return { ...state, error: null, services: [action.payload, ...state.services] };
    case "UPDATE_SERVICE_SUCCESS":
      return {
        ...state,
        error: null,
        services: state.services.map((i) => (i.id === action.payload.id ? action.payload : i)),
      };
    case "DELETE_SERVICE_SUCCESS":
      return { ...state, error: null, services: state.services.filter((i) => i.id !== action.payload) };
    case "SET_ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

const ServiceContext = createContext<
  { state: State; dispatch: Dispatch<Action> } | undefined
>(undefined);

export function ServiceProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ServiceContext.Provider value={{ state, dispatch }}>
      {children}
    </ServiceContext.Provider>
  );
}

export function useServiceContext() {
  const ctx = useContext(ServiceContext);
  if (!ctx) throw new Error("useServiceContext must be used within ServiceProvider");
  return ctx;
}

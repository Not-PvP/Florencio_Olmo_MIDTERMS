import { createContext, Dispatch, ReactNode, useContext, useReducer } from "react";
import { Action, State } from "../types";

const initialState: State = {
  user: null,
  token: localStorage.getItem("token"),
  incidents: [],
  loading: false,
  error: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_AUTH":
      // TODO: persist token, set user/token
      return state;
    case "FETCH_SUCCESS":
      // TODO: set incidents, loading false
      return state;
    case "CREATE_SUCCESS":
      // TODO: append incident
      return state;
    case "UPDATE_SUCCESS":
      // TODO: replace updated incident
      return state;
    case "DELETE_SUCCESS":
      // TODO: remove incident by id
      return state;
    case "SET_ERROR":
      // TODO: set error, loading false
      return state;
    default:
      return state;
  }
}

const IncidentContext = createContext<
  { state: State; dispatch: Dispatch<Action> } | undefined
>(undefined);

export function IncidentProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <IncidentContext.Provider value={{ state, dispatch }}>
      {children}
    </IncidentContext.Provider>
  );
}

export function useIncidentContext() {
  const ctx = useContext(IncidentContext);
  if (!ctx) throw new Error("useIncidentContext must be used within IncidentProvider");
  return ctx;
}

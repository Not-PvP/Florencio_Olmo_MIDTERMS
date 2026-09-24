import { useContext, useState } from "react";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import { ServiceProvider } from "./context/ServiceContext";
import { AuthForm } from "./components/AuthForm";
import { ServiceForm } from "./components/ServiceForm";
import { ServiceList } from "./components/ServiceList";
import type { Microservice } from "./types";

function MainApp() {
  const authContext = useContext(AuthContext);
  const [editing, setEditing] = useState<Microservice | null>(null);

  return (
    <main style={{ maxWidth: 900, margin: "30px auto", fontFamily: "Arial" }}>
      <h1>It Service Requests Manager</h1>
      {authContext?.state.isAuthenticated ? (
        <>
          <button onClick={() => authContext.dispatch({ type: "LOGOUT" })}>Sign Out</button>
          <ServiceForm editing={editing} onDone={() => setEditing(null)} />
          <hr />
          <ServiceList onEdit={setEditing} />
        </>
      ) : (
        <AuthForm />
      )}
    </main>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ServiceProvider>
        <MainApp />
      </ServiceProvider>
    </AuthProvider>
  );
}

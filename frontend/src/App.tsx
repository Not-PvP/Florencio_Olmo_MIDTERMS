import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { IncidentProvider } from "./context/IncidentContext";
import IncidentsPage from "./pages/IncidentsPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <IncidentProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/incidents" element={<IncidentsPage />} />
          <Route path="/" element={<Navigate to="/incidents" replace />} />
        </Routes>
      </BrowserRouter>
    </IncidentProvider>
  );
}

export default App;

import { useContext, useState } from "react";
import { AuthContext } from '../context/AuthContext'
import { login, register } from "../api/authService";

export const AuthForm = () => {
  const authContext = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registerMode, setRegisterMode] = useState(false);

  if (!authContext) return null;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (registerMode) {
        await register(username, password);
      }
      const data = await login(username, password);
      authContext.dispatch({ type: "LOGIN", payload: data.token });
    } catch (error) {
      alert((error as Error).message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{registerMode ? "Register" : "Login"}</h2>
      <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
      <button type="submit">{registerMode ? "Register" : "Login"}</button>
      <button type="button" onClick={() => setRegisterMode(!registerMode)}>Switch</button>
    </form>
  );
};

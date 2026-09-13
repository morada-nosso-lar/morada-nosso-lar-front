import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export default function Dashboard() {
  const { signOut } = useContext(AuthContext);

  return (
    <div>
      <h1>Dashboard</h1>

      <button onClick={signOut}>Sair do Sistema</button>
    </div>
  );
}

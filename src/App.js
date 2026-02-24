import "./App.css";
import Login from "./components/Login";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./hooks/useAuth";
import Home from "./pages/Home";

const AppContent = () => {
  const { token, logout } = useAuth();
  // If no token then Login page should be visible and it's  routing on basis if Token.
  if (!token) {
    return <Login />;
  }
  return (
    <>
      <button onClick={logout} className="btn-logout">Logout</button>
      <Home />
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;

import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginView from "./views/auth/LoginView";
import RegisterView from "./views/auth/RegisterView";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginView />} />
      <Route path="/register" element={<RegisterView />} />

      <Route
        path="*"
        element={
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>404 - Page Not Found</h1>
          </div>
        }
      />
    </Routes>
  );
}

export default App;

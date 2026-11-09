import "./App.css";
import { useRoutes } from "react-router-dom";
import { appRoutes } from "./routes/appRoutes";

function App() {
  const routing = useRoutes(appRoutes);
  return routing;
}

export default App;
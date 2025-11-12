import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { loadConfig } from "./utils/load-config";

async function bootstrap() {
  const config = await loadConfig();
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <App config={config} />
  );
}

bootstrap();

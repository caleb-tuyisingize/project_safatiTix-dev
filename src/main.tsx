
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { patchApiFetch } from './utils/network';

patchApiFetch();


  createRoot(document.getElementById("root")!).render(<App />);
  

import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { MovieCardProvider } from "./context/CardContext/MovieCardContext.jsx";

createRoot(document.getElementById("root")).render(
  <MovieCardProvider>
    <App />
  </MovieCardProvider>
);

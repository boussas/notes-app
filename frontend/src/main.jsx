import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { NotesContextProvider } from "./context/NotesContext";
import { UserProvider } from "./context/UserContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <NotesContextProvider>
        <App />
      </NotesContextProvider>
    </UserProvider>
  </StrictMode>
);

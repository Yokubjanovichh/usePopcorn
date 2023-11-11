import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const rootContainer = createRoot(document.getElementById("root"));
rootContainer.render(<App />);

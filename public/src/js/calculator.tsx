import React from 'react';
import { createRoot } from 'react-dom/client';
import "../css/style.scss";

import App from "./App";

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById("root")).render(<App />)
});

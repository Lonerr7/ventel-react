import React from 'react';
import {createRoot} from 'react-dom/client';
import "../css/style.scss";

import App from "./app/App";
import {StoreProvider} from "./app/providers/StoreProvider/components/StoreProvider";


createRoot(document.getElementById("root")).render(
  <StoreProvider>
    <App/>
  </StoreProvider>
);


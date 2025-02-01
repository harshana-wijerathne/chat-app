import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "./components/ui/provider";
import ChatProvider from "./context/ChatProvider";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ChatProvider>
      <Provider>
        <App />
      </Provider>
    </ChatProvider>
  </BrowserRouter>
);

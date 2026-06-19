import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { CartProvider } from "./context/CartContext";

const queryClient=new QueryClient(
  {
    defaultOptions:{
      queries:{
        refetchOnWindowFocus:false,
        retry:1,
        staleTime:5*60*1000, // 5 mins
        gcTime:30*60*1000, // 30 mins
        retry :2,
      }
    }
  }
);
ReactDOM.createRoot(
  document.getElementById("root")
).render(
    <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <App />
      </CartProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
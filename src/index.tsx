// import App from "./app";
// import { QueryClient, QueryClientProvider } from "react-query";
// import { ReactQueryDevtools } from "react-query/devtools";
// import "./global.css";
// import { createRoot } from 'react-dom/client';


// const queryClient = new QueryClient();

// createRoot(document.getElementById('root')).render(
//   <QueryClientProvider client={queryClient}>
//     <App />
//     <ReactQueryDevtools initialIsOpen={false} />
//   </QueryClientProvider>,
//   document.getElementById("root")
// );

// Convertir el precio a string
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import "./global.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

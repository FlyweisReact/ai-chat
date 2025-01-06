/** @format */

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "./routes/routes";
import { ReactNotifications } from "react-notifications-component";

const App = () => {
  return (
    <BrowserRouter>
      <ReactNotifications />
      <Routes>
        {routes.map((route) => {
          return (
            <Route
              path={route.path}
              element={route.element}
              key={`route${route.path}`}
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
};

export default App;

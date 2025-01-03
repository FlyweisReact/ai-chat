/** @format */

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "./routes/routes";

const App = () => {
  return (
    <BrowserRouter>
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

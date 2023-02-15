import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "../../routes";

function ReactRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.public.map((route, index) => {
          return (
            <Route
              key={index}
              element={route.element}
              path={route.path}
            ></Route>
          );
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default ReactRouter;

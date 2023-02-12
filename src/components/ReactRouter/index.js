import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "../../routes";

function ReactRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.public.map((route, index) => {
          return (
            <Route
              path={route.path}
              element={route.element}
              key={route.path}
            ></Route>
          );
        })}
      </Routes>
    </BrowserRouter>
  );
}
export default ReactRouter;

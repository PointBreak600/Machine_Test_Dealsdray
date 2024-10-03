import { BrowserRouter, Route, Routes } from "react-router-dom";
import protectedroutes from "./protectedroutes";
import routes from "./routes";
import { NotFound } from "../Pages";
import { Protected } from "../components";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {routes.map((route) => {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={<>{route.element}</>}
              />
            );
          })}
          {protectedroutes.map((route) => {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={<Protected>{route.element}</Protected>}
              />
            );
          })}
          <Route
            path="*"
            element={
              <>
                <NotFound />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
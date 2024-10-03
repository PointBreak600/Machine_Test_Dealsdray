import { Login, Landing } from "../Pages";

const routes = [
  {
    title: "Login",
    path: "/login",
    description: "Login Page",
    element: <Login />,
  },
  {
    title: "Landing",
    path: "/",
    description: "Landing Page",
    element: <Landing />,
  },
];

export default routes;
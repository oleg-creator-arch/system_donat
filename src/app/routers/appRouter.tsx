import {
  createHashRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Home } from "../pages/home";

export const AppRouter = () => {
  const routers = createRoutesFromElements(<Route index element={<Home />} />);

  const router = createHashRouter(routers, {});

  return <RouterProvider router={router} />;
};

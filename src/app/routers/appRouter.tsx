import { Home } from '@/pages/home';
import { Layout } from '@/widgets/layout';
import {
  createHashRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

export const AppRouter = () => {
  const routers = createRoutesFromElements(
    <Route element={<Layout />}>
      <Route index element={<Home />} />
    </Route>,
  );

  const router = createHashRouter(routers, {});

  return <RouterProvider router={router} />;
};

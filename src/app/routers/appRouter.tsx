import { Home } from '@/pages/home';
import { Refund } from '@/pages/refund';
import { Layout } from '@/widgets/layout';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

export const AppRouter = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="refund" element={<Refund />} />
      </Route>,
    ),
  );

  return <RouterProvider router={router} />;
};

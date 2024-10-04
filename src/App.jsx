import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./layout/Root";
import { lazy, Suspense } from "react";

const DashboardPage = lazy(() => import("./pages/Dashboard"));
const ProductPage = lazy(() => import("./pages/Product"));
const SettingPage = lazy(() => import("./pages/Setting"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        { index: true, element: <DashboardPage /> },
        {
          path: "/dashboard",
          element: <DashboardPage />,
        },
        {
          path: "/product",
          element: <ProductPage />,
        },
        {
          path: "/setting",
          element: <SettingPage />,
        },
        {
          path: "*",
          element: <NotFoundPage />,
        },
      ],
    },
  ]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;

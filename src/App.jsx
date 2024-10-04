import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./layout/Root";
import DashboardPage from "./pages/Dashboard";
import ProductPage from "./pages/Product";
import SettingPage from "./pages/Setting";
import NotFoundPage from "./pages/NotFoundPage";

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
  return <RouterProvider router={router} />;
}

export default App;

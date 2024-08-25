import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import Error from "../pages/Error";
import Home from "../pages/Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);
export default router;

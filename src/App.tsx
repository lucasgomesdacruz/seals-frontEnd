import { createBrowserRouter } from "react-router-dom"
import Layout from "./layout/Layout"
import Home from "./Home/Home"
import DuvDetails from "./DuvDetails/DuvDetails"
import Signup from "./signup/Signup"
import Login from "./longi/Login"
import RegisterDuv from "./registerDuv/RegisterDuv"
import NotFound from "./notFound/NotFound"


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    element: <Layout />,
    children: [
      {
        path: "/home",
        element: <Home />
      },
      {
        path: "/duv/:id",
        element: <DuvDetails />
      },
      {
        path: "registerduv",
        element: <RegisterDuv />
      },
    ]
  },
  {
    path: "*",
    element: <NotFound />,
  },
])

export { router }

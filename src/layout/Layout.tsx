import { Outlet } from "react-router-dom"
import Header from "../components/header/Header"
import { PrivateRoute } from "../routes/PrivateRoute"
import { ToastContainer } from "react-toastify"


const Layout = () => {
  return (
    <div>
      <PrivateRoute>
        <div>
          <Header />
          <Outlet />
        </div>
      </PrivateRoute>
      <ToastContainer autoClose={3000} />
    </div>
  )
}

export default Layout

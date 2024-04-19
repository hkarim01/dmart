import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import PageNotFound from '../pages/PageNotFound'
import Home from '../pages/Home'
import Register from '../pages/Auth/Register'
import Login from '../pages/Auth/Login'
import About from '../pages/About'
import Contact from '../pages/Contact'
import Policy from '../pages/Policy'
import Dashboard from '../pages/User/Dashboard'
import PrivateRoute from '../components/routes/PrivateRoute'
import AdminRoute from '../components/routes/AdminRoute'
import ForgotPassword from '../pages/Auth/ForgotPassword'
import AdminDashboard from '../pages/Admin/AdminDashboard'
import CreateProduct from '../pages/Admin/CreateProduct'
import CreateCategory from '../pages/Admin/CreateCategory'
import Users from '../pages/Admin/Users'
import Orders from '../pages/User/Orders'
import Profile from '../pages/User/Profile'

const routes = [
  {
    path: '/',
    element: <App />,
    // errorElement: <PageNotFound />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'policy',
        element: <Policy />,
      },
      {
        path: 'dashboard',
        element: <PrivateRoute />,
        children: [
          {
            path: 'user',
            element: <Dashboard />,
          },
          {
            path: 'user/orders',
            element: <Orders />,
          },
          {
            path: 'user/profile',
            element: <Profile />,
          },
        ],
      },
      {
        path: 'dashboard',
        element: <AdminRoute />,
        children: [
          {
            path: 'admin',
            element: <AdminDashboard />,
          },
          {
            path: 'admin/create-category',
            element: <CreateCategory />,
          },
          {
            path: 'admin/create-product',
            element: <CreateProduct />,
          },
          {
            path: 'admin/users',
            element: <Users />,
          },
        ],
      },
      {
        path: '*',
        element: <PageNotFound />,
      },
    ],
  },
]

const router = createBrowserRouter(routes)

export default router

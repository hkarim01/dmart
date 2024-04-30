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
import Orders, { ordersLoader } from '../pages/User/Orders'
import Profile from '../pages/User/Profile'
import Products from '../pages/Admin/Products'
import UpdateProduct from '../pages/Admin/UpdateProduct'
import Search from '../pages/Search'
import ProductDetails from '../pages/ProductDetails'
import CategoryProduct from '../pages/CategoryProduct'
import Categories from '../pages/Categories'
import CartPage from '../pages/CartPage'
import StripeElement from '../components/StripeElement'
import CheckoutForm from '../components/forms/CheckoutForm'
import PaymentResult from '../components/PaymentResult'
import AdminOrders, { adminOrdersLoader } from '../pages/Admin/AdminOrders'

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'search', element: <Search /> },
      { path: 'product/:slug', element: <ProductDetails /> },
      { path: 'categories', element: <Categories /> },
      { path: 'category/:slug', element: <CategoryProduct /> },
      { path: 'cart', element: <CartPage /> },
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
            loader: ordersLoader,
            element: <Orders />,
          },
          {
            path: 'user/profile',
            element: <Profile />,
          },
          {
            path: 'checkout',
            element: <StripeElement />,
            children: [
              { path: 'payment-details/:orderId', element: <CheckoutForm /> },
              { path: 'payment-result', element: <PaymentResult /> },
            ],
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
            path: 'admin/products',
            element: <Products />,
          },
          {
            path: 'admin/create-product',
            element: <CreateProduct />,
          },
          {
            path: 'admin/product/:slug',
            element: <UpdateProduct />,
          },
          {
            path: 'admin/users',
            element: <Users />,
          },
          {
            path: 'admin/orders',
            loader: adminOrdersLoader,
            element: <AdminOrders />,
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

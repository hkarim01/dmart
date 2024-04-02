import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import PageNotFound from '../pages/PageNotFound'
import Home from '../pages/Home'
import Register from '../pages/Register'
import Login from '../pages/Login'
import About from '../pages/About'
import Contact from '../pages/Contact'
import Policy from '../pages/Policy'

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
        path: '*',
        element: <PageNotFound />,
      },
    ],
  },
]

const router = createBrowserRouter(routes)

export default router

import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { TiShoppingCart } from 'react-icons/ti'
import { useAuth } from '../../utils/context/AuthContext'
import { deleteItemFromLocal } from '../../utils/local-storage-utils'
import { toast } from 'react-toastify'

const Header = () => {
  const [auth, setAuth] = useAuth()

  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: '' })
    deleteItemFromLocal('auth')
    toast.success('Logout successful')
  }

  return (
    <>
      <nav className='navbar navbar-expand-lg bg-body-tertiary'>
        <div className='container-fluid'>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarTogglerDemo01'
            aria-controls='navbarTogglerDemo01'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarTogglerDemo01'>
            <Link to={'/'} className='navbar-brand'>
              <TiShoppingCart />
              dMart
            </Link>
            <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
              <li className='nav-item'>
                <NavLink to={'/'} className='nav-link' aria-current='page'>
                  Home
                </NavLink>
              </li>

              {!auth.user ? (
                <>
                  <li className='nav-item'>
                    <NavLink to={'/login'} className='nav-link'>
                      Login
                    </NavLink>
                  </li>
                  <li className='nav-item'>
                    <NavLink to={'/register'} className='nav-link'>
                      Register
                    </NavLink>
                  </li>
                </>
              ) : (
                <li className='nav-item dropdown'>
                  <NavLink
                    className='nav-link dropdown-toggle'
                    to={'#'}
                    role='button'
                    data-bs-toggle='dropdown'
                    aria-expanded='false'
                  >
                    {auth?.user?.name}
                  </NavLink>
                  <ul className='dropdown-menu dropdown-menu-end'>
                    <li>
                      <NavLink
                        className='dropdown-item'
                        to={`/dashboard/${
                          auth?.user?.role === 'admin' ? 'admin' : 'user'
                        }`}
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        onClick={handleLogout}
                        to={'/login'}
                        className='dropdown-item'
                      >
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                </li>
                // <li className='nav-item'>
                //   <NavLink
                //     onClick={handleLogout}
                //     to={'/login'}
                //     className='nav-link'
                //   >
                //     Logout
                //   </NavLink>
                // </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header

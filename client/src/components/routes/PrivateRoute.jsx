import { useEffect, useState } from 'react'
import { useAuth } from '../../utils/context/AuthContext'
import { userAuthCheck } from '../../utils/dmart-api'
import Spinner from '../Spinner'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import SEOHeader from '../layout/SEOHeader'
import UserMenu from '../layout/UserMenu'

const PrivateRoute = () => {
  const [ok, setOk] = useState(false)
  const { auth, authInitialized } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const authCheck = async () => {
      const res = await userAuthCheck()

      if (res.data?.ok) {
        setOk(true)
      } else {
        setOk(false)
        navigate('/login', { state: location.pathname })
      }
    }

    if (authInitialized) {
      if (auth?.token) {
        authCheck()
      } else {
        navigate('/login', { state: location.pathname })
      }
    }
  }, [auth?.token, authInitialized, location])

  return ok ? (
    <div className='container-fluid m-2 p-2'>
      <SEOHeader />
      <div className='row'>
        <div className='col-md-3'>
          <UserMenu />
        </div>
        <div className='col-md-9'>
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Spinner />
  )
}

export default PrivateRoute

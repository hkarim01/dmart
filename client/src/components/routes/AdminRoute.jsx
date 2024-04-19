import { useEffect, useState } from 'react'
import { useAuth } from '../../utils/context/AuthContext'
import { adminAuthCheck } from '../../utils/dmart-api'
import Spinner from '../Spinner'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import SEOHeader from '../layout/SEOHeader'
import AdminMenu from '../layout/AdminMenu'

const AdminRoute = () => {
  const [ok, setOk] = useState(false)
  const [auth] = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const authCheck = async () => {
      const res = await adminAuthCheck()

      if (res.data?.ok) {
        setOk(true)
      } else {
        setOk(false)
        navigate('/', { state: location.pathname })
      }
    }

    if (auth?.token) {
      authCheck()
    } else {
      navigate('/', { state: location.pathname })
    }
  }, [auth?.token, location])

  return ok ? (
    <div className='container-fluid m-2 p-2'>
      <SEOHeader />
      <div className='row'>
        <div className='col-md-3'>
          <AdminMenu />
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

export default AdminRoute

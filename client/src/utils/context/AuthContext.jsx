import { useState, useContext, createContext, useEffect } from 'react'
import { fetchItemFromLocal } from '../local-storage-utils'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: '',
  })
  const [authInitialized, setAuthInitialized] = useState(false)

  useEffect(() => {
    const data = fetchItemFromLocal('auth')
    if (data) {
      setAuth({ ...auth, user: data.user, token: data.token })
    }
    setAuthInitialized(true)
  }, [])

  return (
    <AuthContext.Provider value={{ auth, authInitialized, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

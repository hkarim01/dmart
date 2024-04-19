import React from 'react'
import SEOHeader from '../components/layout/SEOHeader'
import { useAuth } from '../utils/context/AuthContext'

const Home = () => {
  const [auth] = useAuth()
  return (
    <div>
      <SEOHeader />
      Home
      <p className='text-break'>{JSON.stringify(auth)}</p>
    </div>
  )
}

export default Home

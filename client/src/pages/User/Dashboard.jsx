import React from 'react'
import { useAuth } from '../../utils/context/AuthContext'

const Dashboard = () => {
  const { auth } = useAuth()
  return (
    <div className='card w-75 p-3'>
      <h3>Admin Name: {auth?.user?.name}</h3>
      <h3>Admin Email: {auth?.user?.email}</h3>
      <h3>Admin Contect: {auth?.user?.phone}</h3>
    </div>
  )
}

export default Dashboard

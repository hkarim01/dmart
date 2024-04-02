import React from 'react'
import { Link } from 'react-router-dom'
import SEOHeader from '../components/layout/SEOHeader'

const PageNotFound = () => {
  return (
    <div className='pnf'>
      <SEOHeader title={'404 - dMart'} />
      <h1 className='pnf-title'>404</h1>
      <h2 className='pnf-heading'>Oops ! Page Not Found</h2>
      <Link to='/' className='pnf-btn'>
        Home
      </Link>
    </div>
  )
}

export default PageNotFound

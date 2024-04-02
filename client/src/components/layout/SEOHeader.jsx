import React from 'react'
import Helmet from 'react-helmet'

const SEOHeader = ({
  title = 'dMart - shop now',
  description = 'Buy groceries and garments',
  keywords = 'fruits, vegetable, staples, clothes',
  author = 'Sparrow',
}) => {
  return (
    <>
      <Helmet>
        <meta charset='UTF-8' />
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
        <meta name='author' content={author} />
        <title>{title}</title>
      </Helmet>
    </>
  )
}

export default SEOHeader

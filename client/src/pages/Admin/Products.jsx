import React, { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { fetchProducts } from '../../utils/dmart-api'

const Products = () => {
  const [products, setProducts] = useState([])

  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await fetchProducts()
      setProducts(data.products)
    } catch (error) {
      console.log(error)
      toast.error('Someething Went Wrong')
    }
  }

  //lifecycle method
  useEffect(() => {
    getAllProducts()
  }, [])

  return (
    <>
      <h1 className='text-center'>All Products List</h1>
      <div className='d-flex flex-wrap'>
        {products?.map((p) => (
          <Link
            key={p._id}
            to={`/dashboard/admin/product/${p.slug}`}
            className='product-link'
          >
            <div className='card m-2' style={{ width: '18rem' }}>
              <img
                src={`${process.env.REACT_APP_DMART_API_URL}/products/product-photo/${p._id}`}
                className='card-img-top'
                alt={p.name}
              />
              <div className='card-body'>
                <h5 className='card-title'>{p.name}</h5>
                <p className='card-text'>{p.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}

export default Products

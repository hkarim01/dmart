import React, { useState, useEffect } from 'react'

import { Checkbox, Radio } from 'antd'
import { prices } from '../utils/prices'
import {
  fetchCategories,
  fetchFilteredProducts,
  fetchProductCount,
  fetchProductList,
} from '../utils/dmart-api'

import { useCart } from '../utils/context/CartContext'

import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { setItemInLocal } from '../utils/local-storage-utils'

const Home = () => {
  const navigate = useNavigate()
  const { cart, setCart } = useCart()

  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [checked, setChecked] = useState([])
  const [radio, setRadio] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await fetchCategories()
      if (data?.success) {
        setCategories(data?.categories)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllCategory()
    getTotal()
  }, [])
  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true)
      const { data } = await fetchProductList(page)
      setLoading(false)
      setProducts(data.products)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await fetchProductCount()
      setTotal(data?.total)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (page === 1) return
    loadMore()
  }, [page])
  //load more
  const loadMore = async () => {
    try {
      setLoading(true)
      const { data } = await fetchProductList(page)
      setLoading(false)
      setProducts([...products, ...data?.products])
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked]
    if (value) {
      all.push(id)
    } else {
      all = all.filter((c) => c !== id)
    }
    setChecked(all)
  }
  // useEffect(() => {
  //   if (!checked.length || !radio.length) getAllProducts()
  // }, [checked.length, radio.length])

  useEffect(() => {
    if (checked.length || radio.length) {
      filterProduct()
    } else {
      getAllProducts()
    }
  }, [checked, radio])

  //get filtered product
  const filterProduct = async () => {
    try {
      const { data } = await fetchFilteredProducts({
        checked,
        radio,
      })
      setProducts(data?.products)
    } catch (error) {
      console.log(error)
    }
  }

  const hideLoadMore =
    !(products && products.length < total) ||
    checked.length > 0 ||
    radio.length > 0
  return (
    <div className='container-fluid row mt-3'>
      <div className='col-md-2'>
        <h4 className='text-center'>Filter By Category</h4>
        <div className='d-flex flex-column'>
          {categories?.map((c) => (
            <Checkbox
              key={`category_${c._id}`}
              onChange={(e) => handleFilter(e.target.checked, c._id)}
            >
              {c.name}
            </Checkbox>
          ))}
        </div>
        {/* price filter */}
        <h4 className='text-center mt-4'>Filter By Price</h4>
        <div className='d-flex flex-column'>
          <Radio.Group onChange={(e) => setRadio(e.target.value)}>
            {prices?.map((p) => (
              <div key={`price_${p._id}`}>
                <Radio value={p.array}>{p.name}</Radio>
              </div>
            ))}
          </Radio.Group>
        </div>
        <div className='d-flex flex-column'>
          <button
            className='btn btn-danger'
            onClick={() => window.location.reload()}
          >
            RESET FILTERS
          </button>
        </div>
      </div>
      <div className='col-md-9'>
        <h1 className='text-center'>All Products</h1>
        <div className='d-flex flex-wrap'>
          {products?.map((p) => (
            <div
              key={`product_${p._id}`}
              className='card m-2'
              style={{ width: '18rem' }}
            >
              <img
                src={`${process.env.REACT_APP_DMART_API_URL}/products/product-photo/${p._id}`}
                className='card-img-top'
                alt={p.name}
              />
              <div className='card-body'>
                <h5 className='card-title'>{p.name}</h5>
                <p className='card-text'>{p.description.substring(0, 30)}...</p>
                <p className='card-text'> $ {p.price}</p>
                <button
                  className='btn btn-primary'
                  onClick={() => navigate(`/product/${p.slug}`)}
                >
                  More Details
                </button>
                <button
                  className='btn btn-secondary ms-1'
                  onClick={() => {
                    setCart([...cart, p])
                    setItemInLocal('cart', [...cart, p])
                    toast.success('Item Added to cart')
                  }}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className='m-2 p-3'>
          {!hideLoadMore && (
            <button
              className='btn btn-warning'
              onClick={(e) => {
                e.preventDefault()
                setPage(page + 1)
              }}
            >
              {loading ? 'Loading ...' : 'Loadmore'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home

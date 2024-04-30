import React, { useState } from 'react'
import moment from 'moment'
import { Select } from 'antd'
import { fetchAllOrders, updateOrderStatus } from '../../utils/dmart-api'
import { useLoaderData } from 'react-router-dom'
const { Option } = Select

export const adminOrdersLoader = async () => {
  const response = await fetchAllOrders()
  const { orders } = response?.data

  return { orders }
}

const AdminOrders = () => {
  const status = [
    'payment pending',
    'processing',
    'shipped',
    'deliverd',
    'cancel',
  ]
  const { orders: allOrders } = useLoaderData()
  const [orders, setOrders] = useState(allOrders)

  const handleChange = async (orderId, value) => {
    try {
      await updateOrderStatus(orderId, value)
      const { orders } = await adminOrdersLoader()
      setOrders(orders)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <h1 className='text-center'>All Orders</h1>
      {orders?.map((o, i) => {
        return (
          <div key={o._id} className='border shadow'>
            <table className='table'>
              <thead>
                <tr>
                  <th scope='col'>#</th>
                  <th scope='col'>Status</th>
                  <th scope='col'>Buyer</th>
                  <th scope='col'> date</th>
                  <th scope='col'>Quantity</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{i + 1}</td>
                  <td>
                    <Select
                      variant='borderless'
                      onChange={(value) => handleChange(o._id, value)}
                      defaultValue={o?.status}
                    >
                      {status.map((s, i) => (
                        <Option key={i} value={s}>
                          {s}
                        </Option>
                      ))}
                    </Select>
                  </td>
                  <td>{o?.buyer?.name}</td>
                  <td>{moment(o?.createdAt).fromNow()}</td>
                  <td>{o?.products?.length}</td>
                </tr>
              </tbody>
            </table>
            <div className='container'>
              {o?.products?.map((p, i) => (
                <div className='row mb-2 p-3 card flex-row' key={p._id}>
                  <div className='col-md-4'>
                    <img
                      src={`${process.env.REACT_APP_DMART_API_URL}/products/product-photo/${p._id}`}
                      className='card-img-top'
                      alt={p.name}
                      width='100px'
                      height={'100px'}
                    />
                  </div>
                  <div className='col-md-8'>
                    <p>{p.name}</p>
                    <p>{p.description.substring(0, 30)}</p>
                    <p>Price : {p.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </>
  )
}

export default AdminOrders

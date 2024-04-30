import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import CategoryForm from '../../components/forms/CategoryForm'
import { Modal } from 'antd'
import {
  createCategory,
  deleteCategory,
  fetchCategories,
  updateCategory,
} from '../../utils/dmart-api'

const CreateCategory = () => {
  const [categories, setCategories] = useState([])
  const [name, setName] = useState('')
  const [visible, setVisible] = useState(false)
  const [selected, setSelected] = useState(null)
  const [updatedName, setUpdatedName] = useState('')

  const handleCancel = () => {
    setVisible(false)
  }

  //handle Form
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await createCategory({ name })
      if (data?.success) {
        toast.success(`${name} is created`)
        getAllCategory()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error('somthing went wrong in input form')
    }
  }

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await fetchCategories()
      if (data.success) {
        setCategories(data.categories)
      }
    } catch (error) {
      console.log(error)
      toast.error('Something wwent wrong in getting catgeory')
    }
  }

  useEffect(() => {
    getAllCategory()
  }, [])

  //update category
  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const { data } = await updateCategory(selected._id, { name: updatedName })
      if (data.success) {
        toast.success(`${updatedName} is updated`)
        setSelected(null)
        setUpdatedName('')
        setVisible(false)
        getAllCategory()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error('Somtihing went wrong')
    }
  }
  //delete category
  const handleDelete = async (cId) => {
    try {
      const { data } = await deleteCategory(cId)
      if (data.success) {
        toast.success(`category is deleted`)

        getAllCategory()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error('Somtihing went wrong')
    }
  }
  return (
    <>
      <h1>Manage Category</h1>
      <div className='p-3 w-50'>
        <CategoryForm
          handleSubmit={handleSubmit}
          value={name}
          setValue={setName}
        />
      </div>
      <div className='w-75'>
        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>Name</th>
              <th scope='col'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories?.map((c) => (
              <tr key={c._id}>
                <td key={c._id}>{c.name}</td>
                <td>
                  <button
                    className='btn btn-primary ms-2'
                    onClick={() => {
                      setVisible(true)
                      setUpdatedName(c.name)
                      setSelected(c)
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className='btn btn-danger ms-2'
                    onClick={() => {
                      handleDelete(c._id)
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal onCancel={handleCancel} open={visible}>
        <CategoryForm
          value={updatedName}
          setValue={setUpdatedName}
          handleSubmit={handleUpdate}
        />
      </Modal>
    </>
  )
}

export default CreateCategory

import { useState, useEffect } from 'react'
import { fetchCategories } from '../dmart-api'

export default function useCategory() {
  const [categories, setCategories] = useState([])

  //get cat
  const getCategories = async () => {
    try {
      const { data } = await fetchCategories()
      setCategories(data?.categories)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCategories()
  }, [])

  return categories
}

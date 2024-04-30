import axios from 'axios'
import { fetchItemFromLocal } from './local-storage-utils'

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_DMART_API_URL,
})

const handleRequestError = (error) => {
  console.log('dMart network request error: ', error)
}

const getResponseReturn = (error) => {
  return error?.response?.data
}

const getHeaders = (contentType) => {
  const token = fetchItemFromLocal('auth')?.token
  const headers = {
    'Content-Type': contentType || 'application/json',
  }

  if (token) {
    headers['Authorization'] = token
  }

  return headers
}

/**
 * GET request to the dMart API
 * @param url - relative URL e.g. "user"
 * @returns
 */
export const apiGet = async (url) => {
  const options = {
    headers: getHeaders(),
  }

  try {
    const response = await axiosClient.get(url, options)
    return response
  } catch (e) {
    handleRequestError(e)
    return getResponseReturn(e)
  }
}

/**
 * POST request to the dMart API
 * @param url - relative URL e.g. "user"
 * @param body
 * @returns
 */
export const apiPost = async (url, body, contentType) => {
  const options = {
    headers: getHeaders(contentType),
  }

  try {
    const response = await axiosClient.post(url, body, options)
    return response
  } catch (e) {
    handleRequestError(e)
    return getResponseReturn(e)
  }
}

/**
 * PUT request to the dMart API
 * @param url - relative URL e.g. "user"
 * @param body
 * @returns
 */
export const apiPut = async (url, body, contentType) => {
  const options = {
    headers: getHeaders(contentType),
  }

  try {
    const response = await axiosClient.put(url, body, options)
    return response
  } catch (e) {
    handleRequestError(e)
    return getResponseReturn(e)
  }
}

/**
 * DELETE request to the dMart API
 * @param url - relative URL e.g. "user"
 * @param fetchOptions
 * @returns
 */
export const apiDelete = async (url, body) => {
  const options = {
    headers: getHeaders(),
    data: { ...body },
  }

  try {
    const response = await axiosClient.delete(url, options)
    return response
  } catch (e) {
    handleRequestError(e)
    return getResponseReturn(e)
  }
}

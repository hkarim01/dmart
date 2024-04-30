import { apiDelete, apiGet, apiPost, apiPut } from './network'

export const registerUser = async (data) => {
  return await apiPost('auth/register', data)
}

export const loginUser = async (data) => {
  return await apiPost('auth/login', data)
}

export const userAuthCheck = async () => {
  return await apiGet('auth/user-auth')
}

export const adminAuthCheck = async () => {
  return await apiGet('auth/admin-auth')
}

export const updateUserProfile = async (data) => {
  return await apiPut('auth/profile', data)
}

export const forgotPassword = async (data) => {
  return await apiPost('auth/forgot-password', data)
}

export const fetchCategories = async () => {
  return await apiGet('categories')
}

export const createCategory = async (data) => {
  return await apiPost('categories/create-category', data)
}

export const updateCategory = async (id, data) => {
  return await apiPut(`categories/update-category/${id}`, data)
}

export const deleteCategory = async (id) => {
  return await apiDelete(`categories/delete-category/${id}`)
}

export const fetchProducts = async () => {
  return await apiGet('products')
}

export const createProduct = async (data) => {
  return await apiPost('products/create-product', data, 'multipart/form-data')
}

export const fetchProduct = async (slug) => {
  return await apiGet(`products/${slug}`)
}

export const updateProduct = async (pId, data) => {
  return await apiPut(
    `products/update-product/${pId}`,
    data,
    'multipart/form-data'
  )
}

export const deleteProduct = async (pId) => {
  return await apiDelete(`products/delete-product/${pId}`)
}

export const fetchProductList = async (page) => {
  return await apiGet(`products/product-list/${page}`)
}

export const fetchProductCount = async () => {
  return await apiGet('products/product-count')
}

export const fetchFilteredProducts = async (filter) => {
  return await apiPost('products/product-filters', filter)
}

export const searchProducts = async (keyword) => {
  return await apiGet(`/products/search/${keyword}`)
}

export const fetchRelatedProducts = async (pId, cId) => {
  return await apiGet(`products/related-product/${pId}/${cId}`)
}

export const fetchCategoryProducts = async (slug) => {
  return await apiGet(`products/product-category/${slug}`)
}

export const createPaymentIntent = async (orderId) => {
  return await apiPost('checkout/create-payment-Intent', { orderId })
}

export const createOrder = async (data) => {
  return await apiPost('orders/create-order', data)
}

export const fetchUserOrders = async () => {
  return await apiGet('orders/my-orders')
}

export const fetchAllOrders = async () => {
  return await apiGet('orders/all-orders')
}

export const updateOrderStatus = async (id, status) => {
  return await apiPut(`orders/update-status/${id}`, { status })
}

export const confirmPayment = async (paymentId) => {
  return await apiPut(`orders/confirm-payment/${paymentId}`)
}

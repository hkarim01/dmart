import { apiGet, apiPost } from './network'

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

export const forgotPassword = async (data) => {
  return await apiPost('auth/forgot-password', data)
}

export const fetchItemFromLocal = (key) => {
  const item = localStorage.getItem(key)
  return item ? JSON.parse(item) : null
}

export const setItemInLocal = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const deleteItemFromLocal = (key) => {
  localStorage.removeItem(key)
}

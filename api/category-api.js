import http from './http'

const category = {}

category.getCategories = () => {
  return http.get(`/categories`)
}
category.getCategoryById = id => {
  return http.get(`/categories/${id}`)
}
export default category

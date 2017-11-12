import axios from 'axios'

axios.defaults.baseURL = 'https://api.ryths.cn'
axios.interceptors.request.use(config => {
  console.log(config)
  return config
}, error => {
  console.log(error)
  return Promise.reject(error)
})

axios.interceptors.response.use(config => {
  console.log(config)
  return config
}, error => {
  console.log(error)
  return Promise.reject(error)
})

export default axios

import http from './http'

const user = {}

user.login = (username, password) => {
  return http.post('/token', {
    username,
    password
  })
}
user.checkToken = token => {
  return http.post('/token/check', {
    token
  })
}
export default user

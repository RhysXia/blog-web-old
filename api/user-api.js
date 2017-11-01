import http from './http'

const user = {}

user.login = (username, password) => {
  return http.post('/token', {
    username,
    password
  })
}
export default user

/**
 * 操作浏览器内置存储的工具类
 * @type {{}}
 */
const store = {}

store.put = (key, value) => {
  localStorage.setItem(key, value)
}

store.get = key => {
  return localStorage[key]
}

store.delete = key => {
  localStorage.removeItem(key)
}

export default store

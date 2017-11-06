import http from './http'

const tag = {}

tag.getTags = (page, size, sort) => {
  return http.get('/tags', {
    params: {
      page,
      sort,
      size
    }
  })
}
tag.getTagById = id => {
  return http.get(`/tags/${id}`)
}
export default tag

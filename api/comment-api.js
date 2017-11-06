import http from './http'

const comment = {}

comment.getCommentsByArticleId = (articleId, page, size, sort = null) => {
  return http.get(`/articles/${articleId}/comments`, {
    params: {
      page,
      size,
      sort
    }
  })
}
export default comment

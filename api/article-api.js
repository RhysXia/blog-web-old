import http from './http'

const article = {}

article.getArticles = (page, size, sort = null) => {
  return http.get('/articles', {
    params: {
      page,
      size,
      sort
    }
  })
}

article.getArticleById = (id) => {
  return http.get('/articles/' + id)
}

article.getArticlesByTagId = (tagId, page, size, sort = null) => {
  return http.get(`/tags/${tagId}/articles`, {
    params: {
      page,
      size,
      sort
    }
  })
}
export default article

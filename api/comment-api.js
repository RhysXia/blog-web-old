import http from './http'

const comment = {}

comment.getCommentsByArticleId = (articleId, currentPage, pageSize, includeAuthor = false, includeReply = false, orderBy = 'createDate:DESC', includeArticle = false) => {
  return http.get(`/articles/${articleId}/comments`, {
    params: {
      currentPage,
      pageSize,
      includeAuthor,
      includeReply,
      includeArticle,
      orderBy
    }
  })
}

export default comment

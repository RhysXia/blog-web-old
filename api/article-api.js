import http from './http'

const article = {}
article.getHotArticles = (currentPage, pageSize, includeCategory = false, includeAuthor = false, includeContent = false, orderBy = 'updateDate:DESC') => {
  return http.get('/articles/hot', {
    params: {
      currentPage,
      pageSize,
      includeCategory,
      includeAuthor,
      includeContent,
      orderBy
    }
  })
}

article.getRecomArticles = (currentPage, pageSize, includeCategory = false, includeAuthor = false, includeContent = false, orderBy = 'updateDate:DESC') => {
  return http.get('/articles/recommendation', {
    params: {
      currentPage,
      pageSize,
      includeCategory,
      includeAuthor,
      includeContent,
      orderBy
    }
  })
}

article.getArticles = (currentPage, pageSize, includeCategory = false, includeAuthor = false, includeContent = false, orderBy = 'updateDate:DESC') => {
  return http.get('/articles', {
    params: {
      currentPage,
      pageSize,
      includeCategory,
      includeAuthor,
      includeContent,
      orderBy
    }
  })
}

article.getArticleById = (id, includeContent = false, includeCategory = false, includeAuthor = false) => {
  return http.get('/articles/' + id, {
    params: {
      includeCategory,
      includeAuthor,
      includeContent
    }
  })
}

article.checkPraise = (articleId) => {
  return http.get(`/articles/${articleId}/isPraise`)
}

article.getArticlesByCategoryId = (categoryId, currentPage, pageSize, includeCategory = false, includeAuthor = false, includeContent = false, orderBy = 'updateDate:DESC') => {
  return http.get(`/categories/${categoryId}/articles`, {
    params: {
      currentPage,
      pageSize,
      includeCategory,
      includeAuthor,
      includeContent,
      orderBy
    }
  })
}
export default article

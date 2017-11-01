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

export default article

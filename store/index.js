import articleApi from '~/api/article-api'

export const actions = {
  nuxtServerInit ({commit, state}) {
    const hotArticles = state.article.hotArticles
    if (hotArticles.length === 0) {
      articleApi.getHotArticles(0, 6)
        .then(res => {
          if (res.data.code === 0) {
            commit('article/setHotArticles', res.data.data)
          }
        })
    }
  }
}

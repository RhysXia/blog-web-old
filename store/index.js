import articleApi from '~/api/article-api'

export const actions = {
  nuxtServerInit ({commit, state}) {
    const hotArticles = state.article.hotArticles
    if (hotArticles.length === 0) {
      return articleApi.getArticles(0, 6, 'praiseNum,DESC')
        .then(res => {
          if (res.data.code === 0) {
            commit('article/setHotArticles', res.data.result.data)
          }
        })
    }
  }
}

export const state = () => ({
  token: ''
})

export const mutations = {
  updateToken (state, token) {
    state.token = token
  },
  deleteToken () {
    state.token = ''
  }
}

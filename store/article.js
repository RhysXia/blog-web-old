export const state = () => ({
  hotArticles: []
})

export const mutations = {
  setHotArticles (state, articles) {
    state.hotArticles = articles
  }
}

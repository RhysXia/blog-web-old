<template lang="pug">
  .tag
    .panel(:style="'background-image:url('+tag.poster+')'")
      .name {{tag.name}}
      .desc {{tag.description}}
    ArticleList(:hasMore="hasMore",:articles="articles",v-model="isLoading",@on-load="onLoad")
</template>
<script>
  import ArticleApi from '~/api/article-api'
  import TagApi from '~/api/tag-api'
  import ArticleList from '~/components/article-list'

  export default {
    validate ({params}) {
      return /^\d+$/.test(params.id)
    },
    async asyncData ({params}) {
      const id = params.id
      const data = {
        hasMore: true,
        currentPage: 0,
        pageSize: 7,
        id: id
      }
      await ArticleApi.getArticlesByTagId(id, data.currentPage, data.pageSize).then(res => {
        if (res.data.code === 0) {
          data.articles = res.data.result.data
          data.currentPage++
          if (data.currentPage >= res.data.result.totalPages) {
            data.hasMore = false
          }
        } else {
          data.articles = []
        }
      })
      await TagApi.getTagById(id).then(res => {
        if (res.data.code === 0) {
          data.tag = res.data.result
        } else {
          data.tag = {}
        }
      })
      return data
    },
    data () {
      return {
        isLoading: false
      }
    },
    methods: {
      onLoad () {
        ArticleApi.getArticlesByTagId(this.id, this.currentPage, this.pageSize).then(res => {
          if (res.data.code === 0) {
            res.data.result.data.forEach(item => {
              this.articles.push(item)
            })
            this.currentPage++
            if (this.currentPage >= res.data.result.totalPages) {
              this.hasMore = false
            }
          }
          this.isLoading = false
        })
      }
    },
    components: {
      ArticleList
    }
  }
</script>
<style lang="stylus" scoped>
  .tag
    .panel
      background-size cover
      height 230px
      margin-bottom 1rem
      display flex
      flex-direction column
      align-items center
      justify-content center
      color #2294EA
      .name
        font-size 16px
        font-weight bold
</style>

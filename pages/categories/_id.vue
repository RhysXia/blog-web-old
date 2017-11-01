<template lang="pug">
  .category
    .panel
      .name {{category.name}}
      .desc {{category.description}}
    ArticleList(:hasMore="hasMore",:articles="articles",v-model="isLoading",@on-load="onLoad")
</template>
<script>
  import ArticleApi from '~/api/article-api'
  import CategoryApi from '~/api/category-api'
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
      await ArticleApi.getArticlesByCategoryId(id, data.currentPage, data.pageSize).then(res => {
        if (res.data.code === 0) {
          data.articles = res.data.data
          if (data.currentPage >= res.data.pagination.totalPage) {
            data.hasMore = false
          }
          data.currentPage++
        } else {
          data.articles = []
        }
      })
      await CategoryApi.getCategoryById(id).then(res => {
        if (res.data.code === 0) {
          data.category = res.data.data
        } else {
          data.category = {}
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
        ArticleApi.getArticlesByCategoryId(this.id, this.currentPage, this.pageSize, false).then(res => {
          if (res.data.code === 0) {
            res.data.data.forEach(item => {
              this.articles.push(item)
            })
            if (this.currentPage >= res.data.pagination.totalPage) {
              this.hasMore = false
            }
            this.currentPage++
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
  .category
    .panel
      background-color #fff
      height 230px
      margin-bottom 1rem
      display flex
      flex-direction column
      align-items center
      justify-content center
      .name
        font-size 16px
        font-weight bold
</style>

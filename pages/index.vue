<template lang="pug">
  .index
    Carousel(:height="230",v-model="index",loop,autoplay,trigger="click")
      CarouselItem(v-for="(article,index) in recommendations",:key="index")
        nuxt-link.carousel-item(:to="'articles/'+article.id")
          span.title {{article.title}}
          img.image(:src="article.poster")
    ArticleList(:hasMore="hasMore",:articles="articles",v-model="isLoading",@on-load="onLoad")

</template>

<script>
  import articleApi from '~/api/article-api'
  import Nuxt from '../.nuxt/components/nuxt.vue'
  import NuxtLink from '../.nuxt/components/nuxt-link'
  import ArticleList from '~/components/article-list'

  export default {
    async asyncData () {
      let data = {
        hasMore: true,
        currentPage: 0,
        pageSize: 7
      }
      await articleApi.getRecomArticles(0, 6).then(res => {
        if (res.data.code === 0) {
          data.recommendations = res.data.data
        } else {
          data.recommendations = []
        }
      })
      await articleApi.getArticles(data.currentPage, data.pageSize, true).then(res => {
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
      return data
    },
    data () {
      return {
        index: 0,
        isLoading: false
      }
    },
    methods: {
      onLoad () {
        articleApi.getArticles(this.currentPage, this.pageSize, true).then(res => {
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
      NuxtLink,
      Nuxt,
      ArticleList
    }
  }
</script>
<style lang="stylus" scoped>
  .carousel-item
    position relative
    display block
    .image
      background-size cover
      height inherit
      width inherit
    .title
      display block
      position absolute
      right 5px
      top 10px
      color #000
      background-color rgba(0, 0, 0, 0.15)
      padding 5px 10px
      border-radius 3px
</style>

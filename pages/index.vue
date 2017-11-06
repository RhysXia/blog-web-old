<template lang="pug">
  .index
    Carousel(:height="230",v-model="index",loop,autoplay,trigger="click")
      CarouselItem(v-for="(article,index) in recommendations",:key="index")
        nuxt-link.carousel-item(:to="'/articles/'+article.id")
          span.title {{article.title}}
          img.image(:src="article.poster")
    ArticleList.article-list(:hasMore="hasMore",:articles="articles",v-model="isLoading",@on-load="onLoad")

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
      await articleApi.getArticles(0, 6).then(res => {
        if (res.data.code === 0) {
          data.recommendations = res.data.result.data
        } else {
          data.recommendations = []
        }
      })
      await articleApi.getArticles(data.currentPage, data.pageSize).then(res => {
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
        articleApi.getArticles(this.currentPage, this.pageSize).then(res => {
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
    width inherit
    height inherit
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
  .article-list
    margin-top 1rem
</style>

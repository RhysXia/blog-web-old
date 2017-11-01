<template lang="pug">
  .list
    r-article(v-for="(article,index) in articles",:key="index",:article="article")
    .hasmore.panel(v-show="hasMore && !isLoading",@click="loadMore") 加载更多
    .nomore.panel(v-show="!hasMore") 没有更多
    .loading.panel(v-show="hasMore && isLoading")
      Icon.icon-loading(type="load-c" size=18)
      span Loading
</template>

<script>
  import RArticle from './article'

  export default {
    props: {
      articles: {
        type: Array,
        default: []
      },
      hasMore: {
        type: Boolean,
        default: true
      },
      isLoading: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {}
    },
    methods: {
      loadMore () {
        this.$emit('on-load', true)
      }
    },
    model: {
      prop: 'isLoading',
      event: 'on-load'
    },
    components: {
      RArticle
    }
  }
</script>
<style lang="stylus" scoped>
  .list
    .panel
      padding 5px
      text-align center
      margin-bottom 10px
      border-radius 5px
      font-size 14px
    .hasmore
    .loading
      background-color #fff
      .icon-loading
        margin-right 5px
        transform-origin 50% 50%
        animation circle 1s linear infinite
    .hasmore
      cursor pointer
      &:hover
        background-color #ddd
    .loading
    .nomore
      cursor not-allowed
    .nomore
      background-color #f7f7f7

  @keyframes circle
    from
      transform rotate(0deg)
    50%
      transform rotate(180deg)
    to
      transform rotate(360deg)
</style>

<template lang="pug">
  .container
    .row
      .col
        b-list-group
          b-list-group-item(active-class="active",to="/") 首页
          b-list-group-item(to="/categories") 分类
      .col-5
        nuxt
      .col
        b-list-group
          b-list-group-item(v-for="(article,index) in hotArticles",:key="index",:to="'/articles/'+article.id") {{article.title}}

</template>

<script>
  import articleApi from '~/api/article-api'
  import Nuxt from '../.nuxt/components/nuxt.vue'

  export default {
    asyncData () {
      return articleApi.getHotArticles(0, 10).then(res => {
        const data = res.data
        if (data.code === 0) {
          return {hotArticles: data.data}
        }
        return {hotArticles: []}
      })
    },
    components: {Nuxt}
  }
</script>

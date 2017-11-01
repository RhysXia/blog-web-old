<template lang="pug">
  .category-container
    h2.title 所有分类
    .list
        Card.category(v-for="(category,index) in categories",:key="index")
          nuxt-link.name(slot="title",:to="'/categories/'+category.id") {{category.name}}
          .desc {{category.description}}

</template>
<script>
  import CategoryApi from '~/api/category-api'
  import ArticleList from '~/components/article-list'
  import NuxtLink from '../../.nuxt/components/nuxt-link'

  export default {
    async asyncData () {
      const data = {}
      await CategoryApi.getCategories().then(res => {
        if (res.data.code === 0) {
          data.categories = res.data.data
        } else {
          data.categories = []
        }
      })
      return data
    },
    components: {
      NuxtLink,
      ArticleList
    }
  }
</script>
<style lang="stylus" scoped>
  .category-container
    .title
      background-color #fff
      padding 8px 16px
      border-radius 5px
    .list
      .category
        margin 20px 0
        .name
          color #000
          &:hover
            text-decoration underline
        .desc
          word-break break-all

</style>

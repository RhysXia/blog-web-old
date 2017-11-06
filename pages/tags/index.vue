<template lang="pug">
  .category-container
    h2.title 所有分类
    .list
        Card.category(v-for="(tag,index) in tags",:key="index")
          nuxt-link.name(slot="title",:to="'/tags/'+tag.id") {{tag.name}}
          .desc {{tag.description}}

</template>
<script>
  import TagApi from '~/api/tag-api'
  import ArticleList from '~/components/article-list'
  import NuxtLink from '../../.nuxt/components/nuxt-link'

  export default {
    async asyncData () {
      const data = {}
      await TagApi.getTags().then(res => {
        if (res.data.code === 0) {
          data.tags = res.data.result.data
        } else {
          data.tags = []
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

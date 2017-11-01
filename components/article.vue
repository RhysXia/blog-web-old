<template lang="pug">
  .container
    nuxt-link(:to="'/articles/'+article.id")
      img.poster(:src="article.poster")
    .pannel
      nuxt-link(:to="'/articles/'+article.id")
        .title {{article.title}}
      .summary {{article.summary}}
      .info
        .data
          Icon(type="ios-clock")
          span.tag {{article.updateDate}}
        .read
          Icon(type="ios-book")
          span.tag {{article.readNum}}
        .praise
          Icon(type="ios-heart")
          span.tag {{article.praiseNum}}
        .category(v-if="article.category != null")
          Icon(type="ios-pricetag")
          span.tag
            nuxt-link(:to="'categories/'+article.category.id") {{article.category.name}}

</template>

<script>
  import NuxtLink from '../.nuxt/components/nuxt-link'

  export default {
    props: {
      article: {
        type: Object
      }
    },
    components: {
      NuxtLink
    }
  }
</script>
<style lang="stylus" scoped>
  .container
    display flex
    flex-direction row
    background-color #FFF
    padding 0.5rem
    a
      color #000
      text-decoration none
    &:hover
      background-color #ddd
    .poster
      width 8rem
      height 8rem
      transition transform 0.4s
      &:hover
        transform scale(1.1)
    .pannel
      padding-left 1rem
      display flex
      flex-direction column

      .title
        font-weight bold
        transition transform 0.4s
        &:hover
          text-decoration underline
          transform translate(5px, 0)
      .summary
        margin auto 0
      .info
        display flex
        flex-direction row
        margin-bottom 0
        > *
          padding-right 1rem
        .category
          text-decoration underline
        .tag
          padding-left 5px



</style>

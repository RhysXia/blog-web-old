<template lang="pug">
  .article-container
    .article
      .title {{article.title}}
      .info
        .author
          Avatar(:src="article.author.avatar")
          .nickname {{article.author.nickname}}
        .updateDate {{article.updateDate}}
        .read {{article.readNum}}
        .praise {{article.praiseNum}}
        .category {{article.category.name}}
      .content {{article.content}}
    .comment-list
      .comment
        Avatar
</template>
<script>
  import ArticleApi from '~/api/article-api'

  export default {
    validate ({params}) {
      return /^\d+$/.test(params.id)
    },
    async asyncData ({params}) {
      const data = {}
      const id = params.id
      await ArticleApi.getArticleById(id, true, true, true).then(res => {
        if (res.data.code === 0) {
          data.article = res.data.data
        } else {
          data.article = {}
        }
      })
      return data
    }
  }
</script>
<style lang="stylus" scoped>

</style>

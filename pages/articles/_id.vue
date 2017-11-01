<template lang="pug">
  .article-container
    .article
      .header
        h1.title {{article.title}}
        .info
          .author
            Icon(type="person")
            | {{article.author.nickname}}
          .updateDate
            Icon(type="ios-clock")
            | {{article.updateDate}}
          .read
            Icon(type="ios-book")
            | {{article.readNum}}
          .praise
            Icon(type="ios-heart")
            | {{article.praiseNum}}
          .category
            Icon(type="ios-pricetag")
            | {{article.category.name}}
      .content(v-html="article.content")
    .comment-list
      h3.title 评论列表
      .comment(v-for="(comment,index) in comments",:key="index")
        Avatar(shape="square",size="large",:src="comment.author.avatar")
        .right
          .top
            .nickname {{comment.author.nickname}}
          .content {{comment.content}}
          .bottom
            .date
              Icon(type="ios-clock",size="14")
              |{{comment.createDate}}
            .reply
              Icon(type="reply",size="14")
              |回复

</template>
<script>
  import marked from 'marked'
  import ArticleApi from '~/api/article-api'
  import CommentApi from '~/api/comment-api'
  import highlight from 'highlight.js'
  import 'highlight.js/styles/idea.css'

  marked.setOptions({
    highlight: (code) => {
      return highlight.highlightAuto(code).value
    }
  })

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
          data.article.content = marked(data.article.content)
        } else {
          data.article = {}
        }
      })
      await CommentApi.getCommentsByArticleId(id, 0, 10, true).then(res => {
        if (res.data.code === 0) {
          data.comments = res.data.data
        } else {
          data.commments = []
        }
      })
      return data
    }
  }
</script>
<style lang="stylus" scoped>
  .article-container
    .article
      display flex
      flex-direction column
      .header
        border-radius 5px 5px 0 0
        background-color #9CAEBF
        color #fcfcfc
        padding 20px
        .title
          width 100%
          text-align center
        .info
          display flex
          flex-direction row
          align-items center
          justify-content center
          font-size 16px
          > *
            padding 0 10px
            i
              padding-right 5px
          .category
          .author
            cursor pointer
            &:hover
              text-decoration underline
          .praise
            cursor pointer
      .content
        background-color #fff
        border-radius 0 0 5px 5px
        padding 20px
    .comment-list
      margin-top 20px
      .title
        background-color #fff
        padding 5px 10px
        border-radius 5px 5px 0 0
      .comment
        padding 10px
        background-color #fff
        margin 10px 0
        display flex
        flex-direction row
        .right
          display flex
          flex-direction column
          padding-left 10px
          .top
          .bottom
            display flex
            flex-direction row
            align-items center
            >*
              margin-right 10px
          .top
            .nickname
              font-size 14px
          .content
            font-size 14px
          .bottom
            margin-bottom 0
            i
              padding-right 5px


</style>

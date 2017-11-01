<template lang="pug">
  .container
    .header
      ul.navbar
        li.navbar-item
          nuxt-link.logo(to="/") Ryths
        li.navbar-item
          nuxt-link.desc(to="/") Coding All Life
        li.navbar-item.right
          nuxt-link(to="/login") 登录
        li.navbar-item
          nuxt-link(to="/signup") 注册
    Row(:gutter="10",type="flex",align="top",class-name="main")
      Col(span="6")
        Affix(:offset-top="55")
          Menu(width="auto",@on-select="onSelect",:active-name="activeName")
            MenuItem(name="/") 首页
            MenuItem(name="/categories") 分类
      Col(:md="12",:sm="18")
        nuxt
      Col(:md="6",:sm="0")
        Affix(:offset-top="55")
          Menu(width="auto",@on-select="onSelect",:active-name="activeName")
            MenuGroup(title="热门推荐")
              MenuItem(v-for="(article,index) in hotArticles",:key="index",:name="'/articles/'+article.id")
                span.label {{index+1}}
                | {{article.title}}
    .footer
      span © Ryths Xia 2017. All rights reserved.


</template>
<script>
  import Nuxt from '../.nuxt/components/nuxt.vue'
  import NuxtLink from '../.nuxt/components/nuxt-link'
  import StoreUtills from '~/utils/store'
  import UserApi from '~/api/user-api'

  export default {
    components: {
      NuxtLink,
      Nuxt
    },
    methods: {
      onSelect (name) {
        this.$router.push(name)
      }
    },
    data () {
      return {
        activeName: ''
      }
    },
    computed: {
      hotArticles () {
        return this.$store.state.article.hotArticles
      }
    },
    mounted () {
      // 检测store中是否有token,如果没有，从localstorage中取
      let token = this.$store.state.token
      if (!token) {
        // 检查localStorage中是否有token，如果有，向服务器校验token正确性，通过则放入store中
        token = StoreUtills.get('ryths-token')
        if (token) {
          UserApi.checkToken(token).then(res => {
            console.log(res)
            if (res.data.code === 0) {
              if (res.data.data) {
                this.$store.commit('updateToken', token)
              } else {
                // token校验失败，则清除localstorage中的token
                StoreUtills.delete('ryths-token')
              }
            }
          })
        }
      }
      // 设置激活的菜单
      this.activeName = this.$route.fullPath
    }
  }
</script>
<style lang="stylus" scoped>
  .container
    display flex
    flex-direction column
    background-color #eee
    .header
      position sticky
      z-index 1000
      top 0
      background-color #9CAEBF
      height 2.5rem
      .navbar
        display flex
        flex-direction row
        align-items center
        list-style none
        height inherit
        margin 0 5%
        .navbar-item
          font-size 14px
          padding 0 5px
          a
            text-decoration none
            color #fff
          .logo
            font-size 20px
            font-weight bold
          &.right
            margin-left auto
    .main
      padding-top 1rem
      margin auto 5% !important
      padding-bottom 1rem
      .label
        display inline-block
        background-color #ddd
        width 20px
        height 20px
        text-align center
        line-height 20px
        margin-right 10px
    .footer
      background-color #9CAEBF
      height 2.5rem
      color #fff
      display flex
      align-items center
      justify-content center
      font-size 16px

</style>
<style lang="stylus">
  html
    body
      margin 0
      padding 0
</style>

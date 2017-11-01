<template lang="pug">
  Card
    p(slot="title") 登录
    Form(:model="user",ref="loginForm",:rules="rules",:label-width="80")
      FormItem(label="用户名",prop="username")
        Input(type="text",placeholder="请输入用户名",v-model="user.username")
          Icon(type="ios-person-outline",slot="prepend")
      FormItem(label="密码",prop="password")
        Input(type="password",placeholder="请输入密码",v-model="user.password")
          Icon(type="ios-locked-outline",slot="prepend")
      FormItem(label="记住密码")
        i-switch(v-model="user.remember")
      FormItem
        Button(type="primary",@click="submit") 登录
</template>
<script>
  import UserApi from '~/api/user-api'
  import StoreUtils from '~/utils/store'

  export default {
    data () {
      return {
        rules: {
          username: [
            {required: true, trigger: 'change', message: '请输入用户名'}
          ],
          password: [
            {required: true, trigger: 'change', message: '请输入密码'}
          ]
        },
        user: {
          username: '',
          password: '',
          remember: false
        }
      }
    },
    methods: {
      // 登录
      submit () {
        this.$refs.loginForm.validate(flag => {
          if (flag) {
            let {username, password, remember} = this.user
            UserApi.login(username, password).then(res => {
              if (res.data.code === 0) {
                // 如果选择记住密码，则将密码写入localStorage中
                if (remember) {
                  StoreUtils.put('ryths-token', res.data.data)
                }
                // 将token放入store中
                this.$store.commit('updateToken', res.data.data)
                // 显示登录成功
                this.$Notice.success({
                  title: '登陆成功',
                  duration: 2
                })
                // 跳转到之前来的页面
                // 从route.meta中取出原来的地址
                const from = this.$route.meta.from
                // 如果from不存在或者为当前页,则返回首页
                if (!from || from === this.$route.fullPath) {
                  this.$router.push('/')
                } else {
                  this.$router.push(from)
                }
              } else {
                // 登录失败
                this.$Notice.error({
                  title: '登录失败',
                  desc: res.data.message,
                  duration: 2
                })
              }
            })
          }
        })
      }
    },
    // 拦截路由，获取跳转的源地址
    beforeRouteEnter (to, from, next) {
      // 将源地址放入to.meta中
      to.meta.from = from.fullPath
      next()
    }
  }
</script>
<style lang="stylus" scoped>

</style>

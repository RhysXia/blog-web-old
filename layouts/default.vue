<template lang="pug">
  div
    b-navbar(type="dark" toggleable="md" variant="secondary" sticky=true)
      b-navbar-brand(href="#") Ryths
      b-nav-text Coding All Life
      b-nav-toggle(target="nav_collapse")
      b-collapse(is-nav id="nav_collapse")
        b-nav.ml-auto(is-nav-bar)
          b-nav-form
            b-input-group
              b-form-input.mr-sm-2(size="sm" type="text" placeholder="Search")
              b-btn.my-2.my-sm-0(variant="outline-success" type="submit") 搜索
          b-nav-item(right to="#") 登录
          b-nav-item(right to="#") 注册
    nuxt.main
</template>

<style lang="stylus" scoped>
  .main
    margin-top 10px
</style>

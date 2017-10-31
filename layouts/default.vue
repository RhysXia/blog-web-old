<template lang="pug">
  div
    b-navbar(type="dark" toggleable="md" variant="secondary" sticky="true")
      b-nav-toggle(target="nav_collapse")
      b-navbar-brand(href="#") Ryths
      b-collapse(is-nav id="nav_collapse")
        b-nav(is-nav-bar)
          b-nav-item(to="#") 文章
          b-nav-item(to="#") 分类
        b-nav.ml-auto(is-nav-bar)
          b-nav-form
            b-input-group
              b-form-input.mr-sm-2(size="sm" type="text" placeholder="Search")
              b-btn.my-2.my-sm-0(variant="outline-success" type="submit") 搜索
          b-nav-item(right to="#") 登录
          b-nav-item(right to="#") 注册
    nuxt
</template>

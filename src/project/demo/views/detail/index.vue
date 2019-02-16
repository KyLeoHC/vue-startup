<template>
  <div class="detail-container">
    <van-nav-bar
      title="Detail"
      left-arrow
      @click-left="onClickLeft">
    </van-nav-bar>
    <div class="logo"></div>
    <header>user info</header>
    <div class="user-info">
      <div>name: {{ $route.query.name }}</div>
      <div>email: {{ $route.query.email }}</div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Detail',
    data() {
      return {};
    },
    methods: {
      onClickLeft() {
        history.go(-1);
      }
    }
  };
</script>
<style lang="stylus">
  @import "~styles/common.styl"

  .detail-container {
    font-size 18px
    text-align center

    .logo {
      width 200px; /*rem*/
      height @width; /*rem*/
      margin 20px auto 10px auto
      background url(/static/images/logo.png) no-repeat
      background-size cover
    }

    .user-info {
      font-size 14px

      & > div {
        margin 10px
      }
    }
  }
</style>

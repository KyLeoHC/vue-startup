<template>
  <div class="demo2-container">
    <div class="logo"></div>
    <a href="javascript:;" @click="linkToDemo">
      跳转到demo
    </a>
  </div>
</template>
<script>
  export default {
    name: 'Demo2',
    methods: {
      linkToDemo() {
        this.$$router.push({
          project: 'demo',
          path: '/list',
          query: {
            from: 'demo2'
          }
        });
      }
    }
  };
</script>
<style lang="stylus">
  @import "~styles/common.styl"

  .demo2-container {
    font-size 18px
    text-align center

    .logo {
      width 200px; /*rem*/
      height @width; /*rem*/
      margin 20px auto 10px auto
      background url(/static/images/logo.png) no-repeat
      background-size cover
    }
  }
</style>

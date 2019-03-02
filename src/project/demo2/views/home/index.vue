<template>
  <div class="home-container">
    <logo/>
    <div class="home__link-group">
      <a href="javascript:;" @click="linkToDemo">
        跳转到demo
      </a>
      <a href="javascript:;" @click="$router.push({name: 'article'})">
        跳转到article页面
      </a>
    </div>
  </div>
</template>
<script>
  import Logo from '../../components/logo';

  export default {
    name: 'Home',
    components: {
      Logo
    },
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
<style lang="scss">
  @import "~styles/common";

  .home-container {
    font-size: 18px;
    text-align: center;

    .home__link-group {
      a {
        margin-right: 10px;

        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
</style>

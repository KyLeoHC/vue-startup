<template>
  <div class="home-container">
    <logo/>
    <ul class="home__link-group">
      <li>
        <a href="javascript:;" @click="$router.push({name: 'drag'})">
          这是一个拖放动画示例
        </a>
      </li>
      <li>
        <a href="javascript:;" @click="$router.push({name: 'vuexTest'})">
          测试一下vuex
        </a>
      </li>
      <li>
        <a href="javascript:;" @click="linkToDemo">
          跳转到demo
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
  import router from '@/common/router';
  import Logo from '../../components/logo';

  export default {
    name: 'Home',
    components: {
      Logo
    },
    methods: {
      linkToDemo() {
        router.push({
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
      li {
        margin-bottom: 6px;

        a {
          margin-right: 10px;

          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
  }
</style>

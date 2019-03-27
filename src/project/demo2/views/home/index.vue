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
<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  import Logo from '../../components/logo/index.vue';
  import router from '@/common/router';

  @Component({
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
  })
  export default class Home extends Vue {
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

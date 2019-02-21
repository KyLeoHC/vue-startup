<template>
  <div class="logo" @click="onClickLogo"></div>
</template>
<script>
  import { mapActions } from 'vuex';

  export default {
    name: 'Logo',
    methods: {
      ...mapActions('share', [
        'sendMessage'
      ]),
      onClickLogo() {
        this.sendMessage('clickLogo');
      }
    }
  };
</script>
<style lang="stylus">
  .logo {
    width 200px; /*rem*/
    height @width; /*rem*/
    margin 20px auto 10px auto
    background url(/static/images/logo.png) no-repeat
    background-size cover
    cursor pointer
  }
</style>

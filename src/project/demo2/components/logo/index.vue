<template>
  <div class="logo" @click="onClickLogo"></div>
</template>
<script>
  import { mapActions } from 'vuex';

  export default {
    name: 'Logo',
    methods: {
      ...mapActions('share', [
        'sendClickEvent'
      ]),
      onClickLogo() {
        this.sendClickEvent('clickLogo');
      }
    }
  };
</script>
<style lang="scss">
  .logo {
    $w: 200px;
    width: $w; /* rem */
    height: $w; /* rem */
    margin: 20px auto 10px auto;
    background: url(/static/images/logo.png) no-repeat;
    background-size: cover;
    cursor: pointer;
  }
</style>

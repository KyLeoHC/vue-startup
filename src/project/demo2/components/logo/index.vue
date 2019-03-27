<template>
  <div class="logo" @click="onClickLogo"></div>
</template>
<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  import { namespace } from 'vuex-class';

  const share = namespace('share');

  @Component
  export default class Logo extends Vue {
    /* eslint @typescript-eslint/no-explicit-any: 0 */
    @share.Action('sendMessage') sendMessage: any;

    onClickLogo() {
      this.sendMessage('clickLogo');
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

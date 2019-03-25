<template>
  <div class="logo" @click="onClickLogo"></div>
</template>
<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  import { mapActions } from 'vuex';

  @Component({
    methods: {
      ...mapActions('share', [
        'sendMessage'
      ]),
      onClickLogo() {
        this.sendMessage('clickLogo');
      }
    }
  })
  export default class Logo extends Vue {
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

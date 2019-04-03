<template>
  <div class="vuex-test-container">
    <logo/>
    <div>{{ newContent }}</div>
  </div>
</template>
<script>
  import {
    mapGetters,
    mapActions
  } from 'vuex';
  import Logo from '../../components/logo';

  export default {
    name: 'VuexTest',
    computed: {
      ...mapGetters('share', [
        'newContent'
      ])
    },
    components: {
      Logo
    },
    methods: {
      ...mapActions('share', [
        'sendClickEvent'
      ])
    },
    mounted() {
      this.sendClickEvent('clickLogo');
    }
  };
</script>
<style lang="scss">
  @import "~styles/common";

  .vuex-test-container {
    font-size: 18px;
    text-align: center;
  }
</style>

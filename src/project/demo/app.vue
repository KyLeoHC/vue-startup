<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
  export default {
    name: 'App',
    data() {
      return {
        colorGreen: '#329a39'
      };
    }
  };
</script>
<style lang="stylus">
  @import "~styles/flexible.styl"
  @import "~styles/common.styl"
  @import "~styles/mobile.styl"
  @import "~styles/theme.styl"

  #app {
    height 100%
  }
</style>

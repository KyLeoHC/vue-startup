<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
  export default {
    name: 'App'
  };
</script>
<style lang="stylus">
  @import '~styles/common.styl';
  @import '~styles/mobile.styl';
  @import '~styles/theme.styl';

  #app {
    height 100%
  }
</style>

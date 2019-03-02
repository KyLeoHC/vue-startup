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
<style lang="scss">
  @import "~styles/common";
  @import "~styles/mobile";
  @import "~styles/theme";

  #app {
    height: 100%;
  }
</style>

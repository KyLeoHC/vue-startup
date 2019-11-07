<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script src="./app.ts"></script>
<style lang="scss">
  @import "~styles/common";
  @import "~styles/mobile";
  @import "~styles/theme";

  #app {
    height: 100%;
  }
</style>

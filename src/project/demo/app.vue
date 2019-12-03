<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script src="./app.ts"></script>
<style lang="scss">
  @use "../../styles/common";
  @use "../../styles/mobile";
  @use "../../styles/theme";

  #app {
    height: 100%;
  }
</style>

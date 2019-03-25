<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';

  @Component({})
  export default class App extends Vue {
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

<template>
  <div id="app">
    hello world！- {{ who }}
  </div>
</template>
<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  import { testFn } from './services/test';

  @Component({
    data() {
      return {
        msg: 'hello typescript!'
      };
    },
    methods: {
      testA(a: string): void {
        console.log(a);
      }
    },
    mounted() {
      testFn();
    }
  })
  export default class App extends Vue {
    who: string = 'leo';
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

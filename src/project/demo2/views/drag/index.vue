<template>
  <div class="drag-container">
  </div>
</template>
<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';

  @Component
  export default class Drag extends Vue {
  };
</script>
<style lang="scss">
  @import "~styles/common";

  .drag-container {
    font-size: 18px;
  }
</style>

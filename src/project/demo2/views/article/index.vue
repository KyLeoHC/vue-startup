<template>
  <div class="article-container">
    <logo/>
    <div>{{ newContent }}</div>
    <div>This is article page</div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex';
  import Logo from '../../components/logo';

  export default {
    name: 'Article',
    computed: {
      ...mapGetters('share', [
        'newContent'
      ])
    },
    components: {
      Logo
    }
  };
</script>
<style lang="scss">
  @import "~styles/common";

  .article-container {
    font-size: 18px;
    text-align: center;
  }
</style>

<template>
  <div class="article-container">
    <logo/>
    <div>{{ newContent }}</div>
    <div>This is article page</div>
  </div>
</template>
<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  import { mapGetters } from 'vuex';
  import Logo from '../../components/logo/index.vue';

  @Component({
    computed: {
      ...mapGetters('share', [
        'newContent'
      ])
    },
    components: {
      Logo
    }
  })
  export default class Article extends Vue {
  };
</script>
<style lang="scss">
  @import "~styles/common";

  .article-container {
    font-size: 18px;
    text-align: center;
  }
</style>

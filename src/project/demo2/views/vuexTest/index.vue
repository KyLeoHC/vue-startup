<template>
  <div class="vuex-test-container">
    <logo/>
    <div>{{ newContent }}</div>
    <div>work with vuex</div>
  </div>
</template>
<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  import { namespace } from 'vuex-class';
  import Logo from '../../components/logo/index.vue';

  const share = namespace('share');

  @Component({
    components: {
      Logo
    }
  })
  export default class VuexTest extends Vue {
    /* eslint @typescript-eslint/no-explicit-any: 0 */
    @share.Getter('newContent')
    newContent: any;
    @share.Action('sendClickEvent')
    sendClickEvent: any;

    mounted() {
      this.sendClickEvent('clickLogo');
    }
  };
</script>
<style lang="scss">
  @import "~styles/common";

  .vuex-test-container {
    font-size: 18px;
    text-align: center;
  }
</style>

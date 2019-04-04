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
  public newContent: any;
  @share.Action('sendClickEvent')
  public sendClickEvent: any;

  public mounted(): void {
    this.sendClickEvent('clickLogo');
  }
};

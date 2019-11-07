import { Vue, Component } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

const share = namespace('share');

@Component
export default class Logo extends Vue {
  /* eslint @typescript-eslint/no-explicit-any: 0 */
  @share.Action('sendClickEvent')
  public sendClickEvent: any;

  public onClickLogo(): void {
    this.sendClickEvent('clickLogo');
  }
};

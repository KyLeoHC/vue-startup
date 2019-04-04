import { Vue, Component } from 'vue-property-decorator';
import router from '@/common/router';

@Component
export default class Detail extends Vue {
  public onClickLeft(): void {
    history.go(-1);
  }

  public linkToDemo2(): void {
    router.push({
      project: 'demo2',
      query: {
        from: 'demo'
      }
    });
  }
};

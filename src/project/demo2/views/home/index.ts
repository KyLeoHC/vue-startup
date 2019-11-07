import { Vue, Component } from 'vue-property-decorator';
import Logo from '../../components/logo/index.vue';
import router from '@/common/router';

@Component({
  components: {
    Logo
  }
})
export default class Home extends Vue {
  public linkToDemo(): void {
    router.push({
      project: 'demo',
      path: '/list',
      query: {
        from: 'demo2'
      }
    });
  }
};

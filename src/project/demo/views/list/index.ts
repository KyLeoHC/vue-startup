import { Vue, Component } from 'vue-property-decorator';
import {
  ListItem,
  fetchListData
} from '../../services/list';

@Component
export default class List extends Vue {
  public list: ListItem[] = [];
  public page = 0;
  public pageSize = 20;
  public isError = false;
  public isRefreshing = false;
  public isLoadingMore = false;
  public finished = false;
  public testObj: { a?: number[] | null; b?: number } = { a: null, b: 0 };

  public mounted(): void {
    console.log('test optional chaining: ', this.testObj.a?.[1]);
    console.log('test nullish coalescing operator: ', this.testObj.b ?? 'should be number');
  }

  public onClickLeft(): void {
    history.go(-1);
  }

  public onRefresh(): void {
    this.loadData(true);
  }

  public onLoad(): void {
    this.loadData();
  }

  public loadData(reset = false): void {
    this.page = reset ? 0 : this.page;
    fetchListData({
      page: ++this.page,
      pageSize: this.pageSize
    }).then((data): void => {
      this.list = reset ? data.list : this.list.concat(data.list);
      this.finished = this.list.length >= data.total;
    }).catch((): void => {
      this.isError = true;
    }).finally((): void => {
      this.isRefreshing = false;
      this.isLoadingMore = false;
    });
  }

  public linkToDetail(item: ListItem): void {
    this.$router.push({
      name: 'detail',
      query: {
        id: item.id,
        name: item.name,
        email: item.email,
        time: (item.time || '') + ''
      }
    });
  }
};

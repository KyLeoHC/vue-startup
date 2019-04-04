import { Vue, Component } from 'vue-property-decorator';
import {
  ListItem,
  fetchListData
} from '../../services/list';

@Component
export default class List extends Vue {
  public list: ListItem[] = [];
  public page: number = 0;
  public pageSize: number = 20;
  public isError: boolean = false;
  public isRefreshing: boolean = false;
  public isLoadingMore: boolean = false;
  public finished: boolean = false;

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

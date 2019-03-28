import http from '@/common/http';

/**
 * 列表项数据结构
 */
export class ListItem {
  /** id */
  public id: string = '';
  /** 名字 */
  public name: string = '';
  /** 电子邮箱 */
  public email: string = '';
  /** 处理时间 */
  public time?: number;

  public constructor(item: ListItem | null | undefined) {
    if (item) {
      // 运行时的数据容错处理
      this.id = item.id || '';
      this.name = item.name || '';
      this.email = item.email || '';

      if (item.time) {
        this.time = item.time;
      }
    }
  }
}

/**
 * 列表数据结构
 */
export class ListData {
  /** 数组列表 */
  public list: ListItem[] = [];
  /** 总数 */
  public total: number = 0;

  public constructor(data: ListData | null | undefined) {
    if (data) {
      // 运行时的数据容错处理
      this.list = data.list && data.list.length ? data.list : [];
      this.list = this.list.map((item) => {
        return new ListItem(item);
      });
      this.total = data.total || 0;
    }
  }
}

/**
 * 获取列表数据
 * @param params
 */
const fetchListData = (
  params: {
    page?: number;
    pageSize?: number;
  }
): Promise<ListData> => {
  return http.get<ListData>('/list', { params })
    .then(response => {
      const data: ListData = new ListData(response.data);
      // 这里进行数据处理
      data.list.forEach((item: ListItem) => {
        item.time = new Date().getTime();
      });
      return data;
    })
    .catch(response => {
      return Promise.reject(response);
    });
};

export {
  fetchListData
};

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

// 关于API数据模型的定义，这里演示是使用了class来定义，
// 因为我们期望统一处理后端的异常空数据(下面代码可以看到遍历了数据字段，判断后再赋值)，
// 但是这里有个不好的地方，在ts里，class最终会输出实际转换的代码，
// 与此同时，由于我们也对后端返回的JSON数据又重新包装处理了一次，对内存占用和性能也带来了些影响(尤其数据量大的情况下)，
// 所以这里并不倡导统一使用class定义类型，对于一些不是很有必要需要统一处理空数据异常的，我们使用interface定义就好，
// 并且对一些可能空值的字段表明null或者undefined类型，让ts编译器提醒数据使用方加入空数组处理逻辑就好

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
      // 这里如果没有需要特殊处理异常的话，可以省去这个catch代码
      return Promise.reject(response);
    });
};

export {
  fetchListData
};

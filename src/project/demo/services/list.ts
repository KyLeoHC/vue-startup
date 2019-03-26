import http from '@/common/http';

/**
 * 列表项数据结构
 */
interface ListItem {
  /** id */
  id: string;
  /** 名字 */
  name: string;
  /** 电子邮箱 */
  email: string;
  /** 处理时间 */
  time?: number;
}

/**
 * 列表数据结构
 */
class ListData {
  /** 数组列表 */
  public list: ListItem[] | null = [];
  /** 总数 */
  public total: number = 0;
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
      const data: ListData = response.data || new ListData();
      // 这里进行数据处理
      data.list = data.list || [];
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

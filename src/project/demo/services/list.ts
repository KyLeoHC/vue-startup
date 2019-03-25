import http from '@/common/http';

interface ListItem {
  id: string;
  name: string;
  email: string;
  time?: number;
}

interface ListData {
  list: ListItem[];
  total: number;
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
      const data: ListData = response.data;
      // 这里进行数据处理
      data.list.forEach((item: ListItem) => {
        item.time = new Date().getTime();
      });
      return data;
    })
    .catch(response => {
      console.log(response);
      return Promise.reject(response);
    });
};

export {
  fetchListData
};

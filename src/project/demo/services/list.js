import http from '@/common/http';

const fetchListData = params => {
  return http.get('/list', { params })
    .then(response => {
      // 这里进行数据处理
      response.data.list.forEach(item => {
        item.time = new Date().getTime();
      });
      return response.data;
    })
    .catch(response => {
      console.log(response);
      return Promise.reject(response);
    });
};

export {
  fetchListData
};

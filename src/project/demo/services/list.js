import http from '@/common/http';

const SUCCESS_CODE = 200;

const fetchListData = params => {
  return new Promise((resolve, reject) => {
    http.get('/list', { params })
      .then(response => {
        if (response.code === SUCCESS_CODE) {
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch(response => {
        reject(response);
      });
  });
};

export {
  fetchListData
};

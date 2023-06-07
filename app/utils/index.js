const axios = require('axios');
// 根据ip获取真实地址信息
const getRealAddress = (ip) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: 'http://www.inte.net/tool/ip/api.ashx',
      params: {
        ip: ip,
        datatype: 'json',
      },
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

module.exports = {
  getRealAddress,
};

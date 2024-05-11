const createAxiosInstance = require('../config/axiosConfig.js');
const axios = createAxiosInstance();
const api = require("./api.js");
let headers = require("./apiData/headers.js"); // 导入headers.apiData
const global = require("./apiData/cookie.js"); // 导入global.apiData
const querystring = require('querystring');

/**
 * 更新个人信息
 * @param info
 * @returns {Promise<void>}
 */
function updateInfo(info) {
    // 将info对象转换为x-www-form-urlencoded格式
    const data = querystring.stringify(info);

    return axios.post(api.updateApi, data, {
        headers: {
                ...headers,
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        })
        .then(response => {
            if (response.data.result_code===401) {
                console.log('未登录！');
            }else if(response.data.result_code===0){
                // console.log('更新成功！');
                // console.log(response.data);
            }
        })
        .catch(error => {
            console.error(error);
        });
}

module.exports = updateInfo;

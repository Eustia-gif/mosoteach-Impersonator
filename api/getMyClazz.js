const createAxiosInstance = require('../config/axiosConfig.js');
const axios = createAxiosInstance();
const api = require('./api.js');
const headers = require("./apiData/headers");
const logToFile = require("../utils/logUtil.js");
/**
 * 获取我的班课
 * @returns {Promise<axios.AxiosResponse<any> | void>}
 */
function getClazz(){
    return axios.post(api.myJoinClazzApi, {},{ headers: headers})
        .then(response => {
            logToFile('获取我的班课成功！')
            return response.data;
        })
        .catch(error => {
            console.error(error);
        });
}
module.exports = getClazz;

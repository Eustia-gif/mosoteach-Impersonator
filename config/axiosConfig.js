// axiosConfig.js
require('dotenv').config();
const axios = require('axios');
const headers=require('../api/apiData/headers.js');
axios.defaults.baseURL = process.env.BASE_URL

/**
 * 创建axios实例
 * @returns {AxiosInstance}
 */
function createAxiosInstance() {
    return axios.create({
        baseURL: process.env.BASE_URL,
        timeout: 10000,
        headers: {
            ...headers,
        }
    });
}
module.exports = createAxiosInstance;

// login.js
const createAxiosInstance = require('../config/axiosConfig.js');
const axios = createAxiosInstance();
const api = require("./api.js");
const global = require("./apiData/cookie.js");
const headers = require("./apiData/headers.js");
const logToFile = require("../utils/logUtil.js");

/**
 * 登录
 * @returns {Promise<string>}
 */
async function login(token) {
        const loginApi = api.loginApi.replace(0, token);
        const r = await axios.post(loginApi);
        // 从响应头中获取cookie数组
        const cookieArray = r.headers['set-cookie'];
        // 将cookie数组转换为字符串
        // 将cookie字符串保存到全局变量中
        global.cookie = cookieArray.join('; ');
        headers['cookie'] = global.cookie;
        if (r.data.result_code === 0) {
            logToFile('登入成功！');
            return global.cookie;
        } else {
            logToFile('登入失败！');
            throw new Error('登入失败！');
        }
}

module.exports = login;

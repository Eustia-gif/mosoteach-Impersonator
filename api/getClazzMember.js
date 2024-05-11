const createAxiosInstance = require('../config/axiosConfig.js');
const axios = createAxiosInstance();const api = require('./api.js');
const headers = require("./apiData/headers");
const logToFile = require("../utils/logUtil.js");
/**
 * 获取班级所有成员的信息
 * @returns {Promise<axios.AxiosResponse<any> | void>}
 */
function getClazzMember(clazz_course_id){
    // 在headers对象中添加Content-Type属性
    const data={
        clazz_course_id:clazz_course_id,
        order_item:'score',
    }
    return axios.post(api.getClazzMemberApi,data,{ headers:
            {
                ...headers,
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
    })
        .then(response => {
            logToFile('获取班级成员信息成功！');
            return response.data;
            // console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });
}
module.exports = getClazzMember;

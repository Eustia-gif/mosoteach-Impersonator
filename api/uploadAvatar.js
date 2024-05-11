const path = require('path');
const axios=require('axios');
const api = require("./api.js");
let headers = require("./apiData/headers.js"); // 导入headers.apiData
const global = require("./apiData/cookie.js"); // 导入global.apiData
const fs = require('fs');
const FormData = require('form-data');
const querystring = require("querystring");
const crypto = require('crypto');
const logToFile = require('../utils/logUtil.js');
/**
 * 先进行签名，然后上传头像
 * @param fileName
 * @returns {Promise<any>}
 */
async function uploadAvatar(fileName) {
    const filePath = path.join(__dirname, '..', 'static', 'img', fileName);
    const baseName = path.basename(fileName);
    let fileNameWithoutExt = baseName.split('.')[0];
    const fakePath = 'C:'+ '\\fakepath\\' + fileNameWithoutExt;
    let form = new FormData();
    // 表单数据
    form.append('category', 'AVATAR');
    form.append('file_name', fakePath);
    form.append('ext_name', 'jpg');
    form.append('user_id',process.env.USER_ID);

    const randomString = crypto.randomBytes(16).toString('hex');
    const boundary = `----WebKitFormBoundary${randomString}`;

    // 获取签名信息
    const signResponse = await axios.post(api.ossSignApi, form, { headers: {
        ...headers,
            'Content-Type': `multipart/form-data; boundary=${boundary}`
        } });

    // 创建新的 FormData 对象用于上传文件
    let uploadForm = new FormData();
    uploadForm.append('key', signResponse.data.oss_object_key);
    uploadForm.append('policy', signResponse.data.policy);
    uploadForm.append('OSSAccessKeyId', signResponse.data.accessid);
    uploadForm.append('success_action_status', '200');
    uploadForm.append('signature', signResponse.data.signature);
    uploadForm.append('callback', signResponse.data.callback);
    uploadForm.append('file', fs.createReadStream(filePath));

    // 上传文件
    const uploadResponse = await axios.post(signResponse.data.host, uploadForm, {
        headers: { ...uploadForm.getHeaders() }
    });
    if (uploadResponse.status === 200) {
        logToFile('Upload success!');
        return signResponse.data;
    } else {
        logToFile('Upload failed!');
        throw new Error('Upload failed!');
    }
}

/**
 * 保存头像信息
 * @param expire
 * @param oss_object_key
 */
function saveAvatarInfo(expire,oss_object_key) {
    axios.post(api.saveAvatarApi, querystring.stringify({url: process.env.BASE_OSS_URL + '/' + oss_object_key+'?x-oss-process=style/s200x200'+`&v=${expire}`}), {headers:
            {
                ...headers,
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'

            }
    })
        .then(res =>{
            // console.log(res.data);
            // console.log('头像上传成功！');
        }).catch(error =>{
        console.error(error);
    })
}
module.exports = {uploadAvatar,saveAvatarInfo};

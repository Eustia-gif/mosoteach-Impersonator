const fs = require('fs');
const axios = require('axios');
const path = require('path');
const logToFile = require('./logUtil.js');

/**
 * 下载图片
 * @param response
 */
function imgDownLoadUtil(response) {
    // 读取list_member.json文件
    // const filePath = path.join(__dirname, response);    const data = fs.readFileSync(filePath, 'utf8');
    // const jsonData = JSON.parse(data);
    response.data.member_data.data.forEach(async (member) => {
        const url = member.original_full_avatar_url;
        const studentNo = member.student_no;

        // 下载图片
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        const buffer = Buffer.from(response.data, 'binary');

        // 保存到本地
        const imgPath = path.join(__dirname, '../static/img/', `${studentNo}.jpg`);
        fs.writeFileSync(imgPath, buffer);
        logToFile(`图片保存完成: ../static/img/${studentNo}.jpg`);
    });
}
module.exports = imgDownLoadUtil;

const fs = require('fs');
const axios = require('axios');
const path = require('path');
const logToFile = require('./logUtil.js');

/**
 * 下载图片
 * @param response
 */
function imgDownLoadUtil(response) {
    response.data.member_data.data.forEach(async (member) => {
        const url = member.original_full_avatar_url;
        const studentNo = member.student_no;

        // 下载图片
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        const buffer = Buffer.from(response.data, 'binary');

        // 确保目录存在
        const dirPath = path.join(__dirname, '../static/img/');
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }

        // 保存到本地
        const imgPath = path.join(dirPath, `${studentNo}.jpg`);
        fs.writeFileSync(imgPath, buffer);
        logToFile(`图片保存完成: ${path.resolve(imgPath)}`);
    });
}
module.exports = imgDownLoadUtil;

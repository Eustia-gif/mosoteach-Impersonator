const path = require('path');
const fs = require('fs');

/**
 * 将日志写入文件
 * @param message
 */
function logToFile(message) {
    console.log(new Date().toISOString()+'-'+message);
    const logFilePath = path.join(__dirname, '../log/logs.txt');
    const formattedMessage = `${new Date().toISOString()} - ${message}\n`;
    fs.appendFileSync(logFilePath, formattedMessage);
}
module.exports = logToFile;

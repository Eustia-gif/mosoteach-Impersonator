const updateInfo = require('./api/updateInfo.js');
const path = require('path');
const logToFile = require('./utils/logUtil.js');
module.paths.unshift(path.resolve(__dirname, '..'));
const { Worker } = require('worker_threads');
async function init(tokens) {
    tokens.forEach((token, index) => {
        const worker = new Worker('./task/worker.js', { workerData: token });
        worker.on('message', () => {
            logToFile(`message from worker ${index + 1}`);
        });
        worker.on('error', () => {
            logToFile(`error in worker ${index + 1}`);
        });
    });
}

const tokens = process.env.PROXY_TOKEN.split(',');
init(tokens).then(() => {
    logToFile("初始化成功");
});

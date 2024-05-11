const updateInfo = require('./api/updateInfo.js');
const path = require('path');
const logToFile = require('./utils/logUtil.js');
module.paths.unshift(path.resolve(__dirname, '..'));
const { Worker } = require('worker_threads');
async function init(tokens) {
    tokens.forEach((token, index) => {
        const worker = new Worker('./task/worker.js', { workerData: token });
        worker.on('message', (message) => {
            logToFile(`Message from worker ${index + 1}: ${message}`);
        });
        worker.on('error', (error) => {
            logToFile(`Error in worker ${index + 1}:`, error);
        });
        worker.on('exit', (code) => {
            if (code !== 0) {
                logToFile(`Worker ${index + 1} stopped with exit code ${code}`);
            }
        });
    });
}

const tokens = process.env.PROXY_TOKEN.split(',');
init(tokens).then(() => {
    logToFile("初始化成功");
});

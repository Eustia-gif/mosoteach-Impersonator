const { parentPort, workerData } = require('worker_threads');
const updateInfo = require('../api/updateInfo.js');
const login = require('../api/login.js');
const {uploadAvatar,saveAvatarInfo} = require('../api/uploadAvatar.js');
const randomSelect = require('../utils/randomSelectUtil.js');
const info=require('../api/apiData/info.js');
const getClazz=require('../api/getMyClazz.js');
const getClazzMember=require('../api/getClazzMember.js');
const path = require('path');
const imgDownLoadUtil = require('../utils/imgDownLoadUtil.js');
const logToFile = require('../utils/logUtil.js');
let globalResponse = null;

async function run(token) {
    const stuInfo= await randomSelect(globalResponse);
    let fullName = stuInfo.full_name;
    let studentNo = stuInfo.student_no;
    // 设置info对象的属性值
    info.full_name=fullName;
    info.student_no=studentNo;
    info.nick_name=fullName;
    logToFile(fullName+" "+studentNo);
    await updateInfo(info);
    // 传入图片的路径
    let avatarInfo= await uploadAvatar(stuInfo.student_no+".jpg");
    await saveAvatarInfo(avatarInfo.expire,avatarInfo.oss_object_key);
}

async function init(token) {
    await login(token);
    // 获取所有的课程
    const clazzResponse = await getClazz();
    let courseId;
    clazzResponse.data.forEach(res => {
        if (res.course.name === process.env.CLAZZ_NAME ) {
            courseId = res.id;
        }
    });
    // response取到的是课程的所有成员信息
    const response = await getClazzMember(courseId);
    globalResponse = response;
    logToFile('当前用户为：'+globalResponse.data.member_data.data[0].student_no);
    await imgDownLoadUtil(response);
    // 设置用户的id
    process.env.USER_ID=response.data.member_data.data[0].account_name;

    let isFirstRun = true;
    setInterval(() => {
        if (isFirstRun) {
            logToFile('定时任务开始执行...');
            isFirstRun = false;
        }
        run(token).catch(error => {
            logToFile('An error occurred:', error);
        });
        // 如果没设置那就10s执行一次
    }, process.env.TIME_INTERVAL || 600000);
}

init(workerData).then(() => {
    parentPort.postMessage('初始化成功');
});

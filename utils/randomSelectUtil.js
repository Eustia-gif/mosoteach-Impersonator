const fs = require('fs');
const path = require('path');
const logToFile = require('./logUtil.js');

/**
 * 随机选择一个学生
 * @param response
 * @returns {*}
 */
function randomSelect(response) {
    const students = response.data.member_data.data;
    // 自己（索引0）和最后8位学生不参与抽取
    const randomIndex = Math.floor(Math.random() * (students.length - 9)) + 1;
    // console.log(students[randomIndex].student_no)
    const excluded = process.env.EXCLUDE_STUDENT_ID.split(',').some(id => {
        if (students[randomIndex].student_no === id) {
            logToFile(id + '-已经被排除')
            return true;
        }
        return false;
    });
    if (excluded) {
        return randomSelect(response);
    }
    return students[randomIndex];
}

module.exports = randomSelect;

/**
 * mosoteach接口
 * @type {string}
 */
// 更新用户信息接口
const updateApi = "/web/index.php?c=user&m=save_profile";
// 登录接口
const loginApi=`/web/index.php?c=passport&m=save_proxy_token&proxy_token=${0}&remember_me=Y`
// 获取OSS签名接口
const ossSignApi = "/web/index.php?c=osssign&m=sign";
// 保存头像接口
const saveAvatarApi = "/web/index.php?c=user&m=set_avatar_url";
// 获取我的课程接口
const myJoinClazzApi = "/web/index.php?c=clazzcourse&m=my_joined";
// 获取我的信息接口，这里使用https://www.mosoteach.cn/web/index.php?c=member&m=get_list_member接口取第一个用户的信息，此接口废弃
// const myInfoApi = "/web/index.php?c=clazzcourse&m=get_role_in_cc";
// 获取我的信息接口
const getClazzMemberApi = "/web/index.php?c=member&m=get_list_member";
// 导出常量
module.exports = {
    updateApi,
    loginApi,
    ossSignApi,
    saveAvatarApi,
    myJoinClazzApi,
    getClazzMemberApi
};

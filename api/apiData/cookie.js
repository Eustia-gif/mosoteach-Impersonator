let globalCookie = '';
module.exports = {
    get cookie() {
        return globalCookie;
    },
    set cookie(value) {
        globalCookie = value;
    }
};

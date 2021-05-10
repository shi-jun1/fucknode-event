$.ajaxPrefilter(function (options) {
    // console.log(options);
    options.url = 'http://localhost:8888' + options.url
    // 为有权限的请求设置请求头
    if (options.url.indexOf('/admin/') !== -1) {
        options.headers = {
            Authorization:localStorage.getItem('token') || ''
        }
    }

    options.complete = function (res) {
        // console.log(res);
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token')
            location.href = './login.html'
        }
    }
})
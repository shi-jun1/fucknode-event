$.ajaxPrefilter(function(options) {
    // console.log(options);
    options.url = 'http://localhost:8888' + options.url
        // 为有权限的请求设置请求头
    if (options.url.indexOf('/admin/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    options.complete = function(res) {
        // console.log(res);
        if (res.responseJSON.status === 401 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token')
            location.href = './login.html'
        }
    }
})


const laypage = layui.laypage
const form = layui.form
const layer = layui.layer
    //定义验证规则
form.verify({
    username: [/^[\S]{1,12}$/, '用户名必须是不超过12位的非空字符串'],
    nickname: [/^[\S]{0,6}$/, '昵称不能超过6个字符'],
    pwd_jiang: [/^[\S]{6,12}$/, '密码必须是6-12位的非空字符串'],
    repwd_jiang: function(value) {
        var pwd = $('.layui-form [name=password').val()
        if (pwd !== value) return '两次密码必须一致'
    },
    // email: ['/^([a-zA-Z\d])(\w|\-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/', '邮箱格式不正确']
})
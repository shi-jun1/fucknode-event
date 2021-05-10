$(function () {
    //点击退出 退出功能实现
    $('#logout-btn').on('click', function () {
        
        localStorage.removeItem('token')
        location.href = './login.html'
    })
})
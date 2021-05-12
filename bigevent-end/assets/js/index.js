$(function() {
    getUser()
        //点击退出 退出功能实现
    $('#logout-btn').on('click', function() {
        layer.confirm('is not?', { icon: 3, title: '提示' }, function(index) {
            //do something
            localStorage.removeItem('token')

            location.href = './login.html'

            layer.close(index);
        });
    })


})


function getUser() {
    const id = localStorage.getItem('user_id')
    $.ajax({
        method: 'get',
        url: '/admin/users/' + id,
        success: function(res) {
            console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败', { icon: 5 })
            }

            render(res.data)
        }

    })
}

// 用户信息渲染
function render(user) {
    var name = user.nickname || user.username
    $('#userName').html(name)

    // var first = name[0].toUpperCase()
    $('.layui-nav-img').attr('src', user.user_pic)



}
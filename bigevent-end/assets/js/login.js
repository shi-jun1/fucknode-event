$(function() {
    /*  自定义表单校验 */
    //   layui.form.verify({
    //     pwd: [
    //         /^[\S]{6,12}$/,
    //         '密码必须是6-12位的非空字符'
    //     ]
    // repwd: function(value, item) {
    //     var val = $('#form_reg [name=password]').val()
    //     if (val !== value) {
    //         return'两次密码必须一致'
    //     }
    // }
    // })
    $('#particles').particleground({
        dotColor: '#7ec7fd',
        lineColor: '#7ec7fd'
    });
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()

        var data = $(this).serialize()

        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: data,
            success: function(res) {
                if (res.status == 1) {
                    return layui.layer.msg(res.message, { icon: 5 })
                }
                layui.layer.msg(res.message, { icon: 6 }, function() {

                    //把token保存到本地,调用其他接口
                    localStorage.setItem('token', res.token)
                    localStorage.setItem('user_id', res.id)
                        //跳转后台首页
                    location.href = './index.html'
                })
            }
        })
    })
})
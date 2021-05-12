$(() => {
    const id = localStorage.getItem('index')
        //渲染列表
    $.ajax({
            method: "get",
            url: '/admin/users/' + id,
            success: (res) => {
                if (res.status !== 0) return layer.msg(res.message, { icon: 5 })
                layui.form.val('editForm', res.data)
            }

        })
        //提交事件
    $('body').on('submit', (e) => {
        e.preventDefault()
        const data = $('.layui-form').serialize()
        $.ajax({
            method: 'put',
            url: '/admin/upuser',
            data: data,
            success: (res) => {
                if (res.status !== 0) return layer.msg(res.message, { icon: 5 })
                layer.msg('修改成功', { icon: 6 }, () => {
                    location.href = './user.js'
                })
            }
        })
    })
})
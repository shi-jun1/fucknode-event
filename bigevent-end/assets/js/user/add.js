$(() => {

    $('body').on('submit', (e) => {
        e.preventDefault()
        const str = $('form').serialize()
        $.ajax({
            method: 'post',
            url: '/admin/users',
            data: str,
            success: (res) => {
                console.log(res);
                if (res.status != 0) return layui.layer.msg(res.message, { icon: 5 })
                layui.layer.msg('用户创建成功', { icon: 6 })

            }
        })
    })
})
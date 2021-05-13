$(() => {
    ajax()

    function ajax() {
        $.ajax({
            method: "get",
            url: '/admin/usersnum',
            success: (res) => {
                if (res.status !== 0) return
                $('.user').html(`共有<span>${res.data}</span>位用户`)
            }
        })

        $.ajax({
            method: "get",
            url: '/admin/articles',
            success: (res) => {
                console.log(res);
                if (res.status !== 0) return
                $('.articles').html(`共有<span>${res.data}</span>篇文章`)
            }
        })
        $.ajax({
            method: "get",
            url: '/admin/comments',
            success: (res) => {
                console.log(res);
                if (res.status !== 0) return
                $('.comments').html(`共有<span>${res.data.length}</span>条评论`)
            }
        })
        $.ajax({
            method: "get",
            url: '/api/links',
            success: (res) => {
                console.log(res);
                if (res.status !== 0) return
                $('.links').html(`共有<span>${res.data.length}</span>个友情链接`)
            }
        })
    }
    $('.layui-col-md3:nth-child(1)').on('click', function() {
        window.parent.$('.users dd a')[0].click()
    })
    $('.layui-col-md3:nth-child(3)').on('click', function() {
        window.parent.$('.lis2').children('a').click()
        window.parent.$('.ziyuan dd a')[2].click()
    })
    $('.layui-col-md3:nth-child(4)').on('click', function() {
        window.parent.$('.lis2').children('a').click()
        window.parent.$('.ziyuan dd a')[0].click()
    })

})
$(() => {

    const data = {
        pagenum: 1,
        pagesize: 5
    }
    userlist()

    function userlist() {
        $.ajax({
            method: 'GET',
            url: '/admin/users',
            data: data,
            success: (res) => {
                if (res.status != 0) {

                    return layer.msg(res.message, { icon: 5 })
                }
                const str = template('tpl', res)
                $('tbody').html(str)
                renderPage(res.total)
            }
        })
    }
    $('tbody').on('click', '#link', (e) => {
        const index = $(e.target).attr('index')
        localStorage.setItem('index', index)

    })

    // 定义渲染分页的方法
    function renderPage(total) {
        // 调用 laypage.render() 方法来渲染分页的结构
        laypage.render({
            elem: 'articlePage', // 分页容器的 Id
            count: total, // 总数据条数
            limit: data.pagesize, // 每页显示几条数据
            curr: data.pagenum, // 设置默认被选中的分页
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            // 分页发生切换的时候，触发 jump 回调
            // 触发 jump 回调的方式有两种：
            // 1. 点击页码的时候，会触发 jump 回调
            // 2. 只要调用了 laypage.render() 方法，就会触发 jump 回调
            jump: function(obj, first) {
                // 可以通过 first 的值，来判断是通过哪种方式，触发的 jump 回调
                // 如果 first 的值为 true，证明是方式2触发的
                // 否则就是方式1触发的
                console.log(first)
                console.log(obj.curr)
                    // 把最新的页码值，赋值到 q 这个查询参数对象中
                data.pagenum = obj.curr
                    // 把最新的条目数，赋值到 q 这个查询参数对象的 pagesize 属性中
                data.pagesize = obj.limit
                    // 根据最新的 q 获取对应的数据列表，并渲染表格
                    // initTable()
                if (!first) {
                    userlist()
                }
            }
        })
    }
    //删除用户功能
    $('tbody').on('click', '.delete', (e) => {
            layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
                const id = $(e.target).attr('index')
                const len = $('.delete').length
                $.ajax({
                    method: 'delete',
                    url: '/admin/users/' + id,
                    success: (res) => {
                        console.log(res);
                        if (res.status !== 0) layer.msg('删除用户失败', { icon: 5 })
                        layer.msg('删除用户成功', { icon: 6 })
                            // 重新渲染列表
                        if (len === 1) {
                            // 如果 len 的值等于1，证明删除完毕之后，页面上就没有任何数据了
                            // 页码值最小必须是 1
                            data.pagenum = data.pagenum === 1 ? 1 : data.pagenum - 1
                            location.reload()
                        }
                        userlist()

                    }

                })

            })

        })
        // 密码修改功能
    $('tbody').on('click', '.resetpwd', (e) => {
        const index = layer.open({
            type: 1,
            area: ['500px', '300px'],
            content: $('#repwd-form-tpl').html() //这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
        });
        const id = $(e.target).attr('index')

        $('#repwd-form').on('submit', (e) => {
            e.preventDefault()
            const password = $('#repwd-form [name=password]').val()
            $.ajax({
                method: 'put',
                url: '/admin/users/' + id,
                data: { password },
                success: (res) => {
                    if (res.status !== 0) return layer.msg(res.message, { icon: 5 })
                    layer.msg('密码修改成功', { icon: 6 }, () => {
                        layer.close(index)
                    })
                }
            })
        })

    })


})
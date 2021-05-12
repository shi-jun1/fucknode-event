$(function() {
    friendList()

    function friendList() {

        $.ajax({
            method: 'get',
            url: '/admin/links',
            success: function(res) {
                var htmlStr = template('tpl-friend', res)
                $('tbody').html(htmlStr)
                console.log(res);
            }
        })
    }
    //添加==============================================================
    var index = null

    $('#add-link').on('click', function() {
        index = layui.layer.open({
            type: 1,
            area: ['500px', '330px'],
            title: '添加友情链接',
            content: $('#add-form-tpl').html()
        })

        $('#urlIcon').on('click', function() {
            $('#linkFile').click()


        })
        $('#linkFile').on('change', function(e) {
            //获取用户选择的文件
            var filelist = e.target.files
            if (filelist.length === 0) {
                return layui.layer.msg('请选择照片！')
            }

            var file = e.target.files[0]
            var imgURL = URL.createObjectURL(file)
            $('#preIcon').attr('src', imgURL)


        })
    })
    $('body').on('submit', '#add-form', function(e) {
            e.preventDefault()

            var fd = new FormData(this)
            $.ajax({
                method: 'post',
                url: '/admin/links',
                data: fd,
                contentType: false,
                processData: false,
                success: function(res) {
                    if (res.status !== 0) {
                        return layui.layer.msg(res.message, { icon: 5 })
                    }


                    layui.layer.msg('添加成功!', { icon: 6 })
                    friendList()
                    layui.layer.close(index)

                }
            })
        })
        //编辑===========================================================
    $('body').on('click', '#bianJi', function() {
            index = layui.layer.open({
                type: 1,
                area: ['500px', '330px'],
                title: '编辑友情链接',
                content: $('#edit-form-tpl').html()
            })

            var id = $(this).attr('data_id')

            $.ajax({
                method: 'get',
                url: '/admin/links/ ' + id,
                success: function(res) {
                    // console.log(res);
                    layui.form.val('editForm', res.data)
                }

            })

            var date;
            $('#urlIcon').on('click', function() {
                $('#linkFile').click()
                $('#linkFile').on('change', function(e) {
                    //获取用户选择的文件
                    var filelist = e.target.files
                    if (filelist.length === 0) {
                        return layui.layer.msg('请选择照片！')
                    }
                    date = filelist[0]
                    var file = e.target.files[0]
                    var imgURL = URL.createObjectURL(file)
                    $('#preIcon').attr('src', imgURL)

                })

            })

            $('body').on('submit', '#edit-form', function(e) {
                e.preventDefault()

                var fd = new FormData(this)
                fd.append('linkicon', date)
                    // fd.forEach((v, i) => {
                    //     console.log(i, v);
                    // })
                $.ajax({
                    method: 'put',
                    url: '/admin/links/' + id,
                    data: fd,
                    contentType: false,
                    processData: false,
                    success: function(res) {

                        if (res.status !== 0) {
                            return layui.layer.msg(res.message, { icon: 5 })
                        }


                        layui.layer.msg(res.message, { icon: 6 })
                        friendList()
                        layui.layer.close(index)

                    }
                })
            })
        })
        //删除==============================================================

    $('body').on('click', '#shanChu', function() {
        var id = $(this).attr('delete_id')
        layer.confirm('确定删除', { icon: 3, title: '提示' }, function(indexA) {
            $.ajax({
                method: 'delete',
                url: '/admin/links/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layui.layui.msg(res.message, { icon: 5 })
                    }
                    layui.layer.msg(res.message, { icon: 6 })
                    layui.layer.close(index);
                    friendList()
                }
            })


        });
    })


})
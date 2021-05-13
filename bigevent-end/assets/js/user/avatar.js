$(function() {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image
        // 1.2 配置选项
    var options
    const user_id = localStorage.getItem('user_id')
    getAvatar()

    function getAvatar() {
        $.ajax({
            method: 'get',
            url: '/admin/users/' + user_id,
            success: (res) => {
                if (res.data.user_pic) {
                    const avatar = res.data.user_pic
                    $('#image').attr('src', avatar)
                }

                $image = $('#image')
                    // 1.2 配置选项
                options = {
                    // 纵横比
                    aspectRatio: 1,
                    // 指定预览区域
                    preview: '.img-preview'
                }

                // 1.3 创建裁剪区域
                $image.cropper(options)
            }
        })

    }
    // 为上传按钮绑定点击事件
    $('#btnChooseImage').on('click', function() {
        $('#file').click()
    })

    // 为文件选择框绑定 change 事件
    $('#file').on('change', function(e) {
        // 获取用户选择的文件
        var filelist = e.target.files
        if (filelist.length === 0) {
            return layer.msg('请选择照片！')
        }

        // 1. 拿到用户选择的文件
        var file = e.target.files[0]
            // 2. 将文件，转化为路径
        var imgURL = URL.createObjectURL(file)
            // 3. 重新初始化裁剪区域
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    // 为确定按钮，绑定点击事件
    $('#btnUpload').on('click', function() {
        // 1. 要拿到用户裁剪之后的头像
        var dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
            // 2. 调用接口，把头像上传到服务器
            // console.log(dataURL);
        $.ajax({
            method: 'POST',
            url: '/admin/avatar',
            data: {
                avatar: dataURL
            },
            success: function(res) {
                if (res.status !== 0) {
                    console.log(res);
                    return layer.msg('更换头像失败！')
                }
                layer.msg('更换头像成功', { icon: 6 }, () => {
                    window.parent.getUser()
                    location.reload()
                })

            }
        })
    })


    //获取历史头像按钮绑定事件
    $('#history').on('click', () => {
            $.ajax({
                method: 'get',
                url: '/admin/avatar/' + localStorage.getItem('user_id'),
                success: (res) => {
                    // console.log(res);
                    if (res.status != 0) {
                        layer.msg('历史头像获取失败', { icon: 5 })
                        return $('#imglist').empty()
                    }
                    res.data = res.data.reverse()
                    const htmlStr = template('tpl', res)
                    $('#imglist').html(htmlStr)
                }
            })

        })
        //历史头像点击事件
    $('#imglist').on('click', 'img', (e) => {
        $(e.target).addClass('border').siblings('img').removeClass('border')
        const url = $(e.target).attr('src')
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', url) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })
    $('#imglist').on('dblclick', 'img', (e) => {
        const index = layer.confirm('确定删除这个头像吗?', { icon: 3 }, () => {
            const id = $(e.target).attr('index')
            const user_id = localStorage.getItem('user_id')
            $.ajax({
                method: 'delete',
                url: '/admin/avatar',
                data: {
                    id,
                    user_id
                },
                success: (res) => {
                    if (res.status != 0) return layer.msg(res.message, { icon: 5 })
                    layer.msg(res.message, { icon: 6 })
                    $('#history').click()
                }
            })
            layer.close(index)
        })
    })

})
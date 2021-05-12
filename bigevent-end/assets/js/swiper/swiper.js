// 轮播图后台功能

$(function() {

    // alert(1)

    // 1 --->  从数据库获取数据 渲染到页面
    xuanRan()

    addPic()

    // 获取数据,发送ajax请求
    function xuanRan() {
        $.ajax({
            method: 'GET',
            url: '/admin/swipers',
            success: (res, req) => {
                if (res.status !== 0) return layui.layer.msg(res.message, { icon: 5 })

                // console.log(res);




                // 渲染到页面

                var htmlStr = template('swiper_tpl', res)
                    // console.log(htmlStr);

                $('tbody').html(htmlStr)

                // layui.form.render()



                // console.log(img);

                // 新增--5 点击放大图片

                $('tbody').on('click', '#img-big', function() {


                    var index = $(this).parent().parent().index()

                    // console.log(index);
                    var img = `<img src="http://localhost:8888/uploads/${res.data[index].swiperimg} " style="width: 100%;"> `



                    // console.log($('body .layui-layer-content'));

                    // console.log(img);


                    // 弹出层
                    layui.layer.open({
                        title: '图片预览',
                        content: img,
                        area: ['800px', '500px']
                    });

                })
            }

        })
    }


    // 2 ---> 上传图片功能
    function addPic() {


        // 点击上传按钮触发上传按钮事件
        $('#uploadSwiper').on('click', function() {
            // console.log(1);
            $('#myfile').click()
        })


        // 选择文件框change事件
        $('#myfile').on('change', function(e) {

            // 判断是否上传了文件
            // 获取文件列表
            var fileList = e.target.files
                // console.log(fileList);
            if (fileList.length <= 0) return layui.layer.msg('请上传文件', { icon: 5 })


            // 准备数据------------------------
            /* // # 上传1个文件的用法：
            var fd = new FormData();
            fd.append('cover_img', fileList)
            console.log(fd); */

            // # 上传多个文件的用法：
            var fd = new FormData();
            for (var i = 0; i < fileList.length; i++) {
                fd.append('swipers', fileList[i])
            }

            // console.log(fd);
            // formdata对象可以使用同一个名称添加多个值。swipers的值最终就是一个数组。
            // 发送ajax请求
            $.ajax({
                method: 'post',
                url: '/admin/swipers',
                data: fd,
                // 文件上传必须的两个属性
                // 不使用默认的 content-Type
                contentType: false,
                //不需要把data 中的数据转成查询字符串
                processData: false,
                success: (res, req) => {
                    if (res.status !== 0) return layui.layer.msg(res.message, { icon: 5 })
                    console.log(res);

                    xuanRan()
                }
            })

        })

    }

    // 3 ---> 删除功能

    $('tbody').on('click', '.delete', function() {
        // console.log($(this));
        // 获取id，
        var id = $(this).attr('data-id')
            // console.log(id);

        // 先弹出确认框
        layer.confirm('确定删除?', { icon: 3, title: '提示' }, function(index) {

            // 确认删除在发送删除ajax接口请求

            // 发送ajax请求
            $.ajax({
                method: 'DELETE',
                url: '/admin/swipers/' + id,
                success: function(res, req) {
                    if (res.status !== 0) return layui.layer.msg(res.message, { icon: 5 })
                        // console.log(res);

                    xuanRan()

                    // console.log(res);
                }

            })

            //do something

            layer.close(index);


        });


    })



    // 4 ---> 点击按钮更改轮播图状态功能 √ 对号 显示到页面， × 不显示到页面

    $('tbody').on('click', '.layui-badge', function() {


        // 获取状态属性 1 为启用，2为禁用
        var id = $(this).attr('data-id')
            // console.log(id);

        var status = $(this).attr('data-status')
            // console.log(status);

        // 判读如果status = 1，则切换为2，如果status = 2 ，则切换为1
        if (status == 1) {
            status = 2
        } else {
            status = 1
        }
        console.log(status);


        // 先弹出确认框
        layer.confirm('确定更改状态?', { icon: 3, title: '提示' }, function(index) {

            // 发送ajax 切换轮播图状态
            $.ajax({
                method: 'put',
                url: '/admin/swipers/' + id,
                data: {
                    status: status
                },
                success: function(res, req) {
                    if (res.status !== 0) return layui.layer.msg(res.message, { icon: 5 })
                    console.log(res);
                    xuanRan()
                    return layui.layer.msg(res.message, { icon: 6 })
                }
            })

            layer.close(index);
        })







    })


    // 5-- 新增 ，编辑功能  ------------------>>>>>
    $('tbody').on('click', '.update', function() {
        console.log(1);
        // 获取 id
        var id = $(this).attr('data-id')
        console.log(id);

        // 弹出层
        layui.layer.open({
            title: '图片预览',
            content: '111',
            area: ['500px', '300px']
        });


    })







})
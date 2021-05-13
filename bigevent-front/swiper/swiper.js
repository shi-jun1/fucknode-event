$(function() {

    // 获取轮播图 -渲染到页面
    $.ajax({
        method: 'GET',
        url: 'http://localhost:8888/api/swipers',
        success: function(res, req) {
            if (res.status !== 0) return layui.layer.msg(res.message, { icon: 5 })
            console.log(res);

            var htmlStr = template('demo', res)
                // console.log(htmlStr);

            $('#test1').html(htmlStr)

            // layui 轮播图插件配置
            layui.use('carousel', function() {
                var carousel = layui.carousel;
                //建造实例
                carousel.render({
                    elem: '#kr_carousel',
                    width: '100%' //设置容器宽度
                        ,
                    arrow: 'always', //始终显示箭头
                    //,anim: 'updown' //切换动画方式
                    interval: 2000

                });


            });

        }
    })


})
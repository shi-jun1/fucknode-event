$(function () {
    //alert('ok');
    getlist()
    function getlist() {
    
        $.ajax({
            method: 'GET',
            url: '/admin/comments',
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, { icon: 5 })
                
                }
                //4.数据在上面添加啊
                var data = res.data.reverse()
                console.log(data);


                var htmlStr = template('pinglun-tpl2', res)
                console.log(res);
                //5.
                $('#mybody').html(htmlStr)
            }
    
        })
    }
    

    
    // 定义过滤器函数
    //   template.defaults.imports.shui = function(value) {
    //     console.log(value)
    //     return value * 0.9;
    // }
    template.defaults.imports.dateFormat = function (aaa) {
        // console.log(typeof date) // 日期时间对象
        var date = new Date(aaa)
        var y = date.getFullYear()
        var m = date.getMonth() + 1
        m = padZero(m)
        var d = date.getDate()
        d = padZero(d)

        var hh = date.getHours()
        hh = padZero(hh)
        var mm = date.getMinutes()
        mm = padZero(mm)
        var ss = date.getSeconds()
        ss = padZero(ss)

        return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
    }

    function padZero(n) {
        // if (n < 10) {
        //     return '0' + n;
        // } else {
        //     return n;
        // }
        return n < 10 ? '0' + n : n;
    }
    

 


        // $("#mybody").on('click', '#shanchu', function () {
        //     layui.layer.confirm('您确定要删除此文章吗?', { icon: 3, title: '提示' }, function () {

           
        //         $.ajax({
        //             method: 'DELETE',
        //             url: '/admin/comments/1',
        //             success: function (res) {
        //               console.log(res);
        
                  
        //             }
            
        //            })
            
        //     })
        // })
    
    
    
        /**** 5-删除文章 ****/
    // 注册click事件（事件委托）
    $('#mybody').on('click', '#shanchu', function() {
        // 获取当前页上“删除”按钮的数量
        var num = $('#shanchu').length;
        // console.log('kk')
        // 获取被删除文章的id
        var id = $(this).attr('data-id')
        // console.log(id);
        // console.log(id)
        // 询问
        layui.layer.confirm('您确定要删除此文章吗?', { icon: 3, title: '提示' }, function(index) {
            //do something
            // 调接口，删除文章
            $.ajax({
                method: 'DELETE',
                url: '/admin/comments/'+ id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layui.layer.msg(res.message, { icon: 5 })
                    }
                    layui.layer.msg(res.message, { icon: 6 }, function() {
                        // 判断当前删除的文章是当前页的最后一条
                        // if (num === 1) {
                        //     // q.pagenum--;
                        //     // 判断当前页是不是第1页
                        //     q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                        // }

                        // 重新渲染数据
                        //initTable()
                        getlist()
                        layer.close(index);
                    })
                }
            })
        });

    })




    // ------------------------------------------------------------------------------------------------------------------
    //删除定时器
    // var id = 77
    // setInterval(function () {
       
        
    //     $.ajax({
    //         method: 'DELETE',
    //         url: '/admin/comments/'+ id,
    //         success: function (res) {
               
    //             console.log(id);
    //             if (res.status !== 0) {
    //                 return layui.layer.msg(res.message, { icon: 5 })
    //             }
    //             layui.layer.msg(res.message, { icon: 6 })
    //             getlist()
    //            id++
    //             // layui.layer.msg(res.message, { icon: 6 }, function() {
    //             //     // 判断当前删除的文章是当前页的最后一条
    //             //     // if (num === 1) {
    //             //     //     // q.pagenum--;
    //             //     //     // 判断当前页是不是第1页
    //             //     //     q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
    //             //     // }
    
    //             //     重新渲染数据
    //             //     //initTable()
    //             //     getlist()
    //             //     layer.close(index);
    //             // })
    //         }
           
    
    //     })
        
        // 
    // }, 500)
    



})


 

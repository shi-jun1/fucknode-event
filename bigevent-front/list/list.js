  //分页
$(function () {
     
    // layui.laypage.render({
    //     elem: 'pageBox',
    //     limit: q.pagesize,
    //     limits:[2,4,6,8],
    //     count: total,
    //     curr: q.pagenum,
    //     layout:['count','limit','prev', 'page', 'next','skip','refresh'],
    //     jump: function (obj, first) {
    //         // q.pagenum = obj.curr
    //         console.log(obj);
    //         if (first === true) {
    //             return
    //         }
    //         q.pagesize = obj.limit
    //         q.pagenum = obj.curr
    //         getArtList()

    //     }

    // })
    getArtList()
    //获取文章列表
    function getArtList() {
        $.ajax({
            method: 'GET',
            url: '/api/articles',
            data: {
                pagenum: 1,
                pagesize: 3
            },
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg(res.message,{icon:5})
                }
                var hstr = template('atl', res)
                
                $('.item').html(hstr)
                var num = res.data.length
                var total = res.total
                console.log(num);
                console.log(total);
                //调用加载更多获取文章的函数，传入参数
                getArtListMore(num, total)
             
                
            }
    })
    }
    //获取更多文章
    function getArtListMore(num,total) {
        $('#more').on('click', function () {
      
            $('#less').html('<a href="javascript:;"">你敢不敢点我？</a>')
          

            if (num >= total) {
                return $('#more').html('<a href="javascript:;" style="width:250px">我江澎涛也系有底线哒~</a>')
               
            }
            num += 3
            $.ajax({
                method: 'GET',
                url: '/api/articles',
                data: {
                    pagenum: 1,
                    pagesize: num
                },
                success: function (res) {
                    console.log(res);
                    if (res.status !== 0) {
                        return layui.layer.msg(res.message,{icon:5})
                    }
                    var hstr = template('atl', res)
                    
                    $('.item').html(hstr)
                    // var num = res.data.length
                    // console.log(num);
                    // getArtListMore(num)
                }
        })
        })
        $('#less').on('click', function () {
           
          
           
            if (num == 3) {
                return $('#less').html('<a href="javascript:;" style="width:250px">我刘利彬不准你再减下去了，懂？</a>')
            } else {
                num = num - 3
                $.ajax({
                    method: 'GET',
                    url: '/api/articles',
                    data: {
                        pagenum: 1,
                        pagesize: num
                    },
                    success: function (res) {
                        console.log(res);
                        if (res.status !== 0) {
                            return layui.layer.msg(res.message,{icon:5})
                        }
                        var hstr = template('atl', res)
                        
                        $('.item').html(hstr)
                        // var num = res.data.length
                        // console.log(num);
                        // getArtListMore(num)
                        $('#more').html('<a href="javascript:;"">加载更多...</a>')
                    }
            })
            }
          
            
         
        })
      
    }
    //减少加载文章

 
   
 
    

})
   
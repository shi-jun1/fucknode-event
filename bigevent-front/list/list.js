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
                getArtListMore(num,total)
            }
    })
    }
    function getArtListMore(num,total) {
        $('.kr_more').on('click', function () {
            num += 3
            if (num >= total) {
                return $('.kr_more').html('<a href="javascript:;">江澎涛小贴士:没有更多了呦</a>')
            }
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
                    var num = res.data.length
                    console.log(num);
                    getArtListMore(num)
                }
        })
        })
}
 
   
 
    

})
   
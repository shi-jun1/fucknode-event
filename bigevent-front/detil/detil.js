$(function () {


    initArtCateList()
    // 获取文章分类的列表(下拉列表)
    function initArtCateList() {
      $.ajax({
        
        method: 'GET',
        url: 'http://localhost:8888/api/articles/1/comments',
        success: function (res) {
          // console.log(res);
            if (res.status !== 0) {      
                return layui.layer.msg(res.message, {icon: 5})
            
          }
          // console.log(res);

          //4.数据在上面添加啊
          var data = res.data.reverse()
          console.log(data);
            //4.
            var htmlStr = template('pinglun-tpl', res)
            //5.
            $('#myaaa').html(htmlStr)
          
        }

       })
    }



    //发表评论
    $("#comment-form").on('submit', function (e) {
        e.preventDefault();
        var data = $(this).serialize();
      console.log(data)

      //两个输入的内容不能有一个为空
      console.log($('#shuruname').val());
      if ($('#shuruname').val().trim() == '' || $('#shurucontent').val().trim() == '') {
        return layui.layer.msg('用户名和内容不能为空',{icon:5})
      }
//内容不能大于50
      if ($('#shurucontent').val().trim().length >= 50) return layui.layer.msg('内容不能大于50', { icon: 5 });

      //过滤敏感词
      if ($('#shuruname').val().trim() == '激情' || $('#shurucontent').val().trim() == '激情' ) {
        return layui.layer.msg('不能有敏感词', {icon:5});
      }
     

      
      
        //发表评论
      $.ajax({
        method: 'POST',
          url: 'http://localhost:8888/api/articles/1/comments ',
        data:data,
        success: function (res) {
          // console.log(res);

          
          if (res.status !== 0) {      
            return layui.layer.msg(res.message, {icon: 5})
            
          }
          //清空输入内容
      $('#shuruname').val('');
      $('#shurucontent').val('');

      initArtCateList()
        }
      })
      
     

    })

    
      // 定义过滤器函数
    //   template.defaults.imports.shui = function(value) {
    //     console.log(value)
    //     return value * 0.9;
    // }
    template.defaults.imports.dateFormat = function(aaa) {
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
    

  
  
  $('#myaaa').on('click', '.dianzan', function () {
    // console.log(111);
    var num = $(this).html()
    console.log(num);
    num++
    console.log(num);
    $(this).html(num).css({
      'color': '#4285f4',
      'fontWeight': 600,
      'fontSize':'15px'
    })
    // $(this)
   


  })
 
    

 
    
})
$(function() {
    // 菜单展开/折叠交互
    $('.menus .triangle').click(function() {
        $(this).parents('li').toggleClass('collapsed');
    })

    fn()

    function fn() {
        $.ajax({
            method: 'get',
            url: '/api/links',
            success: function(res) {
                // console.log(res);
                var htmlStr = template('tpl-common', res)
                $('.kr_collaborator').html(htmlStr)
            }
        })

    }
})

  //页面乱窜效果
//  console.log( $('.menus>li'));
  $('.menus>li').on('click', function () {
    $(this).siblings().children('a').removeClass('active')
    $(this).children('a').addClass('active')
  })
  
  $('#quickNews').on('click', function () {
    $('')
  })
})




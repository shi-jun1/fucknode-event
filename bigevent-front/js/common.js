
$(function () {
  // 菜单展开/折叠交互
  $('.menus .triangle').click(function () {
    $(this).parents('li').toggleClass('collapsed');
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




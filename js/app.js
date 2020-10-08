$(function () {



  // SPメニュー
  $('.js-toggle-sp-menu').on('click', function () {
    $(this).toggleClass('active');
    $('.js-toggle-sp-menu-target').toggleClass('active');
    $('.mask').toggleClass('active');
  });
    // SPメニュー
    $('.menu-link').on('click', function () {
      $('.js-toggle-sp-menu-target').toggleClass('active');
      //nav-menuにつけてあげる
    });


    
});
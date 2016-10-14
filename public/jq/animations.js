$(document).ready(function() {
  $(window).scroll(function() {
    if( $(document).scrollTop() > 100) {
      $(".title-nav").addClass("moved-title");
      $(".link-nav").addClass("moved-link");
      $("nav ul li").addClass("moved-links");
      $(".title").addClass("moved-title-2");
    }
    else{
      $(".title-nav").removeClass("moved-title");
      $(".link-nav").removeClass("moved-link");
      $("nav ul li").removeClass("moved-links");
      $(".title").removeClass("moved-title-2");
    }
  })







});

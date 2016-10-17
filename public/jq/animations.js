$(document).ready(function() {
  $(window).scroll(function() {
    if( $(document).scrollTop() > 600) {
      $("header").addClass("moved-header");
      $("nav div").attr("id", "moved-links");
      $(".title").attr('id', "moved-title");
    }
    else{
      $(".header").removeClass("moved-header");
      $("nav div").removeAttr("id","moved-links");
      $(".title").removeAttr('id', "moved-title");
    }
  })

});

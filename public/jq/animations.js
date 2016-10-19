$(document).ready(function() {
  $('select').material_select();

  $(window).scroll(function() {
    if( $(document).scrollTop() > 600) {
      $("header").addClass("moved-header");
      $(".navi div").attr("id", "moved-links");
      $(".title").attr('id', "moved-title");
    }
    else{
      $(".header").removeClass("moved-header");
      $(".navi div").removeAttr("id","moved-links");
      $(".title").removeAttr('id', "moved-title");
    }
  })

});

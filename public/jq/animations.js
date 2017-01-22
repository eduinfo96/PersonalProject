$(document).ready(function() {
  $('select').material_select();
  $('.modal-trigger').leanModal();


  $(window).scroll(function() {
    if( $(document).scrollTop() > 620) {
      $("header").addClass("moved-header");
      $(".navi div a").attr("id", "moved-links");
      $(".title").attr('id', "moved-title");
    }
    else{
      $(".header").removeClass("moved-header");
      $(".navi div a").removeAttr("id","moved-links");
      $(".title").removeAttr('id', "moved-title");
    }
  })

  // $( "div.poster" ).hover( function(){
  //   $( this ).addClass( ".movie-data" );
  // }, function(){
  //   $( this ).removeClass( ".movie-data" );
  // })

});

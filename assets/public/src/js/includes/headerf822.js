$(function() {
 
  // scroll for header
  // var WindowHeight = $(window).height();
  // var scroll_header = function (header) {
  //   $(window).scroll(function() {
  //       var scroll = $(window).scrollTop();
  //       if (scroll >= 100) {
  //           $("body").addClass("scrollHeader");
  //           $("#"+header+"").removeClass("navigation-transparant").addClass("header-primary");
  //       } else {
  //           $("body").removeClass("scrollHeader");
  //           $("#"+header+"").removeClass("header-primary").addClass("navigation-transparant");

  //       }

  //       if (scroll >= WindowHeight) {
  //           $("body").addClass("");
  //       }else{
  //          $("body").removeClass("");
  //       }
  //   });
  // };

  // var header_primary = scroll_header("header-scroll");

  var hamburger_menu = function(btn_hamburger){
    $("body").on("click","#"+btn_hamburger+"",function(){
        $("body").toggleClass("no-scroll");
        $("body").toggleClass("scrollHeader open-menu");
    });
  };

  var open_menu = hamburger_menu("btnHamburger");


});

(function( $ ) {
  $.fn.login = function() {
    $("#register-form, #signup-user, #signup-mitra a").detach();
    $("#banner-home").css("width","100%");
    $("#banner-home .cover-messages").addClass("container").removeClass("control-container");
  };
}( jQuery ));

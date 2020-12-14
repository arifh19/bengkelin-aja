$(function() {

  function body_scroll(set_scroll){
    if(set_scroll == true){
      $("body").addClass("no-scroll");
    }else{
      $("body").removeClass("no-scroll");
    }
  }
  function body_popup(set_popup){
    if(set_popup == true){
      $("body").addClass("popup-sign");
    }else{
      $("body").removeClass("popup-sign");
    }
  }

  function PopupSign (){





    var defaults = {
      callAction: '',
      actionLinks: '',
      actionButton: true,
      closeButton: '',
      closeButtonForgot: '',
      actionOverlay: true,
      closeOverlay: '',
      showPopup: '',
    };

   // Create options by extending defaults with the passed in arugments
   if (arguments[0] && typeof arguments[0] === "object") {
     this.options = extendDefaults(defaults, arguments[0]);
   }

   // create function to check object
   function extendDefaults(source, properties) {
     var property;
    //  console.log(properties);
      for (property in properties) {
        props = property;
        if (properties.hasOwnProperty(property)) {
          source[property] = properties[property];
        }
      }
      return source;
   }


   var overlay = '<div id="overlay"></div>';

   if(this.options.actionButton === true){
     this.eleOpen = document.getElementById(this.options.callAction);
     if(!(this.eleOpen === null)){
       this.callAction = this.eleOpen;
       this.callActionForgot = this.eleOpen;
     }
   }
   if(this.options.actionButton === true){
     this.eleOpenSplits = document.getElementById(this.options.actionLinks);
     if(!(this.eleOpenSplits === null)){
       this.actionLinks = this.eleOpenSplits;
     }
   }
   if(this.options.actionButton === true){
     this.eleClose = document.getElementById(this.options.closeButton);
     if(!(this.eleClose === null) && !(this.options.closeButton === null)){
       this.closeButton = this.eleClose;
       this.closeButtonForgot = this.eleClose;
     }
   }
   if(this.options.actionOverlay === true){
     this.eleCloseOverlay = document.getElementById(this.options.closeOverlay);
     if(!(this.eleCloseOverlay === null)){
       this.closeOverlay = this.eleCloseOverlay;
     }
   }



  if(this.callAction){
    this.callAction.addEventListener('click', this.open.bind(this), false );
  }
  if(this.callActionForgot){
    this.callActionForgot.addEventListener('click', this.openForgot.bind(this), false );
  }
  if(this.actionLinks){
    this.actionLinks.addEventListener('click', this.openSplits.bind(this), false );
  }
  if(this.closeButton){
    this.closeButton.addEventListener('click', this.close.bind(this), false);
  }
  if(this.closeButtonForgot){
    this.closeButtonForgot.addEventListener('click', this.closeForgot.bind(this), false);
  }
  if(this.closeOverlay){
    // this.closeOverlay.addEventListener('click', this.close.bind(this), false);
  }


  $(document).on('click', '#'+this.options.closeOverlay+'', this.close.bind(this));

  }

  PopupSign.prototype.open = function(){

    $("body").append("<div id='overlay'></div>");

    // body_scroll(true);
    body_popup(true);
    $("body").addClass("popup-sign");
    $(".sign-box").removeClass("open").addClass("none");
    $("#"+this.options.showPopup+"").removeClass("none").addClass("open");
  }

  PopupSign.prototype.openForgot = function(){
    // body_scroll(true);
    body_popup(true);
    $(".box-forgot-password").removeClass("open").addClass("none");
    $("#"+this.options.showPopup+"").removeClass("none").addClass("open");
  }
  PopupSign.prototype.openSplits = function(){

    /* This one for show and hide form signup/signin */
    $(".sign-box").removeClass("open").addClass("none");
    $("#"+this.options.showPopup+"").removeClass("none").addClass("open");

    if (window.matchMedia('(max-width: 991px)').matches) {
      $(".sign-box").removeClass("open");
      $("#"+this.options.showPopup+"").addClass("open");
    }
    $("header.not-home .sign-box").removeClass("open");
    $("header.not-home #"+this.options.showPopup+"").addClass("open");
  }

  PopupSign.prototype.close = function(){
    $("body").removeClass("no-scroll");
    $("body").removeClass("open-menu");
    body_scroll(false);
    body_popup(false);
    $(".sign-box").addClass("none");
    $("#"+this.options.showPopup+"").removeClass("none");
    $("#"+this.options.showPopup+"").removeClass("open");
    $("#overlay").detach();
  }
  PopupSign.prototype.closeForgot = function(){
    $("body").removeClass("no-scroll");
    $("body").removeClass("open-menu");
    body_scroll(false);
    body_popup(false);
    $(".box-forgot-password").removeClass("open").addClass("none");
    // $("#"+this.options.showPopup+"").removeClass("none").addClass("open");
  }



  var headerSignIn = new PopupSign({
    callAction: 'btnPopup-signIn',
    closeButton: 'close-sign-in-box',
    showPopup: 'sign-in-box',
    closeOverlay: 'overlay',
  });
  var headerSignUpUser = new PopupSign({
    callAction: 'btnPopup-signUp',
    closeButton: 'close-sign-up-box',
    showPopup: 'sign-up-box',
    closeOverlay: 'overlay',
  });
  var headerSignUpMitra = new PopupSign({
    callAction: 'btnPopup-signUp-mitra',
    showPopup: 'sign-up-box-mitra',
    closeButton: 'close-sign-up-box-mitra',
    closeOverlay: 'overlay',
  });
  var sectionSignUpMitra = new PopupSign({
    callAction: 'join-go-mekanik',
    showPopup: 'sign-up-box-mitra',
    closeButton: 'close-sign-up-box-mitra',
    closeOverlay: 'overlay',
  });
  var linkSignIn = new PopupSign({
    actionLinks: 'btnSignIn',
    showPopup: 'sign-in-box',
    closeButton: 'close-sign-up-box-mitra',
    closeOverlay: 'overlay',
  });
  var linkSignInMitra = new PopupSign({
    actionLinks: 'btnSignIn-Mitra',
    showPopup: 'sign-in-box',
    closeButton: 'close-sign-up-box-mitra',
    closeOverlay: 'overlay',
  });
  var linkSignUp = new PopupSign({
    actionLinks: 'btnSignUp',
    showPopup: 'sign-up-box',
    closeButton: 'close-sign-up-box',
    closeOverlay: 'overlay',
  });
  var linkSignUpMitra = new PopupSign({
    actionLinks: 'btnSignUp-mitra',
    showPopup: 'sign-up-box-mitra',
    closeButton: 'close-sign-up-box-mitra',
    closeOverlay: 'overlay',
  });
  var popupForgot = new PopupSign({
    callAction: 'btnForgot',
    showPopup: 'forgotPass, #sign-up-box',
    closeButton: '',
    closeButtonForgot: 'close-forgot-password',
    closeOverlay: 'overlay',
  });

});



// this one for remove popup-sign

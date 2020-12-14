var _token = $("input[name='_token']").val();

$(function() {
    $('#close-forgot-password').click(function(){
      $('#forgotPass').removeClass('open')
      $('#overlay').remove()
      $('body').removeClass('popup-sign')
    });

    $("#btnSimpanLokasi").click(function(){
      $("input[type='hidden'][name='lat']").val(sLat);
      $("input[type='hidden'][name='lng']").val(sLng);
      $("input[type='hidden'][name='provinsi']").val(sProvinsi);
      $("input[type='hidden'][name='kota']").val(sKota);
      $("input[type='hidden'][name='alamat']").val(sAlamat);
      $("#lokasiBengkelResmi").text(sAlamat);

      $("#boxesMap").removeClass('active');
    });

    var setScroll = function(id){
      var full_width = $("#"+id+"").outerWidth();
      var center_card = full_width / 3;
      $("#"+id+"").scrollLeft(center_card);
    };

    // var scrollLeft = setScroll("scrollLeft");

    function side_menu_for_content(){

      this.click_menu = function(btn_menu){
        $("body").on("click","#"+btn_menu+" .list-article-menu",function(){
          var self = $(this);
          var get_data_id = self.attr("data-id");
          $("#"+btn_menu+" .list-article-menu").removeClass("active");
          self.addClass("active");
          $("#article .box-content").removeClass("active");
          $("#article-"+get_data_id+"").addClass("active");
        });
      };
    }

    var show_content = new side_menu_for_content();
    show_content.click_menu("list-article");
    //Signup
    $("#frm_signup").on("submit", function(e){
        e.preventDefault();
        register();
    });
    //Signup Bengkel
    $("#frm_signup_bengkel").on("submit", function(e){
        e.preventDefault();
        var formData = new FormData(this);
        register2(formData);
    });
    //Login
    // $("#frm_login").on("submit", function(e){
    //     e.preventDefault();
    //     ajax_login();
    // });
    // Forgot password
    $("#btn-reset-pass").on("click", forgot_password);
    // Reset Password
    $("#frm_forgot_password").on("submit", function(e){
      e.preventDefault();
      reset_password();
    });
});

function register(){
  var agree = $("#signup_agree").is(':checked');

  if(!agree){
    alertify.notify('Anda harus menyetujui ketentuan Bengkelin-Aja terlebih dahulu','error');
    return false;
  }

  var loader = new Loader();

  var formData = $("#frm_signup").serialize();

  $.ajax({
    url : siteurl+"users/register",
    type : "post",
    dataType : "json",
    data : formData+"&signup=1",
    beforeSend(){
      loader.blur();
      $("#frm_signup #signup").prop("disabled", true);
      // $("#frm_signup .login-loading").addClass("show");
    },
    complete(){
      loader.delete();
      $("#frm_signup #signup").prop("disabled", false);
      // $("#frm_signup .login-loading").removeClass("show");
    },
    success : function(msg){
      if(msg['type'] == 'success'){
        alertify.notify(msg['msg'],'success');
        $("#frm_signup")[0].reset();
      }
      else
      {
        alertify.notify(msg['msg'],'error');
      }
    }
  });
}

function register2(formData){
  var agree = $("#signup_agree_bengkel").is(':checked');

  if(!agree){
    alertify.notify('Anda harus menyetujui ketentuan Bengkelin-Aja terlebih dahulu','error');
    return false;
  }

  var loader = new Loader();

  // var formData = $("#frm_signup_bengkel").serialize();
console.log(formData);
  $.ajax({
    url : siteurl+"users/register",
    type : "post",
    dataType : "json",
    data : formData,
    contentType: false,
    cache: false,
    processData: false,
    beforeSend(){
      loader.blur();
      $("#frm_signup_bengkel #signup_bengkel").prop("disabled", true);
      // $("#frm_signup_bengkel .login-loading").addClass("show");
    },
    complete(){
      loader.delete();
      $("#frm_signup_bengkel #signup_bengkel").prop("disabled", false);
      // $("#frm_signup_bengkel .login-loading").removeClass("show");
    },
    success : function(msg){
      if(msg['type'] == 'success'){
        alertify.notify(msg['msg'],'success');
        $("#frm_signup_bengkel")[0].reset();

        $("#lokasiBengkelResmi").text('Lokasi bengkel');
      }
      else
      {
        alertify.notify(msg['msg'],'error');
      }
    }
  });
}

//Login
function ajax_login(){
    var loader = new Loader();

    var formData = $("#frm_login").serialize();

    $.ajax({
        url : siteurl+"users/ajax_login",
        type : "post",
        dataType : "json",
        data : formData+"&login=1",
        beforeSend(){
          loader.blur();
          $("#frm_login #login").prop("disabled", true);
        },
        complete(){
          loader.delete();
          $("#frm_login #login").prop("disabled", false);
        },
        success : function(msg){
            if(msg['type'] == 'success'){
                $("#frm_login")[0].reset();

                //alertify.notify(msg['msg'],'success');

                window.location.href = siteurl+msg['redirect'];
            }
            else
            {
                alertify.notify(msg['msg'],'error');
            }
        }
    });
}

function forgot_password(){
  var loader = new Loader();

  var email = $("#reset-email").val();

  if(email == ''){
    alertify.notify('Silahkan ketikkan email anda','error');
    loader.delete();
    return false;
  }

  $.ajax({
    url : siteurl+"forgot_password",
    type : "post",
    dataType : "json",
    data : {reset_email: email, _token},
    beforeSend(){
      loader.blur();
    },
    complete(){
      loader.delete();
    },
    success : function(res){
      if(res['type'] == 'success'){
        alertify.notify(res['msg'],'success');
        $("#reset-email").val('');
        $('#close-forgot-password').click();
      }
      else
      {
        alertify.notify(res['msg'],'error');
      }
    }
  });
}

function reset_password(){
  var loader = new Loader();

  var formData = $("#frm_forgot_password").serialize();

  $.ajax({
    url : $("#frm_forgot_password").prop('action'),
    type : "post",
    dataType : "json",
    data : formData+"&save=1",
    beforeSend(){
      loader.blur();
    },
    complete(){
      loader.delete();
    },
    success : function(res){
      if(res['type'] == 'success'){
        alertify.notify(res['msg'],'success');
        window.location.href = siteurl;
      }
      else
      {
        alertify.notify(res['msg'],'error');
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", function() {
  var lazyImages = [].slice.call(document.querySelectorAll(".lazy"));
  var active = false;

  function lazyLoad() {
    if (active === false) {
      active = true;

      setTimeout(function() {
        lazyImages.forEach(function(lazyImage) {
          // console.log(lazyImage.getBoundingClientRect().top)
          if (lazyImage.getBoundingClientRect().top >= 0 || lazyImage.getBoundingClientRect().top <= 0) {
            lazyImage.src = lazyImage.dataset.src;
            lazyImage.srcset = lazyImage.dataset.srcset;
            lazyImage.classList.remove("lazy");

            lazyImages = lazyImages.filter(function(image) {
              return image !== lazyImage;
            });

            if (lazyImages.length === 0) {
             return lazyLoad
            }
          }
        });

        active = false;
      }, 200);
    }
  };

  lazyLoad()
});
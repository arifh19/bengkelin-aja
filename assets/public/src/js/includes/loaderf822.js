function Loader(){
    var style = 'position: fixed;\
    top: 0;\
    right: 0;\
    bottom: 0;\
    left: 0;\
    width: 100%;\
    height: 100%;\
    margin: auto;\
    z-index: 99999;\
    text-align: center;\
    background: rgba(255,255,255,.7);\
    pointer-events: none;'
    this.ele = '<div id="loader" style="'+style+'">\
    <div class="overlay"></div>\
    <div class="loader-5"></div></div>'
    $('body').append(this.ele)
}
Loader.prototype.blur = function(){
    var app = $('.app, #app')
    app.css('filter','blur(.5rem)')
}
Loader.prototype.delete = function(){
    this.ele = ''
    var app = $('#app,.app')
    app.removeAttr('style')
    var loader = $('#loader')
    loader.remove()
}

/* how to add loader
// add new object
var loader  = new Loader()
// add blur
loader.blur()
// delete loader
loader.delete()
*/
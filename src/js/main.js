// grab an element
var header = document.getElementById("header");
// construct an instance of Headroom, passing the element
var headroom = new Headroom(header);
// initialise
headroom.init();

function scrollTo(offset){
  $('html').animate({
    scrollTop: offset
  }, 300)
}

$('.btn__ghost__join').click(function(){
  var offset = $('footer').offset();
  scrollTo(offset.top);
})

$('.logo').click(function(){
  scrollTo(0)
})

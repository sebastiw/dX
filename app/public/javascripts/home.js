setFeedLoadingActive(true);
$('.snap-content').addClass('scroll-area');

$(document).ready(function() {
  var snapper = new Snap( {
    element:         document.getElementsByClassName("snap-content")[0],
    addBodyClasses:  true,
    hyperextensible: false,
    dragger:         $("noelement")
  });
} );

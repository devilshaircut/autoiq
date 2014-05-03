$(document).ready(function() {

  // This code controls the nav when it is a mobile view.
  $("#ns-slide-controls").click(function() {
    $("body").toggleClass("ns-slider-expanded");
  });
  $("nav.ns-section-main ol#ns-navigation > li > a").click(function() {
    $("body").removeClass("ns-slider-expanded");
  });

  // Make sure that if the user resizes, the dynamic states are also reset.
  $(window).resize(function() {
    $("body").removeClass("ns-slider-expanded");
  });

  $(window).scroll(function() {

    // Show or hide the top bar background.
    if ( $(window).scrollTop() > 0 ) {
      $("nav.ns-section-main").addClass("ns-nav-shadow-state");
      $("ol#ns-section-selector").addClass("ns-section-shadow-state");
    }
    else if ( $(window).scrollTop() <= 0 ) {
      $("nav.ns-section-main").removeClass("ns-nav-shadow-state");
      $("ol#ns-section-selector").removeClass("ns-section-shadow-state");
    }

  });

});


console.log("Successfully loaded main.js.");
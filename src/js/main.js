$(function(){
  $('.hamburger-menu').click(function(){
      $('.sliding-nav').toggleClass('sliding-nav--open');
      $('.mask').toggleClass('show')
      $('.hamburger').toggleClass('menu-opened');
  });

  $('.mask').click(function(){
      $('.sliding-nav').toggleClass('sliding-nav--open');
      $('.mask').removeClass('show');
      $('.hamburger').toggleClass('menu-opened');
  })
});

/* --------------------------
 * GLOBAL VARS
 * -------------------------- */
// The date you want to count down to
var targetDate = new Date("2022/04/04 00:00:00");   

// Other date related variables
var days;
var hrs;
var min;
var sec;

/* --------------------------
 * ON DOCUMENT LOAD
 * -------------------------- */
$(function() {
   // Calculate time until launch date
   timeToLaunch();
  // Transition the current countdown from 0 
  numberTransition('#days .number', days, 1000, 'easeOutQuad');
  numberTransition('#hours .number', hrs, 1000, 'easeOutQuad');
  numberTransition('#minutes .number', min, 1000, 'easeOutQuad');
  numberTransition('#seconds .number', sec, 1000, 'easeOutQuad');
  // Begin Countdown
  setTimeout(countDownTimer,1001);
});

/* --------------------------
 * FIGURE OUT THE AMOUNT OF 
   TIME LEFT BEFORE LAUNCH
 * -------------------------- */
function timeToLaunch(){
    // Get the current date
    var currentDate = new Date();

    // Find the difference between dates
    var diff = (currentDate - targetDate)/1000;
    var diff = Math.abs(Math.floor(diff));  

    // Check number of days until target
    days = Math.floor(diff/(24*60*60));
    sec = diff - days * 24*60*60;

    // Check number of hours until target
    hrs = Math.floor(sec/(60*60));
    sec = sec - hrs * 60*60;

    // Check number of minutes until target
    min = Math.floor(sec/(60));
    sec = sec - min * 60;
}

/* --------------------------
 * DISPLAY THE CURRENT 
   COUNT TO LAUNCH
 * -------------------------- */
function countDownTimer(){ 
    
    // Figure out the time to launch
    timeToLaunch();
    
    // Write to countdown component
    $( "#days .number" ).text(days);
    $( "#hours .number" ).text(hrs);
    $( "#minutes .number" ).text(min);
    $( "#seconds .number" ).text(sec);
    
    // Repeat the check every second
    setTimeout(countDownTimer,1000);
}

/* --------------------------
 * TRANSITION NUMBERS FROM 0
   TO CURRENT TIME UNTIL LAUNCH
 * -------------------------- */
function numberTransition(id, endPoint, transitionDuration, transitionEase){
  // Transition numbers from 0 to the final number
  $({numberCount: $(id).text()}).animate({numberCount: endPoint}, {
      duration: transitionDuration,
      easing:transitionEase,
      step: function() {
        $(id).text(Math.floor(this.numberCount));
      },
      complete: function() {
        $(id).text(this.numberCount);
      }
   }); 
};



// speaker player
var getaudio = $('#player')[0];
/* Get the audio from the player (using the player's ID), the [0] is necessary */
var mouseovertimer;
/* Global variable for a timer. When the mouse is hovered over the speaker it will start playing after hovering for 1 second, if less than 1 second it won't play (incase you accidentally hover over the speaker) */
var audiostatus = 'off';
/* Global variable for the audio's status (off or on). It's a bit crude but it works for determining the status. */

$(document).on('mouseenter', '.speaker', function() {
  /* Bonus feature, if the mouse hovers over the speaker image for more than 1 second the audio will start playing */
  if (!mouseovertimer) {
    mouseovertimer = window.setTimeout(function() {
      mouseovertimer = null;
      if (!$('.speaker').hasClass("speakerplay")) {
        getaudio.load();
        /* Loads the audio */
        getaudio.play();
        /* Play the audio (starting at the beginning of the track) */
        $('.speaker').addClass('speakerplay');
        return false;
      }
    }, 1000);
  }
});

$(document).on('mouseleave', '.speaker', function() {
  /* If the mouse stops hovering on the image (leaves the image) clear the timer, reset back to 0 */
  if (mouseovertimer) {
    window.clearTimeout(mouseovertimer);
    mouseovertimer = null;
  }
});

$(document).on('click touchend', '.speaker', function() {
  /* Touchend is necessary for mobile devices, click alone won't work */
  if (!$('.speaker').hasClass("speakerplay")) {
    if (audiostatus == 'off') {
      $('.speaker').addClass('speakerplay');
      getaudio.load();
      getaudio.play();
      window.clearTimeout(mouseovertimer);
      audiostatus = 'on';
      return false;
    } else if (audiostatus == 'on') {
      $('.speaker').addClass('speakerplay');
      getaudio.play()
    }
  } else if ($('.speaker').hasClass("speakerplay")) {
    getaudio.pause();
    $('.speaker').removeClass('speakerplay');
    window.clearTimeout(mouseovertimer);
    audiostatus = 'on';
  }
});

$('#player').on('ended', function() {
  $('.speaker').removeClass('speakerplay');
  /*When the audio has finished playing, remove the class speakerplay*/
  audiostatus = 'off';
  /*Set the status back to off*/
});
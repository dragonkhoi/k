var navBar = document.getElementById("khoiNavBar");
var navBarTimer;


function navBarSnapTop(place){
  if(place == "top"){
    navBar.style.position = 'fixed';
    navBar.style.top = '50px';
    navBar.style.backgroundColor = 'rgba(30, 30, 30, 0.5)';
  }
  else if(place == "bot"){
    console.log("botsnap");
    navBar.style.position = 'absolute';
    navBar.style.top = '80%';
    navBar.style.backgroundColor = 'rgba(50, 50, 50, 0.0)';

  }
}
function toggleEmail(){
  $('#khoisEmail').toggle('slow');
}
function showEmail() {
  $('#khoisEmail').show();
}
function hideEmail(){
  $('#khoisEmail').hide();
}
function hideNavBar(){
  navBar.style.opacity = 0;
}

function scrollToKhoi(){
  $('html, body').animate({
    scrollTop: $("#khoi").offset().top
  }, 1500, function() {
    window.location.hash = 'khoi';
  });
}

$(document).ready(function(){
  var topNavBar = $("#khoiNavBar").offset().top - 50;
  window.onscroll = function(){
    if(window.pageYOffset > topNavBar){
      navBarSnapTop("top");
    }
    else if(window.pageYOffset <= topNavBar){
      navBarSnapTop("bot");
    }
  }

  window.onmousemove = function(){
    navBar.style.opacity = 1;
    if(navBarTimer != null){
      clearTimeout(navBarTimer);
    }
    navBarTimer = setTimeout(hideNavBar, 3000);
  }

  $(".largeTextButton").click(function() {
    var target = this.hash, $target = $(target);
    $('html, body').animate({
      scrollTop: $target.offset().top
    }, 1200, 'swing', function(){
      window.location.hash = target;
    });
  });
});

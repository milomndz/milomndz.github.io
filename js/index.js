window.onscroll = function() {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 180 ||
    document.documentElement.scrollTop > 180
  ) {
    document.getElementById("logo_menu").style.visibility = "visible";
  } else {
    document.getElementById("logo_menu").style.visibility = "hidden";
  }
}

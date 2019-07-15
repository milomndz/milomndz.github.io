window.onscroll = function() {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 110 ||
    document.documentElement.scrollTop > 110
  ) {
    document.getElementById("logo_menu").style.visibility = "visible";
  } else {
    document.getElementById("logo_menu").style.visibility = "hidden";
  }
}

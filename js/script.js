function openCity(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

function sendEma() {
  console.log("se metio")
  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "outside.tec.sv@gmail.com",
    Password: "0fe436b6-1307-4784-ac03-36ecfd2f953b",
    To: '00025815@uca.edu.sv',
    From: "outside.tec.sv@gmail.com",
    Subject: "This is the subject",
    Body: "And this is the body"
  }).then(
    message => alert(message)
  );

}
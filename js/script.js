//FIREBASE
// Your web app's Firebase configuration



var imageurl2, imagename;

function openForm(evt, FormName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(FormName).style.display = "block";
  evt.currentTarget.className += " active";
}

function sendEma(opc) {
  var name, tel, email, subject, body;
  if (opc == 0) {
    name = document.getElementById("name").value;
    tel = document.getElementById("tel").value;
    email = document.getElementById("email").value;
    subject = document.getElementById("subject").value;
    body = document.getElementById("body").value;
  } else {
    name = document.getElementById("nameC").value;
    tel = document.getElementById("telC").value;
    email = document.getElementById("emailC").value;
    subject = document.getElementById("subjectC").value;
    body = document.getElementById("bodyC").value;
  }


  //console.log(name + tel + email + subject + body);


  Email.send({
    Host: "smtp.gmail.com",
    Username: "outside.tec.sv@gmail.com",
    Password: "01430614@@",
    To: "00025815@uca.edu.sv",
    From: email,
    Subject: subject,
    Body: ' \nNombre: ' + name + ' y teléfono: ' + tel + "\n" + body
  }).then(message => console.log(message), alert("Mensaje enviado con éxito!"));

  location.reload();

}


function sendEmaFile() {

  var name = document.getElementById("name").value;
  var tel = document.getElementById("tel").value;
  var email = document.getElementById("email").value;
  var subject = document.getElementById("subject").value;
  var body = document.getElementById("body").value;

  console.log(imageurl2);
  if (name && email && subject && body && imageurl2) {

    Email.send({
      Host: "smtp.gmail.com",
      Username: "outside.tec.sv@gmail.com",
      Password: "01430614@@",
      To: "00025815@uca.edu.sv",
      From: email,
      Subject: subject,
      Body: ' \nNombre: ' + name + ' y teléfono: ' + tel + "\n" + body,
      Attachments: [{
        name: imagename,
        path: imageurl2
      }]
    }).then(message => console.log(message), alert("Mensaje enviado con éxito!"));

    location.reload();
  } else {
    alert("Faltan campos por llenar.")
  }

  //console.log(name + tel + email + subject + body);



}




//Input File
function uploadFile(target) {
  document.getElementById("file-name").innerHTML = target.files[0].name;
  var imageurl = " ",
    image = null;
  filename = target.files[0].name;

  if (filename.lastIndexOf('.') <= 0) {
    return alert("Error, tipo de archivo invalido!")
  }
  const fileReader = new FileReader()
  fileReader.addEventListener('load', () => {
    imageurl = fileReader.result
    console.log(imageurl)
  })
  fileReader.readAsDataURL(target.files[0])
  image = target.files[0]
  console.log("------> " + image.name);
  imagename = image.name;


  //Firebase Storage

  var uploadTask = db.child(`/CV/${image.name}`).put(image);

  // Register three observers:
  // 1. 'state_changed' observer, called any time the state changes
  // 2. Error observer, called on failure
  // 3. Completion observer, called on successful completion
  uploadTask.on('state_changed', function (snapshot) {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED: // or 'paused'
        console.log('Upload is paused');
        break;
      case firebase.storage.TaskState.RUNNING: // or 'running'
        console.log('Upload is running');
        break;
    }
  }, function (error) {
    // Handle unsuccessful uploads
  }, function () {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
      console.log('File available at', downloadURL);
      imageurl2 = downloadURL;
    });
  });


  /*

  const storageRef = db.ref(`/CV/${image.name}`);
  const task = storageRef.put(image).then(function (snapshot) {
    console.log('Uploaded an array!');
    console.log(task)
    task.snapshot.ref.getDownloadURL().then((url) => {
      imageurl2 = url;
      console.log(imageurl2);
    })
  });*/






}


//Start
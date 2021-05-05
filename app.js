firebase.auth().onAuthStateChanged(user => {
    if (user) {
        console.log('user logged in: ', user);
        //$('#menuRegistro').append(" <li><img src='" +user.photoURL+ "' id='iconFoto'/></li>");
        $('#login').hide();
        $('#loginOut').show();
        $('#fotoGoogle').append(" <img src='" + user.photoURL + "' id='iconFoto'/>");
        $('.info').append("<p><i id='nombreUsuario' class='fas fa-phone-alt'></i>   " + user.displayName + "</p>");
        $('.info').append("<p><i id='emailUsuario' class='far fa-envelope'></i>   " + user.email + "</p>");
        $('.registroOculto').show();
        usuario = user;
        guardarDatos(user);

    } else {
        console.log('user logged out');
        $('#loginOut').hide();
        $('#iconFoto').hide();
        $('#login').show();
        $('.registroOculto').hide();

    }
})



//login
var provider = new firebase.auth.GoogleAuthProvider();
var usuario;
var urlImagen;

var fileButton = document.getElementById("dato9");
//vigilar foto
fileButton.addEventListener('change', function (e) {
    console.log("holllllllla");
    //obtener archivo
    var file = e.target.files[0];
    //crear un store ref
    var storageRef = firebase.storage().ref('mis_fotos/' + file.name);
    // subir archivo
    var task = storageRef.put(file);

    task.then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => {
            urlImagen = url;
        })

})

//actualiza la galeria al detectar cambios
var starCountRef = firebase.database().ref('mascotas/');
starCountRef.on('child_added', (snapshot) => {
    var elem1 = "<div class='foto'><img class='img-hover' src='" + snapshot.val().fotografia + "'>";
    var elem2 = "<div class='oculto'><a class='prueba' title='<h2>" + snapshot.val().estado + "</h2>' href=" + snapshot.val().fotografia + " data-lightbox='roadtrip'>";
    var elem3 = "<img class='img-hover' src=" + snapshot.val().fotografia + " alt=''></a></div></div>";
    $("#galeria").append(elem1 + elem2 + elem3);
    $(document).ready(function () {
        $('.foto').hover(function () {
            $(this).find('.oculto').fadeIn();
            $(this).find('.img-hover').addClass('agrandar');
        }, function () {
            $(this).find('.oculto').fadeOut();
            $(this).find('.img-hover').removeClass('agrandar');
        })


    })
});

//obtiene los datos del formulario
(function () {
    'use strict';
    window.addEventListener('load', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();

                }
                if (form.checkValidity() === true) {
                    var mascota = {
                        tipo: document.getElementById("dato1").value,
                        raza: document.getElementById("dato2").value,
                        estado: document.getElementById("dato3").value,
                        nombre: document.getElementById("dato4").value,
                        edad: document.getElementById("dato5").value,
                        color: document.getElementById("dato6").value,
                        tamaño: document.getElementById("dato7").value,
                        salud: document.getElementById("dato8").value,
                        fotografia: urlImagen,
                        descripcion: document.getElementById("dato10").value,
                        ubicacion: document.getElementById("dato11").value,
                        fecha: document.getElementById("dato12").value,
                        uid: usuario.uid,
                        nombreUsuario: usuario.displayName,
                        emailUsuario: usuario.email,
                        fotoUsuario: usuario.photoURL,
                        telefono: document.getElementById("dato13").value
                    }
                    firebase.database().ref("mascotas/").push(mascota)

                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();


$('#login').click(function () {
    firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            usuario = result.user;
        });

})

function guardarDatos(user) {
    var usuario = {
        uid: user.uid,
        nombre: user.displayName,
        email: user.email,
        foto: user.photoURL
    }
    firebase.database().ref("usuarios/" + user.uid).set(usuario)
}
$('#loginOut').click(function () {
    firebase.auth().signOut()
        .then(function () {
            console.log('Salir');
        })
        .catch(function (error) {
            console.log('error');
        })

})



$('.menu-icon').click(function () {
    $('nav').slideToggle();
})



$('#tipoRegistro1').click(function () {
    document.getElementById("tipoRegistro1").className = "btn btn-success btn-lg active";
    document.getElementById("tipoRegistro3").className = "btn btn-secondary btn-lg active";
    document.getElementById("tipoRegistro4").className = "btn btn-secondary btn-lg active";
    $('#formulario1').show();
    
})

$('#tipoRegistro3').click(function () {
    document.getElementById("tipoRegistro1").className = "btn btn-secondary btn-lg active";
    document.getElementById("tipoRegistro3").className = "btn btn-success btn-lg active";
    document.getElementById("tipoRegistro4").className = "btn btn-secondary btn-lg active";
    $('#formulario1').hide();
})
$('#tipoRegistro4').click(function () {
    document.getElementById("tipoRegistro1").className = "btn btn-secondary btn-lg active";
    document.getElementById("tipoRegistro3").className = "btn btn-secondary btn-lg active";
    document.getElementById("tipoRegistro4").className = "btn btn-success btn-lg active";
    $('#formulario1').hide();
})
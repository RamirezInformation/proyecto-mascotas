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


var starCountRef = firebase.database().ref('mascotas/');
starCountRef.on('child_added', (snapshot) => {
    $("#galeria").append("<div class='foto'><img class='img-hover' src='" + snapshot.val().fotografia + "'><div class='oculto'><h4>Mascota 1</h4></div></div>");
});


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
            console.log(result.user);
            $('#login').hide();
            $('#loginOut').show();
            $('#fotoGoogle').append(" <img src='" + result.user.photoURL + "' id='iconFoto'/>");
            $('.info').append("<p><i id='nombreUsuario' class='fas fa-phone-alt'></i>   " + result.user.displayName + "</p>");
            $('.info').append("<p><i id='emailUsuario' class='far fa-envelope'></i>   " + result.user.email + "</p>");
            $('.registroOculto').show();
            usuario = result.user;
            guardarDatos(result.user);
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
            $('#loginOut').hide();
            $('#iconFoto').hide();
            $('#login').show();
            $('.registroOculto').hide();
        })
        .catch(function (error) {
            console.log('error');
        })

})


$(document).ready(function () {
    $('.foto').hover(function () {
        $(this).find('.oculto').fadeIn();
        $(this).find('.img-hover').addClass('agrandar');
    }, function () {
        $(this).find('.oculto').fadeOut();
        $(this).find('.img-hover').removeClass('agrandar');
    })
    $('.menu-icon').click(function () {
        $('nav').slideToggle();
    })

})

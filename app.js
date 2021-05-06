var sesion = false;
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
        sesion = true;

    } else {
        console.log('user logged out');
        $('#loginOut').hide();
        $('#iconFoto').hide();
        $('#login').show();
        $('.registroOculto').hide();
        $('.formulario3').hide();
        if (sesion) {
            location.reload();
            sesion = false;
        }
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
    var ax1 = snapshot.val().fotografia;
    var ax2 = snapshot.val().estado;
    var ax3 = snapshot.val().tipo;
    var ax4 = snapshot.val().color;
    var ax5 = snapshot.val().tamaño;
    var ax6 = snapshot.val().ubicacion;
    var ax7 = snapshot.val().fecha;
    var ax8 = snapshot.val().telefono;
    var axxx = `
    <div class='foto'>
        <img class='img-hover' src="${ax1}">
        <div class='oculto' >   
            <a class='prueba' title='
            <h2 style="margin-top: 20px;margin-bottom: 20px;">Estado:  ${ax2}</h2>
            <h2 style="margin-top: 20px;margin-bottom: 20px;">tamaño:   ${ax5}</h2>
            <h2 style="margin-top: 20px;margin-bottom: 20px;">Dirección:   ${ax6}</h2>
            <h2 style="margin-top: 20px;margin-bottom: 20px;">Fecha:   ${ax7}</h2>
            <h2 style="margin-top: 20px;margin-bottom: 20px;">Telefono:   ${ax8}</h2>
            ' href="${ax1}" data-lightbox='roadtrip'>
                <img class='img-hover' src="${ax1}" alt=''>
                
            </a>
        </div>
    </div>`;
    $("#galeria").append(axxx);

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
                    sw = 0;
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
    console.log((this).id);
    document.getElementById("tipoRegistro1").className = "btn btn-success btn-lg active";
    document.getElementById("tipoRegistro2").className = "btn btn-secondary btn-lg active";
    document.getElementById("tipoRegistro3").className = "btn btn-secondary btn-lg active";
    $('#formulario1').show();
    $('#formulario3').hide();

})

$('#tipoRegistro2').click(function () {
    document.getElementById("tipoRegistro1").className = "btn btn-secondary btn-lg active";
    document.getElementById("tipoRegistro2").className = "btn btn-success btn-lg active";
    document.getElementById("tipoRegistro3").className = "btn btn-secondary btn-lg active";
    $('#formulario1').hide();
    $('#formulario3').hide();
})
var sw = 0;
$('#tipoRegistro3').click(function () {
    document.getElementById("tipoRegistro1").className = "btn btn-secondary btn-lg active";
    document.getElementById("tipoRegistro2").className = "btn btn-secondary btn-lg active";
    document.getElementById("tipoRegistro3").className = "btn btn-success btn-lg active";
    $('#formulario1').hide();
    $('#formulario3').hide();
    $('#formulario3').show();
    console.log(usuario);
    //-----------------
    if (sw == 0) {
        sw = 1;
        console.log("esta es la base de datos");
        var cont = 0;
        starCountRef.on('child_added', (snapshot) => {
            cont = cont + 1;
            if (snapshot.val().uid == usuario.uid) {
                var ax1 = snapshot.val().fotografia;
                var ax2 = snapshot.val().estado;
                var ax3 = snapshot.val().tipo;
                var ax4 = snapshot.val().color;
                var ax5 = snapshot.val().tamaño;
                var ax6 = snapshot.val().ubicacion;
                var ax7 = snapshot.val().fecha;
                var ax8 = snapshot.val().telefono;
                var aux = `
            <div class="ej1">
                <img class='imagenForm3' src="${ax1}">
                <div class="ej2">
                    <p class='infMascota'>Estado:   ${ax2}</p>
                    <p class='infMascota'>tamaño:   ${ax5}</p>
                    <p class='infMascota'>Dirección:   ${ax6}</p>
                    <p class='infMascota'>Fecha:   ${ax7}</p>
                    <p class='infMascota'>Telefono:   ${ax8}</p>
                    <button type="button" class="btn btn-danger">Eliminar</button>
                </div>
            </div>
            
            `;
                $("#imagen_de_mascota").append(aux);
            }


        });
    }
    //-----------------




})




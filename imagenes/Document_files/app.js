//login
var provider = new firebase.auth.GoogleAuthProvider();


$('#login').click(function () {
    firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            console.log(result.user);
            $('#login').hide();
            $('#loginOut').show();
            $('#fotoGoogle').append(" <img src='" + result.user.photoURL + "' id='iconFoto'/>");
            $('.info').append("<p><i class='fas fa-phone-alt'></i>   "+ result.user.displayName + "</p>");
            $('.info').append("<p><i class='far fa-envelope'></i>   "+ result.user.email + "</p>");
            $('.registroOculto').show();
            guardarDatos(result.user);
        });

})
function guardarDatos(user){
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
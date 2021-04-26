//login
var provider = new firebase.auth.GoogleAuthProvider();



$('#login').click(function () {
    firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            console.log(result.user);
            $('#login').hide();
            $('#loginOut').show();
            $('.menu nav ul').append(" <img width='50px' src='" + result.user.photoURL + "' id='iconFoto'/>");
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
        })
        .catch(function (error) {
            console.log('error');
        })

})
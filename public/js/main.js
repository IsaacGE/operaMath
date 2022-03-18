active = document.getElementById('eye-pass');
pass = document.getElementById('password');

const showPassEye = () => {
    if (pass.type == 'password') {
        pass.type = 'text';
        active.className = 'far fa-eye-slash';
        active.setAttribute('title', 'Ocultar contraseña');
    } else {
        pass.type = 'password';
        active.className = 'far fa-eye';
        active.setAttribute('title', 'Ver contraseña');
    }
    console.log(active);
}
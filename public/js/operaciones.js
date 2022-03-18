let resultado = 0;

function sumar() {
    num1 = parseFloat(document.getElementById('num1').value);
    num2 = parseFloat(document.getElementById('num2').value);

    if (num1 >= 0 && num2 >= 0) {
        resultado = num1 + num2;
        document.getElementById('result').value = resultado;
        document.getElementById('tipo').value = 'Suma';
        document.getElementById('save_db').className = 'btn btn-success';
    } else {
        Swal.fire({
            title: '¡Espera!',
            text: 'Ingresa los números a sumar o al menos ingresa uno mayor a 0',
            icon: 'warning',
            showConfirmButton: true,
            timer: 3000
        })
    }
}

function restar() {
    num1 = parseFloat(document.getElementById('num1').value);
    num2 = parseFloat(document.getElementById('num2').value);
    if (num1 >= 0 && num2 >= 0) {
        resultado = num1 - num2;
        document.getElementById('result').value = resultado;
        document.getElementById('tipo').value = 'Resta';
        document.getElementById('save_db').className = 'btn btn-success';
    } else {
        Swal.fire({
            title: '¡Espera!',
            text: 'Ingresa los números a restar o al menos ingresa uno mayor a 0',
            icon: 'warning',
            showConfirmButton: true,
            timer: 3000
        })
    }
}

function dividir() {
    num1 = parseFloat(document.getElementById('num1').value);
    num2 = parseFloat(document.getElementById('num2').value);
    if (num1 >= 0 && num2 >= 0) {
        resultado = num1 / num2;
        document.getElementById('result').value = resultado;
        document.getElementById('tipo').value = 'Division';
        document.getElementById('save_db').className = 'btn btn-success';
    } else {
        Swal.fire({
            title: '¡Espera!',
            text: 'Ingresa los números a dividir o al menos ingresa uno mayor a 0',
            icon: 'warning',
            showConfirmButton: true,
            timer: 3000
        })
    }
}

function multiplicar() {
    num1 = parseFloat(document.getElementById('num1').value);
    num2 = parseFloat(document.getElementById('num2').value);
    if (num1 >= 0 && num2 >= 0) {
        resultado = num1 * num2;
        document.getElementById('result').value = resultado;
        document.getElementById('tipo').value = 'Multiplicacion';
        document.getElementById('save_db').className = 'btn btn-success';
    } else {
        Swal.fire({
            title: '¡Espera!',
            text: 'Ingresa los números a multiplicar o al menos ingresa uno mayor a 0',
            icon: 'warning',
            showConfirmButton: true,
            timer: 3000
        })
    }
}
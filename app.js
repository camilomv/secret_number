let numerosSorteados = [];  // Para almacenar los números que ya fueron sorteados y no repetir
let numeroMaximo= 10;
let numeroSecreto = generarNumeroSecreto();
let intentos = 1;


function asignarTextoElemento(elemento, mensaje){
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = mensaje;
    return;
}

function verificarIntento(){
    let numeroUsuario = parseInt(document.getElementById('valorUsuario').value);
    if(numeroUsuario === numeroSecreto){ // === compara el valor y el tipo (int)
        asignarTextoElemento('p', `Felicitaciones, el número ${numeroUsuario}
        es correcto y se acerto en ${intentos} ${(intentos === 1) ? 'intento' : 'intentos'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        // El usuario no acertó el número
        if(numeroUsuario>numeroSecreto){
            asignarTextoElemento('p', 'El número secreto es menor');
        } else {
            asignarTextoElemento('p', 'El número secreto es mayor');
        }
        intentos++;
        limpiarCaja();
    }
    return;
}

function generarNumeroSecreto() {
    console.log(numerosSorteados);
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;
    // Verificar si hay números disponibles para sortear
    if(numerosSorteados.length == numeroMaximo){
        asignarTextoElemento('p', 'Ya se sortearon todos los números posibles');
    } else {
        // Verificar que el número no esté en la lista de numerosSorteados
        if (numerosSorteados.includes(numeroGenerado)){
            return generarNumeroSecreto();
        } else {
            numerosSorteados.push(numeroGenerado)
            return numeroGenerado;
        }
    }    
}

function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

function reiniciarJuego() {
    limpiarCaja();  // Limpiar caja
    condicionesIniciales(); // Pantalla de inicio, nuevo número secreto, contador en 1
    document.querySelector('#reiniciar').setAttribute('disabled', 'true'); // Desabilitar el botón inicar juego
}

function condicionesIniciales() {
    asignarTextoElemento('h1', 'Juego interactivo');
    asignarTextoElemento('p', `Digita un número entre 1 y ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}

condicionesIniciales();
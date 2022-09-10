let botonInicio = document.querySelector("#iniciar");
let nuevoJuego = document.querySelector(".juego--nuevo");
let presiondeteclas = document.querySelector(".cuerpo");
let guardarPalabra = document.querySelector("#guardar_palabra");
let botonAgregar = document.querySelector("#agregarPalabra");
let botonCancelar = document.querySelector("#cancelar");
let botonSalir = document.querySelector(".juego--salir");
////Pantallas
let pantallaInicio = document.querySelector("#inicio");
let pantallaAgregarPalabra = document.querySelector("#agregar__palabra");
let pantallaJuego = document.querySelector("#juego");
//// Canvas
var pantalla = document.querySelector("#canvas");
var pincel = pantalla.getContext("2d");
let listadePalabras = ["Mexico", "Colombia", "Peru", "España", "Argentina", "Japon", "Ecuador", "Rusia", "Brasil", "Portugal", "Ucrania", "Corea", "Vietnam", "Chile"];
let palabraSecreta;
let piezas = 0;
let arraydePalabraSecreta;
let letrasIncorrectas = [];
let aciertos = 0;
pantallaInicio.className = "pantalla_inicio";
pantallaAgregarPalabra.className = "hide";
pantallaJuego.className = "hide";
///Dibuja el tablero de juegp
function areaJuego() {
    pincel.fillStyle = "#3c3c3c";
    pincel.fillRect(0, 0, 1200, 800);
}
////Funcion dibujar líneas de palabra
function dibujarLineaPalabraSecreta(x, y) {
    pincel.strokeStyle = "darkred";
    pincel.lineWidth = 5;
    pincel.beginPath();
    pincel.moveTo(x, y);
    pincel.lineTo(x + 50, y);
    pincel.stroke();
}
////Función para dibujar guines respectivos a la palabra
function guionesPalabraSecreta() {
    let ycoord = 710;
    for (let x = 0; x < arraydePalabraSecreta.length; x++) {
        let xcoord = (x + 1) * 80;
        // console.log(xcoord);
        dibujarLineaPalabraSecreta(xcoord, ycoord);
    }
}
////Función para dibujar letra Correcta
function dibujarLetraCorrecta(letra, xpos, ypos) {
    pincel.fillStyle = "white";
    pincel.font = "50px Montserrat";
    pincel.fillText(letra, xpos, ypos)
}
////dibujar letra Incorrecta
function dibujarLetraIncorrecta(letrab, xposb, yposb) {
    pincel.fillStyle = "white";
    pincel.font = "30px Montserrat";
    pincel.fillText(letrab, xposb, yposb)
}
//// Función Dibujar Ahorcado;
function horca() {
    pincel.strokeStyle = "darkred";
    pincel.lineWidth = 6;
    pincel.beginPath();
    pincel.moveTo(250, 600);
    pincel.lineTo(850, 600);
    pincel.stroke();
    pincel.moveTo(330, 600);
    pincel.lineTo(330, 50);
    pincel.lineTo(600, 50);
    pincel.lineTo(600, 100);
    pincel.stroke();
}
function cabeza() {
    pincel.strokeStyle = "darkred";
    pincel.lineWidth = 6;
    pincel.beginPath();
    pincel.arc(600, 155, 50, 0, 2 * 3.14);
    pincel.stroke();
}
function tronco() {
    pincel.strokeStyle = "darkred";
    pincel.lineWidth = 6;
    pincel.beginPath();
    pincel.moveTo(600, 210);
    pincel.lineTo(600, 400);
    pincel.stroke();
}
function piernaIzquierda() {
    pincel.strokeStyle = "darkred";
    pincel.lineWidth = 6;
    pincel.beginPath();
    pincel.moveTo(600, 405);
    pincel.lineTo(525, 505);
    pincel.stroke();
}
function piernaDerecha() {
    pincel.strokeStyle = "darkred";
    pincel.lineWidth = 6;
    pincel.beginPath();
    pincel.moveTo(600, 405);
    pincel.lineTo(675, 505);
    pincel.stroke();
}
function brazoIzquierdo() {
    pincel.strokeStyle = "darkred";
    pincel.lineWidth = 6;
    pincel.beginPath();
    pincel.moveTo(600, 260);
    pincel.lineTo(525, 360);
    pincel.stroke();
}
function brazoDerecho() {
    pincel.strokeStyle = "darkred";
    pincel.lineWidth = 6;
    pincel.beginPath();
    pincel.moveTo(600, 260);
    pincel.lineTo(675, 360);
    pincel.stroke();
    pincel.fillStyle = "darkred";
    pincel.font = "50px Montserrat";
    pincel.fillText("Fin del Juego!", 800, 200);
    pincel.fillText("Perdiste", 800, 280);
    pincel.fillText("La palabra era:", 800, 360);
    pincel.fillStyle = "darkgreen";
    pincel.fillText(palabraSecreta, 800, 440);
}
////Dibuja el ahorcado
function ahorcado() {
    if (piezas == 1) {
        horca();
    }
    if (piezas == 2) {
        cabeza();
    }
    if (piezas == 3) {
        tronco();
    }
    if (piezas == 4) {
        piernaIzquierda();
    }
    if (piezas == 5) {
        piernaDerecha();
    }
    if (piezas == 6) {
        brazoIzquierdo();
    }
    if (piezas == 7) {
        perdiste();
    }
}
//// Funcion resetea todo e inicia el Juego
function iniciarJuego() {
    pantallaInicio.className = "hide";
    pantallaAgregarPalabra.className = "hide";
    pantallaJuego.className = "pantalla_juego";
    console.log("juego Iniciado");
    selectordePalabra();
    areaJuego();
    guionesPalabraSecreta();
    piezas = 0;
    palabraSecreta;
    arraydePalabraSecreta;
    letrasIncorrectas = [];
    aciertos = 0;
    presiondeteclas.addEventListener("keydown", capturarTecla);
}
////Función para seleccionar una palabra aleatoria del Array
function selectordePalabra() {
    let aleatorio = Math.floor(Math.random() * listadePalabras.length)
    palabraSecreta = listadePalabras[aleatorio].toUpperCase();
    // console.log(`palabraSecreta: ${palabraSecreta}`);
    arraydePalabraSecreta = palabraSecreta.split("");
    console.log(`Array: ${arraydePalabraSecreta}`);
}
////Fucnion para capturar las presiones del teclado
function capturarTecla(letra) {
    let validacion = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz";
    teclaPresionada = letra.key.toUpperCase();
    if (validacion.includes(teclaPresionada)) {
        esunaLetra();
    } else {
        console.log("No has presionado una letra");
    }
}
///Función para saber si la letra es parte de la palabra
function esunaLetra() {
    if (arraydePalabraSecreta.includes(teclaPresionada)) {
        console.log(`la letra: ${teclaPresionada} SI es parte de la palabra`);
        letraCorrecta();
    } else {
        console.log(`la letra: ${teclaPresionada} NO es parte de la palabra`);
        letrasIncorrectas.push(teclaPresionada);
        // console.log(letrasIncorrectas);
        letraIncorrecta(teclaPresionada);
    }
}
/// Función para saber si la letra ingresada es parte de la palabra
function letraCorrecta() {
    palabra = arraydePalabraSecreta; // array de la palabra secreta
    let ypos = 705;
    for (let p = 0; p < palabra.length; p++) {
        if (palabra[p] == teclaPresionada) {
            // console.log(teclaPresionada);
            // console.log(p);
            letra = teclaPresionada;
            aciertos++;
            if (teclaPresionada == "I") {
                xpos = (p + 1) * 84;
                dibujarLetraCorrecta(letra, xpos, ypos);

            } else {
                xpos = (p + 1) * 81;
                dibujarLetraCorrecta(letra, xpos, ypos);
            }
        }
        if (aciertos === palabra.length) {
            ganaste();
        }
    }
}
////Función para dibujar letra Incorrecta
function letraIncorrecta(teclaPresionada) {
    letrab = teclaPresionada;
    let yposb = 780;
    for (let b = 0; b < letrasIncorrectas.length; b++) {
        if (letrasIncorrectas[b] == teclaPresionada) {
            xposb = (b + 1) * 60;
            dibujarLetraIncorrecta(letrab, xposb, yposb);
            piezas++;
            // console.log(piezas);
            ahorcado();
        }
    }
}
////Funcion dibuja el texto de ganaste
function mensajeGanaste() {
    pincel.fillStyle = "darkgreen";
    pincel.font = "50px Montserrat";
    pincel.fillText("Ganaste,", 750, 150);
    pincel.fillText("Felicidades!", 740, 220);
}
////Funcion cuando Ganas La partida
function ganaste() {
    horca();
    mensajeGanaste();
    presiondeteclas.removeEventListener("keydown", capturarTecla);
}
//// Función cuando pierdes la partida
function perdiste() {
    brazoDerecho();
    presiondeteclas.removeEventListener("keydown", capturarTecla);
}
////Función para agregar nuevas palabras
function agregarPalabra() {
    palabraIngresada = document.querySelector("#textNueva").value;
    ingresadaNormal = palabraIngresada.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    // console.log(ingresadaNormal);
    listadePalabras.push(ingresadaNormal);
    // console.log(listadePalabras);
    iniciarJuego();
}
////Funciones para las diferentes pantallas del juego
function pantallaAgregar() {
    document.querySelector("#textNueva").value = "";
    pantallaInicio.className = "hide";
    pantallaAgregarPalabra.className = "agregar--palabra";
    pantallaJuego.className = "hide"
    presiondeteclas.removeEventListener("keydown", capturarTecla);
}
function cancelar() {
    pantallaInicio.className = "pantalla_inicio";
    pantallaAgregarPalabra.className = "hide";
    pantallaJuego.className = "hide"
    presiondeteclas.removeEventListener("keydown", capturarTecla);
}
function salir() {
    pantallaInicio.className = "pantalla_inicio";
    pantallaAgregarPalabra.className = "hide";
    pantallaJuego.className = "hide"
    presiondeteclas.removeEventListener("keydown", capturarTecla);
}

botonInicio.addEventListener("click", iniciarJuego);
nuevoJuego.addEventListener("click", iniciarJuego);
guardarPalabra.addEventListener("click", agregarPalabra);
botonAgregar.addEventListener("click", pantallaAgregar);
botonCancelar.addEventListener("click", cancelar);
botonSalir.addEventListener("click", salir)
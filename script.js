//// Replanteando xd

let selectorPalabraSecreta = document.querySelector("#iniciar")
let presiondeteclas = document.body;

var pantalla = document.querySelector("canvas");
var pincel = pantalla.getContext("2d");


let palabraSecreta = ["alura", "oracle", "ahorcado", "secreto"];
let palabraJuego;
let letrasJuego = [];

///función que devuelve palabra aleatoria
function seleccionarPalabraSecreta() {
    let aleatorio = Math.floor(Math.random() * palabraSecreta.length);
    let palabraJuego = palabraSecreta[aleatorio];
    areaJuego();
    return palabraJuego;
}
///crea el array de la palabra aleatoria
function arrayPalabraSecreta() {
    let palabraSeleccionada = seleccionarPalabraSecreta().toUpperCase();
    let letrasJuego = palabraSeleccionada.split("")
    game(letrasJuego);
    return letrasJuego;
}
///Dibuja el tablero de juegp
function areaJuego() {
    pincel.font = "50px Montserrat";
    pincel.fillStyle = "lightblue";
    pincel.fillRect(0, 0, 1200, 800);
    pincel.fillStyle = "black";
    pincel.fillRect(0, 600, 1280, 100)
}
////Funcion dibujar líneas de palabra
function dibujarLineaPalabraSecreta(x, y) {
    pincel.strokeStyle = "red";
    pincel.lineWidth = 5;
    pincel.beginPath();
    pincel.moveTo(x, y);
    pincel.lineTo(x + 50, y);
    pincel.stroke();
}
////Dibuja guiones dependiendo las letras
function game(letrasJuego) {
    let ycoord = 690;
    let lineasPalabra = letrasJuego;
    console.log(lineasPalabra)
    for (let x = 1; x <= lineasPalabra.length; x++) {
        let xcoord = x * 80;
        dibujarLineaPalabraSecreta(xcoord, ycoord)
    }
}

////Verificar si una tecla fue presionada
function capturarTecla(tecla) {
    let validacion = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz";
    let teclaPress = tecla.key;
    let letraPress = teclaPress.toUpperCase();

    console.log(letraPress);
}











selectorPalabraSecreta.addEventListener("click", arrayPalabraSecreta);
presiondeteclas.addEventListener("keydown", capturarTecla);



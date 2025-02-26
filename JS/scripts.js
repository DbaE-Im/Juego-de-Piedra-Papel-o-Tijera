//Declaracion de variables para las funcionalidades de los botones por seleccion de ids

var opt_piedra = document.getElementById("piedra");
var opt_papel = document.getElementById("papel");
var opt_tijera = document.getElementById("tijera");

// Variable para la selecion de imagen al hacer un click en las 3 opciones de piedra,papel o tijera
var img_opt_player1 = document.getElementById("player1");
var img_opt_player2 = document.getElementById("player2");
//Creacion de 2 variables 
var select_player1;
var select_player2;

//Creamos funciones para que ayan cambios de estados, llamamos a cada variable
opt_piedra.onclick = function(){
    select_player1 = "piedra";
    img_opt_player1.src = "Resources/piedra.png";
}
opt_papel.onclick = function(){
    select_player1 = "papel";
    img_opt_player1.src = "Resources/mano.png";
}
opt_tijera.onclick = function(){
    select_player1 = "tijera";
    img_opt_player1.src = "Resources/tijera.png";
}

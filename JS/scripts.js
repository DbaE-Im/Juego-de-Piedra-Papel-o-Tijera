//--------Añadir música de fondo---------
let musicaFondo = new Audio("Resources/musicadefondo.mp3");
musicaFondo.loop = true; // Para que la música se repita

// Función para iniciar la música
function iniciarMusica() {
    musicaFondo.play().catch(error => {
        console.log("El usuario debe interactuar antes de reproducir el audio:", error);
    });
}
//--------Añadir música de fondo---------





//--------Modal de inicio---------
let modalIniciar = new bootstrap.Modal(document.getElementById("modalIniciar"), {
    backdrop: "static",
    keyboard: false
});

modalIniciar.show();

document.getElementById("btnIniciarJuego").addEventListener("click", () => {
    let nombre = document.getElementById("nombreJugador").textContent.replace("Jugador: ", "").trim();
    if (!nombre) {
        mostrarResultado("Por favor ingresa tu nombre antes de iniciar el juego.");
        return;
    }
    modalIniciar.hide();
    iniciarMusica(); // Iniciar la música cuando se empieza a jugar
});
//--------Modal de inicio---------






//--------Boton de agregar jugador---------
function nombreJugador() {
    let contenedor = document.getElementById("contenedorNombre");

    contenedor.innerHTML = "";

    let nombreUsuario = document.createElement("input");
    nombreUsuario.setAttribute("type", "text");
    nombreUsuario.setAttribute("id", "nombreUsuario");
    nombreUsuario.setAttribute("placeholder", "Ingresa tu nombre");
    nombreUsuario.classList.add("form-control", "mb-2");

    let botonAgregar = document.createElement("button");
    botonAgregar.setAttribute("id", "botonAgregar");
    botonAgregar.textContent = "Agregar";
    botonAgregar.classList.add("btn", "btn-primary", "w-100");

    botonAgregar.addEventListener("click", () => {
        let nombre = nombreUsuario.value.trim();
        
        if (nombre) {
            // Convertir a formato "Primera letra mayúscula, resto en minúsculas"
            nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase();

            mostrarResultado(`Bienvenido ${nombre}`);
            nombreUsuario.value = "";
            mostrarNombreJugador(nombre);
            reiniciarJuego(); 
        } else {
            mostrarResultado("Por favor ingresa tu nombre");
        }
    });

    contenedor.appendChild(nombreUsuario);
    contenedor.appendChild(botonAgregar);
}

function mostrarNombreJugador(nombre) {
    document.getElementById("nombreJugador").textContent = `Jugador: ${nombre}`;
}
//--------Boton de agregar jugador---------





//--------Tabla de puntajes---------
function agregarPuntaje(nombre, puntaje) {
    let tabla = document.getElementById("tablaPuntajes");
    let filas = tabla.getElementsByTagName("tr");

    let jugadorExistente = null;
    for (let fila of filas) {
        let celdaNombre = fila.getElementsByTagName("td")[0];
        if (celdaNombre && celdaNombre.textContent === nombre) {
            jugadorExistente = fila;
            break;
        }
    }

    if (jugadorExistente) {
        // Si el jugador existe, actualizar su puntaje
        let celdaPuntaje = jugadorExistente.getElementsByTagName("td")[1];
        celdaPuntaje.textContent = puntaje;
    } else {
        // Si el jugador no existe, agregar una nueva fila
        let fila = document.createElement("tr");

        let celdaNombre = document.createElement("td");
        celdaNombre.textContent = nombre;

        let celdaPuntaje = document.createElement("td");
        celdaPuntaje.textContent = puntaje;

        fila.appendChild(celdaNombre);
        fila.appendChild(celdaPuntaje);
        tabla.appendChild(fila);
    }

    // Guardar la tabla de puntuaciones en localStorage
    guardarPuntajesEnLocalStorage();
}

function guardarPuntajesEnLocalStorage() {
    let tabla = document.getElementById("tablaPuntajes");
    let filas = tabla.getElementsByTagName("tr");
    let puntajes = [];

    for (let fila of filas) {
        let celdaNombre = fila.getElementsByTagName("td")[0];
        let celdaPuntaje = fila.getElementsByTagName("td")[1];
        if (celdaNombre && celdaPuntaje) {
            puntajes.push({
                nombre: celdaNombre.textContent,
                puntaje: celdaPuntaje.textContent
            });
        }
    }

    localStorage.setItem("puntajes", JSON.stringify(puntajes));
}

function cargarPuntajesDesdeLocalStorage() {
    let puntajes = JSON.parse(localStorage.getItem("puntajes")) || [];
    let tabla = document.getElementById("tablaPuntajes");

    puntajes.forEach(puntaje => {
        let fila = document.createElement("tr");

        let celdaNombre = document.createElement("td");
        celdaNombre.textContent = puntaje.nombre;

        let celdaPuntaje = document.createElement("td");
        celdaPuntaje.textContent = puntaje.puntaje;

        fila.appendChild(celdaNombre);
        fila.appendChild(celdaPuntaje);
        tabla.appendChild(fila);
    });
}

// Llamar a la función para cargar los puntajes cuando la página se cargue
window.onload = cargarPuntajesDesdeLocalStorage;
//--------Tabla de puntajes---------





//--------Lógica del juego---------
let puntaje = 0;
let jugando = true;
let nombreJugadorActual = "";

function jugar(eleccionUsuario) {
    if (!jugando) return;

    const opciones = ["piedra", "papel", "tijera"];
    const eleccionComputadora = opciones[Math.floor(Math.random() * 3)];

    mostrarElecciones(eleccionUsuario, eleccionComputadora);

    setTimeout(() => {
        let resultado = "";

        if (eleccionUsuario === eleccionComputadora) {
            resultado = "¡Empate!";
        } else if (
            (eleccionUsuario === "piedra" && eleccionComputadora === "tijera") ||
            (eleccionUsuario === "papel" && eleccionComputadora === "piedra") ||
            (eleccionUsuario === "tijera" && eleccionComputadora === "papel")
        ) {
            puntaje++;
            resultado = `¡Ganaste! La computadora eligió ${eleccionComputadora}`;
            document.getElementById("contadorPuntaje").textContent = `Puntaje: ${puntaje}`;

            nombreJugadorActual = document.getElementById("nombreJugador").textContent.replace("Jugador: ", "").trim();
            agregarPuntaje(nombreJugadorActual, puntaje);
        } else {
            jugando = false;
            resultado = `¡Perdiste! La computadora eligió ${eleccionComputadora}`;

            mostrarResultado(resultado);

            setTimeout(() => {
                const modalContinuar = new bootstrap.Modal(document.getElementById("modalContinuar"), {
                    backdrop: "static",
                    keyboard: false
                });
                modalContinuar.show();

                document.getElementById("btnContinuarSi").addEventListener("click", () => {
                    reiniciarJuego();
                    modalContinuar.hide();
                });

                document.getElementById("btnContinuarNo").addEventListener("click", () => {
                    reiniciarJuego();
                    modalIniciar.show();
                    document.getElementById("nombreJugador").textContent = "Jugador: "; 
                    modalContinuar.hide();
                });
            }, 3000); 
        }

        mostrarResultado(resultado);
    }, 1000);
}

function mostrarResultado(mensaje) {
    const resultadoJuego = document.getElementById("resultadoJuego");
    resultadoJuego.textContent = mensaje;
    resultadoJuego.style.display = "block";

    setTimeout(() => {
        resultadoJuego.style.display = "none";
    }, 2000);
}

function reiniciarJuego() {
    puntaje = 0;
    jugando = true;
    document.getElementById("contadorPuntaje").textContent = `Puntaje: ${puntaje}`;
}

document.getElementById("piedra").addEventListener("click", () => jugar("piedra"));
document.getElementById("papel").addEventListener("click", () => jugar("papel"));
document.getElementById("tijera").addEventListener("click", () => jugar("tijera"));
//--------Lógica del juego---------





//--------contenedor de elecciones---------
function mostrarElecciones(eleccionUsuario, eleccionComputadora) {
    const contenedorElecciones = document.getElementById("contenedorElecciones");
    const eleccionUsuarioDiv = document.getElementById("eleccionUsuario");
    const eleccionComputadoraDiv = document.getElementById("eleccionComputadora");

    console.log(`Ruta usuario: Resources/${eleccionUsuario}.png`);
    console.log(`Ruta computadora: Resources/${eleccionComputadora}.png`);

    eleccionUsuarioDiv.innerHTML = `<img src="Resources/${eleccionUsuario}.png" alt="${eleccionUsuario}" width="200">`;
    eleccionComputadoraDiv.innerHTML = `<img src="Resources/${eleccionComputadora}.png" alt="${eleccionComputadora}" width="200">`;

    contenedorElecciones.style.display = "flex";

    setTimeout(() => {
        contenedorElecciones.style.display = "none";
    }, 1000);
}
//--------contenedor de elecciones---------
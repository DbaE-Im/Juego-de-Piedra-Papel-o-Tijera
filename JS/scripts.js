//--------Modal de inicio---------
let modalIniciar = new bootstrap.Modal(document.getElementById("modalIniciar"), {
    backdrop: "static",
    keyboard: false
});

modalIniciar.show();

document.getElementById("btnIniciarJuego").addEventListener("click", () => {
    let nombre = document.getElementById("nombreJugador").textContent.replace("Jugador: ", "").trim();
    if (!nombre) {
        alert("Por favor ingresa tu nombre antes de iniciar el juego.");
        return;
    }
    modalIniciar.hide();
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
            alert(`Bienvenido ${nombre}`);
            nombreUsuario.value = "";
            agregarPuntaje(nombre, 0);
            mostrarNombreJugador(nombre);
        } else {
            alert("Por favor ingresa tu nombre");
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
    let fila = document.createElement("tr");

    let celdaNombre = document.createElement("td");
    celdaNombre.textContent = nombre;

    let celdaPuntaje = document.createElement("td");
    celdaPuntaje.textContent = puntaje;

    fila.appendChild(celdaNombre);
    fila.appendChild(celdaPuntaje);
    tabla.appendChild(fila);
}
//--------Tabla de puntajes---------

//--------Lógica del juego---------
let puntaje = 0;
let jugando = true;

function jugar(eleccionUsuario) {
    if (!jugando) return;

    const opciones = ["piedra", "papel", "tijera"];
    const eleccionComputadora = opciones[Math.floor(Math.random() * 3)];

    // Mostrar elecciones
    mostrarElecciones(eleccionUsuario, eleccionComputadora);

    setTimeout(() => {
        if (eleccionUsuario === eleccionComputadora) {
            alert("Empate!");
        } else if (
            (eleccionUsuario === "piedra" && eleccionComputadora === "tijera") ||
            (eleccionUsuario === "papel" && eleccionComputadora === "piedra") ||
            (eleccionUsuario === "tijera" && eleccionComputadora === "papel")
        ) {
            puntaje++;
            document.getElementById("contadorPuntaje").textContent = `Puntaje: ${puntaje}`;
            alert(`Ganaste! La computadora eligió ${eleccionComputadora}`);
        } else {
            jugando = false;
            alert(`Perdiste! La computadora eligió ${eleccionComputadora}`);
            alert(`Juego terminado. Tu puntaje final es ${puntaje}`);

            // Preguntar si desea continuar
            if (confirm("¿Deseas continuar jugando?")) {
                reiniciarJuego();
            } else {
                modalIniciar.show();
            }
        }
    }, 1000); // Esperar 1 segundo antes de mostrar el resultado
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

    // Mostrar las imágenes correspondientes
    eleccionUsuarioDiv.innerHTML = `<img src="Resources/${eleccionUsuario}.png" alt="${eleccionUsuario}" width="200">`;
    eleccionComputadoraDiv.innerHTML = `<img src="Resources/${eleccionComputadora}.png" alt="${eleccionComputadora}" width="200">`;

    // Mostrar el contenedor de elecciones
    contenedorElecciones.style.display = "flex";

    // Ocultar el contenedor después de 1 segundo
    setTimeout(() => {
        contenedorElecciones.style.display = "none";
    }, 1000);
}
//--------contenedor de elecciones---------
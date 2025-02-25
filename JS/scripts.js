document.addEventListener("DOMContentLoaded", () => {
    // Obtener el modal de inicio
    let modalIniciar = new bootstrap.Modal(document.getElementById("modalIniciar"), {
        backdrop: "static",
        keyboard: false
    });

    // Mostrar el modal al cargar la página
    modalIniciar.show();

    // Cerrar el modal cuando el usuario haga clic en "Iniciar Juego"
    document.getElementById("btnIniciarJuego").addEventListener("click", () => {
        modalIniciar.hide();
    });
});

const opciones = ["piedra", "papel", "tijera"];

document.getElementById("piedra").addEventListener("click", () => jugar("piedra"));
document.getElementById("papel").addEventListener("click", () => jugar("papel"));
document.getElementById("tijera").addEventListener("click", () => jugar("tijera"));

function jugar(eleccionUsuario) {
    let eleccionPC = opciones[Math.floor(Math.random() * opciones.length)];
    let resultado = resultadoFinal(eleccionUsuario, eleccionPC);
    alert(`Tú elegiste: ${eleccionUsuario}\nLa computadora eligió: ${eleccionPC}\n${resultado}`);
}

function resultadoFinal(eleccionUsuario, eleccionPC) {
    if (eleccionUsuario === eleccionPC) {
        return "Empate";
    } else if (
        (eleccionUsuario === "piedra" && eleccionPC === "tijera") ||
        (eleccionUsuario === "papel" && eleccionPC === "piedra") ||
        (eleccionUsuario === "tijera" && eleccionPC === "papel")
    ) {
        return "Ganaste";
    } else {
        return "Perdiste";
    }
}

function nombreJugador() {
    let contenedor = document.getElementById("contenedorNombre");

    let nombreUsuario = document.createElement("input");
    nombreUsuario.setAttribute("type", "text");
    nombreUsuario.setAttribute("id", "nombreUsuario");
    nombreUsuario.setAttribute("placeholder", "Ingresa tu nombre");
    nombreUsuario.classList.add("form-control", "mb-2");

    let botonNombre = document.createElement("button");
    botonNombre.setAttribute("id", "botonNombre");
    botonNombre.textContent = "Ingresar";
    botonNombre.classList.add("btn", "btn-primary", "w-100");

    botonNombre.addEventListener("click", () => {
        let nombre = nombreUsuario.value.trim();
        if (nombre) {
            alert(`Bienvenido, ${nombre}!`);
        } else {
            alert("Por favor, ingresa un nombre válido.");
        }
    });

    contenedor.appendChild(nombreUsuario);
    contenedor.appendChild(botonNombre);
}

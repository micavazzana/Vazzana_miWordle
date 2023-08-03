//Este script maneja la lógica del display de las secciones por DOM.

const sectionJuego = document.getElementById("juego");
const sectionAjustes = document.getElementById("ajustes");
const sectionInfo = document.getElementById("info");
const sectionStats = document.getElementById("estadisticas");

document.getElementById("btn-ajustes").addEventListener("click", displayAjustes);
document.getElementById("btn-info").addEventListener("click", displayInfo);
document.getElementById("btn-stats").addEventListener("click", displayStats);
document.getElementById("cerrar-ajustes").addEventListener("click", displayJuego);
document.getElementById("cerrar-info").addEventListener("click", displayJuego);
document.getElementById("cerrar-estadisticas").addEventListener("click", displayJuego);
document.getElementById("jugar").addEventListener("click", displayJuego);

//Comienza mostrando como jugar
displayInfo();

/**
 * Muestra la sección Juego.
 * Oculta la sección Ajustes, Info y Estadisticas.
 */
function displayJuego() {
   sectionJuego.classList.add("mostrar");
   sectionJuego.classList.remove("ocultar");

   sectionAjustes.classList.add("ocultar");
   sectionAjustes.classList.remove("mostrar");

   sectionInfo.classList.add("ocultar");
   sectionInfo.classList.remove("mostrar");

   sectionStats.classList.add("ocultar");
   sectionStats.classList.remove("mostrar");
}

/**
 * Muestra la sección Ajustes.
 * Oculta la sección Juego, Info y Estadisticas.
 */
function displayAjustes() {
   sectionAjustes.classList.add("mostrar");
   sectionAjustes.classList.remove("ocultar");

   sectionInfo.classList.add("ocultar");
   sectionInfo.classList.remove("mostrar");

   sectionJuego.classList.add("ocultar");
   sectionJuego.classList.remove("mostrar");

   sectionStats.classList.add("ocultar");
   sectionStats.classList.remove("mostrar");
}

/**
 * Muestra la sección Info.
 * Oculta la sección Juego, Ajustes y Estadisticas.
 */
function displayInfo() {
   sectionInfo.classList.add("mostrar");
   sectionInfo.classList.remove("ocultar");

   sectionAjustes.classList.add("ocultar");
   sectionAjustes.classList.remove("mostrar");

   sectionJuego.classList.add("ocultar");
   sectionJuego.classList.remove("mostrar");

   sectionStats.classList.add("ocultar");
   sectionStats.classList.remove("mostrar");
}

/**
 * Muestra la sección Estadisticas.
 * Oculta la sección Juego, Ajustes e Info.
 */
function displayStats() {
   sectionStats.classList.add("mostrar");
   sectionStats.classList.remove("ocultar");

   sectionInfo.classList.add("ocultar");
   sectionInfo.classList.remove("mostrar");

   sectionAjustes.classList.add("ocultar");
   sectionAjustes.classList.remove("mostrar");

   sectionJuego.classList.add("ocultar");
   sectionJuego.classList.remove("mostrar");
}

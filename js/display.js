//Este script maneja la lógica del display de las secciones por DOM.

const sectionJuego = document.getElementById("juego");
const sectionAjustes = document.getElementById("ajustes");
const sectionInfo = document.getElementById("info");
const sectionStats = document.getElementById("estadisticas");

document.getElementById("btn-juego").addEventListener("click", displayJuego);
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
   sectionJuego.classList.remove("ocultar");
   sectionAjustes.classList.add("ocultar");
   sectionInfo.classList.add("ocultar");
   sectionStats.classList.add("ocultar");
}

/**
 * Muestra la sección Ajustes.
 * Oculta la sección Juego, Info y Estadisticas.
 */
function displayAjustes() {
   sectionAjustes.classList.remove("ocultar");
   sectionInfo.classList.add("ocultar");
   sectionJuego.classList.add("ocultar");
   sectionStats.classList.add("ocultar");
}

/**
 * Muestra la sección Info.
 * Oculta la sección Juego, Ajustes y Estadisticas.
 */
function displayInfo() {
   sectionInfo.classList.remove("ocultar");
   sectionAjustes.classList.add("ocultar");
   sectionJuego.classList.add("ocultar");
   sectionStats.classList.add("ocultar");
}

/**
 * Muestra la sección Estadisticas.
 * Oculta la sección Juego, Ajustes e Info.
 */
function displayStats() {
   sectionStats.classList.remove("ocultar");
   sectionInfo.classList.add("ocultar");
   sectionAjustes.classList.add("ocultar");
   sectionJuego.classList.add("ocultar");
}
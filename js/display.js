/********* Display de Ajustes, Info y Juego *********/

const sectionJuego = document.getElementById("juego");
const sectionAjustes = document.getElementById("ajustes");
const sectionInfo = document.getElementById("info");

document.getElementById("btn-ajustes").addEventListener("click", displayAjustes);
document.getElementById("btn-info").addEventListener("click", displayInfo);
document.getElementById("cerrar-ajustes").addEventListener("click", displayJuego);
document.getElementById("cerrar-info").addEventListener("click", displayJuego);

//Comienza mostrando como jugar y ocultando los ajustes y el juego
displayInfo();

/**
 * Muestra la sección Ajustes.
 * Oculta la sección Juego e Info.
 */
function displayAjustes() {
   sectionAjustes.classList.add("mostrar");
   sectionAjustes.classList.remove("ocultar");

   sectionInfo.classList.add("ocultar");
   sectionInfo.classList.remove("mostrar");

   sectionJuego.classList.add("ocultar");
   sectionJuego.classList.remove("mostrar");
}
/**
 * Muestra la sección Info.
 * Oculta la sección Juego y Ajustes.
 */
function displayInfo() {
   sectionInfo.classList.add("mostrar");
   sectionInfo.classList.remove("ocultar");

   sectionAjustes.classList.add("ocultar");
   sectionAjustes.classList.remove("mostrar");
   
   sectionJuego.classList.add("ocultar");
   sectionJuego.classList.remove("mostrar");
}
/**
 * Muestra la sección Juego.
 * Oculta la sección Ajustes e Info.
 */
function displayJuego() {
   sectionJuego.classList.add("mostrar");
   sectionJuego.classList.remove("ocultar");

   sectionAjustes.classList.add("ocultar");
   sectionAjustes.classList.remove("mostrar");

   sectionInfo.classList.add("ocultar");
   sectionInfo.classList.remove("mostrar");
}
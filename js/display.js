/********* Display de Ajustes, Info y Juego *********/

const sectionJuego = document.getElementById("juego");
const sectionAjustes = document.getElementById("ajustes");
const sectionInfo = document.getElementById("info");

document.getElementById("btn-ajustes").addEventListener("click", displayAjustes);
document.getElementById("btn-info").addEventListener("click", displayInfo);
document.getElementById("cerrar-ajustes").addEventListener("click", displayJuego);
document.getElementById("cerrar-info").addEventListener("click", displayJuego);

//Comienza mostrando el juego y ocultando los ajustes e info
displayJuego();

/**
 * Muestra la sección Ajustes.
 * Oculta la sección Juego e Info.
 */
function displayAjustes() {
   sectionAjustes.style.display = "";
   sectionJuego.style.display = "none";
   sectionInfo.style.display = "none";
}
/**
 * Muestra la sección Info.
 * Oculta la sección Juego y Ajustes.
 */
function displayInfo() {
   sectionInfo.style.display = "";
   sectionJuego.style.display = "none";
   sectionAjustes.style.display = "none";
}
/**
 * Muestra la sección Juego.
 * Oculta la sección Ajustes e Info.
 */
function displayJuego() {
   sectionJuego.style.display = "";
   sectionAjustes.style.display = "none";
   sectionInfo.style.display = "none";
}
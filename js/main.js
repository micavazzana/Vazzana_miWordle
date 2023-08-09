//Este script maneja la lógica del juego y la interacción con el DOM.

import { Estadisticas } from "./estadisticas.js";
import { Juego } from "./juego.js";
import { arrayPalabras } from "./palabra.js";

/************ Inicio del juego **********/
//El juego comienza con 4 letras por defecto
//Según el boton seleccionado se crearan los casilleros, iniciando el juego

let juego;
let btnSeleccionado = document.getElementById("btn4-letras");
const stats = new Estadisticas();

iniciarJuego(btnSeleccionado);

//Creo una lista de todos los nodos boton. Agrego un escuchador para cada boton.
//Segun el boton inicio un nuevo juego con ese boton
const listBtn = document.querySelectorAll(".btns button");
listBtn.forEach((btn) =>
   btn.addEventListener("click", () => {
      iniciarJuego(btn);
   })
);

//Suscribo la función "procesarTeclaPresionada" al evento keydown.
window.addEventListener("keydown", procesarTeclaPresionada);

//Si quiere volver a jugar, inicia un nuevo juego
document.getElementById("reiniciar").addEventListener("click", () => iniciarJuego(btnSeleccionado));

//Si quiere reiniciar los stats:
document.getElementById("reset").addEventListener("click", stats.resetStats);

/********** Funciones **********/

/**
 * Crea los casilleros segun la cantidad de letras elegida.
 * @param {number} cantidad - La cantidad de letras elegidas.
 */
function crearCasilleros(cantidad) {
   //Borro lo que hay en el inner del contenedor para crear los casilleros que corresponden
   //Reseteo las variables que manejan los casilleros y los numeros de fila cada vez
   const contenedor = document.getElementById("contenedor-filas");
   contenedor.innerHTML = "";
   juego.init();

   //Creo las filas segun la cantidad de intentos del juego
   for (let i = 0; i < juego.intentos; i++) {
      //Creo un div para cada fila
      const divFila = document.createElement("div");
      divFila.classList.add("fila", "centrar");
      divFila.setAttribute("id", `fila${i + 1}`);

      //Creo los casilleros segun la cantidad de letras elegida
      for (let j = 0; j < cantidad; j++) {
         const div = document.createElement("div");
         div.classList.add("casillero", "centrar", "bordes-botones");
         divFila.appendChild(div);
      }
      contenedor.appendChild(divFila); //Apendeo cada fila al contenedor
   }
}

/**
 * Cambia el estilo del boton seleccionado que establece con qué cantidad de letras se está jugando.
 * @param {node} boton - Elemento nodo del DOM. Representa un botón.
 */
function cambiarEstiloBotonSeleccionado(boton) {
   const listaBtn = document.querySelectorAll(".btns button");
   listaBtn.forEach((btn) => {
      //Si el boton es el seleccionado le añado la clase "seleccionado"
      if (btn == boton) btn.classList.add("seleccionado");
      //Sino remuevo de todos los botones la clase para que no queden coloreados en la siguiente eleccion.
      else btn.classList.remove("seleccionado");
   });
}

/**
 * Función que se suscribe al evento "keydown".
 * Se ocupa de obtener lo que el usuario teclea y colocarlo dentro de los casilleros.
 * Si el usuario escribe se ocupará de incrementar los indices validando que no quede fuera del rango,
 * si borra tambien validará lo mismo. Por otra parte también valida que lo ingresado sean letras válidas.
 * @param {Object} event - Objeto event que tiene la información del evento que ocurrió. En este caso la tecla presionada.
 */
function procesarTeclaPresionada(event) {
   if (juego.juegoActivo) {
      //Obtengo la fila correspondiente a ser jugada
      const fila = document.getElementById(`fila${juego.numeroFila}`);
      const casilleros = fila.children; //me guardo los hijos nodo de la fila, los casilleros

      //Si el usuario decide borrar
      if (event.key == "Backspace" || event.key == "Delete") {
         //Chequeo que el indice no sea negativo
         if (juego.index > 0) {
            juego.index--;
            const casillero = casilleros[juego.index];
            casillero.textContent = "";
            casillero.classList.remove("escrito");
            mostrarNotificacion("");
         }
      }
      //Si por el contrario escribe
      else {
         //Chequeo que el indice no sean mayor a la cantidad de casilleros y que lo que ingresa el usuario sea valido
         if (juego.index < casilleros.length && esLetraValida(event.key)) {
            const casillero = casilleros[juego.index];
            casillero.textContent = event.key.toUpperCase();
            juego.index++;
            casillero.classList.add("escrito");
         }
         //Chequeo si termino de escribir y quiere probar la palabra
         if (casilleros.length == juego.index && event.key == "Enter") {
            chequearPalabra(casilleros);
         }
      }
   }
}

/**
 * Verifica si la letra ingresada es una letra
 * @param {*} letra - Letra a verificar
 * @returns True si la letra es válida, False caso contrario
 */
function esLetraValida(letra) {
   return ((letra.length == 1 &&
         ((letra >= "a" && letra <= "z") || (letra >= "A" && letra <= "Z"))) 
         || letra == "ñ" || letra == "Ñ");
}

/**
 * Controla que la palabra exista,
 * cambia el estilo de los casilleros segun si la letra es correcta o no
 * y controla el estado del juego.
 * @param {HTMLCollection} casilleros
 */
function chequearPalabra(casilleros) {
   //Construyo la palabra a partir de los casilleros para poder verificarla
   const palabra = Array.from(casilleros).reduce(
      (char, casillero) => char + casillero.textContent,"");

   //Si la palabra existe es una palabra válida
   if (verificarPalabra(palabra)) {
      for (let i = 0; i < juego.palabra.length; i++) {
         casilleros[i].classList.add("palabra-jugada");

         //Si la letra esta en el indice correcto
         if (casilleros[i].textContent == juego.palabra[i])
            casilleros[i].classList.add("caliente");
         //Si no esta en el indice correcto pero la letra existe en la palabra
         else if (juego.palabra.includes(casilleros[i].textContent))
            casilleros[i].classList.add("tibio");
         //Si no existe la letra en la palabra
         else casilleros[i].classList.add("frio");
      }
      //Cambio de fila y vuelvo al casillero 0
      juego.numeroFila++;
      juego.index = 0;

      //Por cada palabra que se prueba controlo el estado del juego
      controlEstadoJuego(palabra);
   } else {
      mostrarNotificacion("Palabra no encontrada. Intenta con otra.");
   }
}

/**
 * Verifica que la palabra exista, siendo una palabra válida.
 * @param {string} palabra - Palabra a verificar
 * @returns {bool} True si la palabra es válida, False caso contrario
 */
function verificarPalabra(palabra) {
   for (const p of arrayPalabras) {
      if (p.palabra == palabra) {
         return true;
      }
   }
   return false;
}

/**
 * Controla el estado del juego. Se fija si ganó o si perdió.
 * Envia notificaciones al DOM, en caso de ganar o perder incrementa la cantidad de juegos jugados,
 * juegos ganados y juegos perdidos y desactiva el juego.
 * Por ultimo actualiza los stats.
 * @param {string} palabra - Palabra que esta siendo probada
 */
function controlEstadoJuego(palabra) {
   let estadoJuego = juego.estadoJuego(palabra);
   if (estadoJuego == "Win") {
      mostrarNotificacion("Ganaste");
      stats.juegosJugados++;
      stats.juegosGanados++;
      juego.juegoActivo = false;
   } else if (estadoJuego == "Fail") {
      mostrarNotificacion("Perdiste");
      stats.juegosJugados++;
      stats.juegosPerdidos++;
      juego.juegoActivo = false;
   }
   stats.guardarStats();
}

/**
 * Se ocupa de instanciar un nuevo juego.
 * Comienza el juego según la cantidad de letras elegida.
 * @param {number} cantidad - Cantidad de letras que tendrá la palabra
 */
function instanciarJuego(array, cantidad) {
   const arrElegido = filtrarPalabras(array, cantidad);
   //Consigo un indice aleatorio del array para construir un nuevo juego con esa palabra
   let indiceAleatorio = Math.floor(Math.random() * arrElegido.length);
   //Instancio el juego con la palabra elegida
   return new Juego(arrElegido[indiceAleatorio]);
}

/**
 * Realiza un filtrado del array de objetos palabra segun la cantidad de letras que se elige
 * Filtra por cantidad y luego transforma el array de objetos palabra en un array de su propiedad palabra
 * @param {number} cantidad - La cantidad de letras
 * @param {Array} array - El array de palabras que filtrara
 * @returns un nuevo array de palabras con la cantidad de letras elegida
 */
function filtrarPalabras(array, cantidad) {
   return array
      .filter((elemento) => elemento.palabra.length == cantidad)
      .map((elemento) => elemento.palabra);
}

/**
 * Se ocupa de iniciar el juego.
 * Obtiene la cantidad del boton seleccionado.
 * Limpia el contenedor que notifica el estado del juego.
 * Crea el juego y los casilleros
 * Actualiza las variables que contienen las estadisticas del juego
 */
function iniciarJuego(btn) {
   //Obtengo la cantidad de casilleros a crear desde el atributo cantidad que estableci en el html
   let cantidad = parseInt(btn.getAttribute("cantidad"));
   //Intancio el juego segun la cantidad de letras que se eligio
   juego = instanciarJuego(arrayPalabras, cantidad);
   //Limpio el contenedor de mensajes
   mostrarNotificacion("");
   //Creo casilleros y coloreo el botón que determina con qué cantidad de letras estamos jugando
   crearCasilleros(cantidad);
   cambiarEstiloBotonSeleccionado(btn);
   //Actualizo los stats guardados en el local storage
   stats.actualizarStats();
   btnSeleccionado = btn;
}

/**
 * Coloca un mensaje en un contenedor div del HTML.
 * @param {string} mensaje - Mensaje a mostrar
 */
function mostrarNotificacion(mensaje) {
   const contenedor = document.querySelector(".notificacion");
   contenedor.textContent = mensaje;
}
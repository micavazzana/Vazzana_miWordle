import { Juego } from "./juego.js";

/************ Manejo del juego **********/
let juego;

//Incorporo un json
const arrayPalabras = cargarJson();

//Creo una lista de todos los nodos boton. Agrego un escuchador para cada boton.
//Según el boton seleccionado sera la cantidad de letras elegidas. A partir de estas se crearan los casilleros
const listBtn = document.querySelectorAll(".cant-letras button");
listBtn.forEach((btn) =>
   btn.addEventListener("click", () => {
      //Obtengo la cantidad de casilleros a crear desde el atributo cantidad que estableci en el html
      let cantidad = parseInt(btn.getAttribute("cantidad"));
      //Intancio el juego segun la cantidad de letras que se eligio
      comenzarJuego(arrayPalabras, cantidad);
      mostrarNotificacion("");
      crearCasilleros(cantidad);
      cambiarEstiloBotonSeleccionado(btn);
   })
);

iniciarJuego();

//Suscribo la función "procesarTeclaPresionada" al evento keydown.
window.addEventListener("keydown", procesarTeclaPresionada);

//Si quiere volver a jugar, inicia un nuevo juego
document.querySelector(".replay").addEventListener("click", iniciarJuego);



/********** Funciones de casilleros **********/

/**
 * Se ocupa de crear los casilleros segun la cantidad de letras elegida.
 * @param {number} cantidad - La cantidad de letras elegidas.
 */
function crearCasilleros(cantidad) {
   //Borro lo que hay en el inner del contenedor para crear los casilleros que corresponden
   //Reseteo las variables que manejan los casilleros y los numeros de fila cada vez
   const contenedor = document.querySelector(".contenedor-filas");
   contenedor.innerHTML = "";
   juego.init();

   //Creo las filas segun la cantidad de intentos del juego
   for (let i = 0; i < juego.intentos; i++) {
      //Creo un div para cada fila
      const divFila = document.createElement("div");
      divFila.className = "fila centrar";
      divFila.setAttribute("id", `fila${i + 1}`);

      //Creo los casilleros segun la cantidad de letras elegida
      for (let j = 0; j < cantidad; j++) {
         const div = document.createElement("div");
         div.className = "casillero centrar";
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
   const listaBtn = document.querySelectorAll(".cant-letras button");
   listaBtn.forEach((btn) => {
      //Si el boton es el seleccionado le añado la clase "seleccionado"
      if (btn == boton) btn.classList.add("seleccionado");
      //Sino remuevo de todos los botones la clase para que no queden coloreados en la siguiente eleccion.
      else btn.classList.remove("seleccionado");
   });
}

/********** Funcion que maneja el input del jugador **********/

/**
 * Función que se suscribe al evento "keydown".
 * Se ocupará de obtener lo que el usuario teclea y colocarlo dentro de los casilleros.
 * Si el usuario escribe se ocupará de incrementar los indices validando que no quede fuera del rango,
 * por el contrario si borra tambien validará lo mismo. Por otra parte también valida que lo ingresado sean letras válidas.
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
         if ((juego.index < casilleros.length && event.key >= "a" && event.key <= "z") || event.key == "ñ") {
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

/********** Funciones de palabras **********/

/**
 * Controla que la palabra exista
 * Cambia el estilo de los casilleros segun si la letra es correcta o no
 * Controla el estado del juego
 * @param {HTMLCollection} casilleros
 */
function chequearPalabra(casilleros) {
   //Construyo la palabra a partir de los casilleros para poder verificarla
   const palabra = Array.from(casilleros).reduce(
      (char, casillero) => char + casillero.textContent,
      ""
   );

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
 * Verifica que la palabra exista siendo una palabra válida.
 * @param {string} palabra - Palabra a verificar
 * @returns {bool} True si la palabra es válida, False caso contrario
 */
function verificarPalabra(palabra) {
   for (const p of arrayPalabras) {
      if (p.toUpperCase() == palabra) {
         return true;
      }
   }
   return false;
}

/********** Funciones que controlan el juego **********/

/**
 * Controla el estado del juego. Se fija si gano o si perdio.
 * Envia notificaciones al dom y desactiva el juego.
 * @param {string} palabra - Palabra que esta siendo probada
 */
function controlEstadoJuego(palabra) {
   let estadoJuego = juego.estadoJuego(palabra);
   if (estadoJuego == "Win") {
      mostrarNotificacion("Ganaste");
      juego.juegoActivo = false;
   } else if (estadoJuego == "Fail") {
      mostrarNotificacion("Perdiste");
      juego.juegoActivo = false;
   }
}

/**
 * Se ocupa de instanciar un nuevo juego.
 * Comienza el juego según la cantidad de letras elegida.
 * @param {number} cantidad - Cantidad de letras que tendrá la palabra
 */
function comenzarJuego(array, cantidad) {
   const arrElegido = filtrarPalabras(array, cantidad);
   //Consigo un indice aleatorio del array para construir un nuevo juego con esa palabra
   let indiceAleatorio = Math.floor(Math.random() * arrElegido.length);
   //Instancio el juego con la palabra elegida
   juego = new Juego(arrElegido[indiceAleatorio]);
}

/**
 * Realiza un filtrado del array de palabras segun la cantidad de letras que se elige
 * @param {number} cantidad - La cantidad de letras
 * @param {Array} array - El array de palabras que filtrara
 * @returns un nuevo array de palabras con la cantidad de letras elegida
 */
function filtrarPalabras(array, cantidad) {
   return array.filter((elemento) => {
      return elemento.length == cantidad;
   });
}

/**
 * Se ocupa de iniciar el juego
 * Comienza con 4 letras por default.
 */
function iniciarJuego() {
   const btn4Letras = document.getElementById("btn4-letras");
   mostrarNotificacion("");
   comenzarJuego(arrayPalabras, 4);
   crearCasilleros.call(btn4Letras, 4);
   cambiarEstiloBotonSeleccionado(btn4Letras);
}

/**
 * Coloca un mensaje en un contenedor div del html
 * @param {string} mensaje - Mensaje a mostrar
 */
function mostrarNotificacion(mensaje) {
   const contenedor = document.querySelector(".notificacion");
   contenedor.textContent = mensaje;
}

/**
 *
 * @returns
 */
function cargarJson() {
   return [
      "Naranja",
      "Manzana",
      "Coco",
      "Perro",
      "Gato",
      "Libro",
      "Chocolate",
      "Piano",
      "Guitarra",
      "Pintura",
      "Elefante",
      "Raton",
      "Estrella",
      "Luna",
      "Pepino",
      "Whisky",
      "Atenta",
      "Flacido",
      "Ataque",
   ];
}
class Juego {
   palabra;
   intentos;

   /**
    * Constructor.
    * Inicializa la palabra y define la cantidad de intentos del juego
    * @param {string} palabra - palabra que inicializara el atributo del objeto
    */
   constructor(palabra) {
      this.palabra = palabra.toUpperCase();
      this.intentos = 6;
   }

   /**
    * Controla el estado del juego. Su estado por defecto es "Continue".
    * Cambia su estado al terminar.
    * Se termina porque se ha adivinado la palabra o porque se han acabado la cantidad de intentos.
    * @param {string} palabra - La palabra ingresada por el usuario
    * @returns {string} - El estado actual del juego ("Continue", "Fail" o "Win")
    */
   estadoJuego(palabra) {
      let retorno = "Continue";
      //Si la palabra no se adivino
      if (this.palabra != palabra) {
         this.intentos--;
      }
      //Si se acabaron los intentos
      if (this.intentos == 0) {
         retorno = "Fail";
      } //Si se encontro la palabra antes de acabar los intentos
      else if (this.palabra == palabra) {
         retorno = "Win";
      }
      return retorno;
   }
}

//Variables globales que manejaran los indices de los casilleros, los numeros de fila y el juego
let index = 0;
let numeroFila = 1;
let juego;
let juegoActivo = true;

//Incorporo un json
const arrayPalabras = cargarJson();

/********** Funciones de casilleros **********/

/**
 * Se ocupa de crear los casilleros segun la cantidad de letras elegida.
 * Internamente ademas de crear los casilleros se ocupa de intanciar el juego
 * y cambiar el estilo del botón seleccionado que establece con qué cantidad de letras se está jugando.
 */
function crearCasilleros() {
   //Obtengo la cantidad de casilleros a crear desde el atributo cantidad que estableci en el html
   let cantidad = parseInt(this.getAttribute("cantidad"));
   comenzarJuego(arrayPalabras, cantidad); //Intancio el juego segun la cantidad de letras que se eligio

   //Borro lo que hay en el inner del contenedor para crear los casilleros que corresponden
   //Reseteo el indice que manejara los casilleros, los numeros de fila y el juego cada vez
   const contenedor = document.querySelector(".contenedor-filas");
   contenedor.innerHTML = "";
   index = 0;
   numeroFila = 1;
   juegoActivo = true;

   //Creo las filas segun la cantidad de intentos del juego
   for (let i = 0; i < 6; i++) {
      //Creo un div para cada fila
      const divFila = document.createElement("div");
      divFila.className = "fila centrar";
      divFila.setAttribute("id", "fila" + (i + 1));

      //Creo los casilleros segun la cantidad de letras elegida
      for (let j = 0; j < cantidad; j++) {
         const div = document.createElement("div");
         div.className = "casillero centrar";
         divFila.appendChild(div);
      }
      contenedor.appendChild(divFila); //Apendeo cada fila al contenedor
   }
   cambiarEstiloBotonSeleccionado(this);
}

/**
 * Cambia el estilo del boton seleccionado
 * @param {node} boton - Elemento nodo del DOM. Representa un botón.
 */
function cambiarEstiloBotonSeleccionado(boton) {
   listBtn.forEach((btn) => {
      //Si el boton es el seleccionado le añado la clase "seleccionado"
      if (btn == boton) btn.classList.add("seleccionado");
      //Sino remuevo de todos los botones la clase para que no queden coloreados en la siguiente eleccion.
      else btn.classList.remove("seleccionado");
   });
}

/********** Funciones de palabras **********/

/**
 * Controla que la palabra exista
 * Cambia el estilo de los casilleros segun si la letra es correcta o no
 * @param {HTMLCollection} casilleros
 */
function chequearPalabra(casilleros) {
   //Construyo la palabra a partir de los casilleros
   const palabra = Array.from(casilleros).reduce(
      (char, casillero) => char + casillero.textContent,"");

   //Si la palabra existe en el array
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
      numeroFila++;
      index = 0;

      //Por cada palabra que se prueba controlo el estado del juego
      controlEstadoJuego(palabra);
   } else {
      mostrarNotificacion("Palabra no encontrada. Intenta con otra.");
   }
}

/**
 * Verifica que la palabra exista en el array siendo una palabra válida.
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
 * Controla el estado del juego. Se fija si gano o si perdio.
 * Envia notificaciones al dom y desactiva el juego.
 * @param {string} palabra - Palabra que esta siendo probada
 */
function controlEstadoJuego(palabra) {
   let estadoJuego = juego.estadoJuego(palabra);
   if (estadoJuego == "Win") {
      mostrarNotificacion("Ganaste");
      juegoActivo = false;
   } else if (estadoJuego == "Fail") {
      mostrarNotificacion("Perdiste");
      juegoActivo = false;
   }
}

/**
 * Se ocupa de iniciar el juego
 * Comienza con 4 letras por default.
 */
function iniciarJuego() {
   mostrarNotificacion("");
   const btn4Letras = document.getElementById("btn4-letras");
   //Crear casilleros se ocupara de instanciar el juego.
   crearCasilleros.call(btn4Letras);
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
   if (juegoActivo) {
      //Obtengo la fila correspondiente a ser jugada
      const fila = document.getElementById(`fila${numeroFila}`);
      const casilleros = fila.children; //me guardo los hijos nodo de la fila, los casilleros

      //Si el usuario decide borrar
      if (event.key == "Backspace" || event.key == "Delete") {
         //Chequeo que el indice no sea negativo
         if (index > 0) {
            index--;
            const casillero = casilleros[index];
            casillero.textContent = "";
            casillero.classList.remove("escrito");
         }
      }
      //Si por el contrario escribe
      else {
         //Chequeo que el indice no sean mayor a la cantidad de casilleros y que lo que ingresa el usuario sea valido
         if (
            (index < casilleros.length &&
               event.key >= "a" &&
               event.key <= "z") ||
            event.key == "ñ"
         ) {
            const casillero = casilleros[index];
            casillero.textContent = event.key.toUpperCase();
            index++;
            casillero.classList.add("escrito");
         }
         //Chequeo si termino de escribir y quiere probar la palabra
         if (casilleros.length == index && event.key == "Enter") {
            chequearPalabra(casilleros);
         }
      }
   }
}

/********** Funcion que maneja las notificaciones del juego **********/

/**
 * Coloca un mensaje en el html
 * @param {string} str - Mensaje a mostrar
 */
function mostrarNotificacion(str) {
   const contenedor = document.querySelector(".notificacion");
   contenedor.textContent = str;
}

/********** Funcion que incorpora un json **********/
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

/************ Comienzo del juego **********/

//Creo una lista de todos los nodos boton. Agrego un escuchador para cada boton.
//Según el boton seleccionado sera la cantidad de letras elegidas. A partir de estas se crearan los casilleros
const listBtn = document.querySelectorAll(".cant-letras button");
listBtn.forEach((btn) => btn.addEventListener("click", crearCasilleros));

iniciarJuego();

//Suscribo la función "procesarTeclaPresionada" al evento keydown.
window.addEventListener("keydown", procesarTeclaPresionada);

//Si quiere volver a jugar, inicia un nuevo juego
document.querySelector(".replay").addEventListener("click", iniciarJuego);

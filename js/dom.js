/**
* Clase juego
* Maneja la logica del juego
* Controla la interaccion entre las distintas clases
*/
class Juego{

   palabra;
   intentos;

   /**
    * Constructor.
    * El tablero se inicializara con el largo de la palabra
    * @param {string} palabra - palabra que inicializara el atributo del objeto
    */
   constructor(palabra){
       this.palabra = palabra.toUpperCase();
       this.intentos = 6;
   }

   /**
    * Controla el estado del juego. Su estado por defecto es "Continue".
    * Cambia su estado al terminar.
    * Se termina porque se han adivinado las letras o porque se han acabado la cantidad de intentos.
    * @returns
    */
   estadoJuego(palabra){
      let retorno;
      if(this.palabra !=palabra){
         this.intentos--;
         retorno = "Continue";
      }
      if(this.intentos == 0)
      {
         retorno = "Fail";
      }
      else if(this.palabra == palabra)
      {
         retorno = "Win";
      }
      return retorno;
   }
}

//Incorporo un json
const arrayPalabras = ["Naranja","Manzana","Coco","Perro","Gato","Computadora","Libro","Chocolate","Piano","Guitarra","Pintura","Elefante","Raton","Estrella","Luna","Pepino","Whisky","Atenta","Flacido","Ataque"];

/*********************************** */
const sectionJuego = document.getElementById("juego");
const sectionAjustes = document.getElementById("ajustes");
const sectionInfo = document.getElementById("info");

document.getElementById("btn-ajustes").addEventListener("click", displayAjustes);
document.getElementById("btn-info").addEventListener("click", displayInfo);
document.getElementById("cerrar-ajustes").addEventListener("click", displayJuego);
document.getElementById("cerrar-info").addEventListener("click", displayJuego);

/********* Display de Ajustes, Info y Juego *********/
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

/************** Control de Casilleros *****************/
var juego;

//Variables que manejaran los indices de los casilleros y los numeros de fila
let index = 0;
let numeroFila = 1;

//Creo una lista de todos los nodos boton. Agrego un escuchador para cada boton.
//Según el boton seleccionado sera la cantidad de letras elegidas. A partir de estas se crearan los casilleros
const listBtn = document.querySelectorAll(".cant-letras button");
listBtn.forEach((btn) => btn.addEventListener("click", crearCasilleros));

//El juego arranca predefinidamente con 4 letras:
const btn4Letras = document.getElementById("btn4-letras");
crearCasilleros.call(btn4Letras);

//Suscribo la función "procesarTeclaPresionada" al evento keydown.
window.addEventListener("keydown", procesarTeclaPresionada);

/**
 * Se ocupa de crear los casilleros segun la cantidad de letras elegida.
 * Internamente ademas de crear los casilleros se ocupa de cambiar el estilo del botón seleccionado
 */
function crearCasilleros() {
   //Obtengo la cantidad de casilleros a crear desde el atributo cantidad que estableci en el html
   cantidad = parseInt(this.getAttribute("cantidad"));
   comenzarJuego(cantidad);
   
   console.log(juego.palabra);
   //Borro lo que hay en el inner del contenedor para crear los casilleros que corresponden cada vez
   const contenedor = document.querySelector(".contenedor-filas");
   contenedor.innerHTML = "";
   //Reseteo el indice que manejara los casilleros esten en 0 cada vez
   index = 0;
   numeroFila = 1;

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
      if (btn == boton)
         btn.classList.add("seleccionado");
      //Sino remuevo de todos los botones la clase para que no queden coloreados en la siguiente eleccion.
      else
         btn.classList.remove("seleccionado");
   });
}

/**
 * Función que se suscribe al evento "keydown".
 * Se ocupará de obtener lo que el usuario teclea y colocarlo dentro de los casilleros.
 * Si el usuario escribe se ocupará de incrementar los indices validando que no quede fuera del rango,
 * por el contrario si borra tambien validará lo mismo. Por otra parte también valida que lo ingresado sean letras válidas.
 * @param {Object} event - Objeto event que tiene la información del evento que ocurrió. En este caso la tecla presionada.
 */
function procesarTeclaPresionada(event) {
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
      if (index < casilleros.length && (event.key >= "a" && event.key <= "z") || event.key == "ñ") {
         const casillero = casilleros[index];
         casillero.textContent = event.key.toUpperCase();
         index++;
         casillero.classList.add("escrito");
      }
      //Chequeo si termino de escribir y quiere probar la palabra
      if (casilleros.length == index && event.key == "Enter") {
         chequearPalabra(casilleros);
          //Fijarme de controlar que si llega a 6 se acabaron los intentos
      }
   }
}

/**
 * Controla que la palabra exista
 * @param {HTMLCollection} casilleros
 */
function chequearPalabra(casilleros) {
   
   let palabra = "";
   for (const div of casilleros) {
      palabra += div.textContent;
   }

   if(verificarPalabra(palabra))
   {
      for(let i = 0; i < juego.palabra.length; i++)
      {
         casilleros[i].classList.add("palabra-jugada");
   
         if(casilleros[i].textContent == juego.palabra[i])
         {
            casilleros[i].classList.add("caliente");
         }
         else if(juego.palabra.includes(casilleros[i].textContent))
         {
            casilleros[i].classList.add("tibio");
         }
         else {
            casilleros[i].classList.add("frio");
         }
      }
      numeroFila++;
      index = 0;
      let estadoJuego = juego.estadoJuego(palabra);
      if(estadoJuego == "Win")
      {
         console.log("Ganaste");
      }
      else if(estadoJuego == "Fail")
         console.log("Perdiste");
      else
      console.log("Te quedan " + juego.intentos + " intentos");
      
   }
   else {
      console.log("palabra no existe");
      //ejecuto animacion y alerto "palabra no encontrada"
   }
}

/**
 * Chequea que la palabra exista en el array
 * @param {*} palabra 
 * @returns 
 */
function verificarPalabra(palabra){
   const arrAux = arrayPalabras.map((p)=>p.toUpperCase())
   return arrAux.includes(palabra);
}


function elegirArray(cantidad){
   switch(cantidad){
      case 4:
         return arrayPalabras.filter((elemento)=>{
            return elemento.length == 4;
         })

      case 5:
         return arrayPalabras.filter((elemento)=>{
            return elemento.length == 5;
         })
         
      case 6:
         return arrayPalabras.filter((elemento)=>{
            return elemento.length == 6;
         })
         
      case 7:
         return arrayPalabras.filter((elemento)=>{
            return elemento.length == 7;
         })
      
      case 8:
         return arrayPalabras.filter((elemento)=>{
            return elemento.length == 8;
         })
   }
}

function comenzarJuego(cantidad){
   const arrElegido = elegirArray(cantidad);
   //Consigo un indice aleatorio del array para construir un nuevo juego con esa palabra
   let indiceAleatorio = Math.floor(Math.random() * arrElegido.length);
   //Instancio el juego con la palabra elegida
   juego = new Juego(arrElegido[indiceAleatorio]);
}
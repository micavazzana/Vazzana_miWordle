//Este script contiene la clase Juego
export class Juego {
   palabra;
   intentos;
   index;
   numeroFila;
   juegoActivo;

   /**
    * Constructor.
    * Inicializa la palabra y define la cantidad de intentos del juego
    * @param {string} palabra - palabra que inicializara el atributo del objeto
    */
   constructor(palabra) {
      this.palabra = palabra.toUpperCase();
      this.intentos = 6;
      this.init();
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

   init() {
      this.index = 0;
      this.numeroFila = 1;
      this.juegoActivo = true;
   }
}

export class Estadisticas {
   juegosJugados;
   juegosGanados;
   juegosPerdidos;

   constructor() {
      this.juegosJugados = localStorage.getItem("juegosJugados") || 0;
      this.juegosGanados = localStorage.getItem("juegosGanados") || 0;
      this.juegosPerdidos = localStorage.getItem("juegosPerdidos") || 0;
   }

   /**
    * Actualiza el valor de los stats mostrados en el DOM de juegos jugados, ganados y perdidos
    */
   actualizarStats() {
      document.getElementById("juegos-jugados").textContent =
         this.juegosJugados;
      document.getElementById("juegos-ganados").textContent =
         this.juegosGanados;
      document.getElementById("juegos-perdidos").textContent =
         this.juegosPerdidos;
   }

   /**
    * Guarda en el local storage la cantidad de juegos jugados, ganados y perdidos
    */
   guardarStats() {
      localStorage.setItem("juegosJugados", this.juegosJugados);
      localStorage.setItem("juegosGanados", this.juegosGanados);
      localStorage.setItem("juegosPerdidos", this.juegosPerdidos);
   }

   /**
    * Resetea las variables que contabilizan los juegos jugados, ganados y perdidos,
    * borra lo que se encuentra almacenado en el local storage y actualiza el contenido mostrado por DOM
    */
   resetStats = () => {
      localStorage.clear();
      this.juegosJugados = 0;
      this.juegosGanados = 0;
      this.juegosPerdidos = 0;
      this.guardarStats();
      this.actualizarStats();
   };
}

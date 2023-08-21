//Este script contiene la clase Palabra y construye un array de objetos palabra

class Palabra {
   palabra;
   constructor(palabra) {
      this.palabra = palabra;
   }
}
const arrayPalabras = [];

//Carga desde un archivo json local las palabras. 
//La unica propiedad del objeto json es una array palabras
const cargarPalabras = async () => {
   const resp = await fetch("data/palabras.json");
   const data = await resp.json();

   //Luego de obtener el archivo y parsearlo cargo mi array haciendo que por cada palabra del array instancie un nuevo objeto Palabra
   arrayPalabras.push(...data.palabras.map((palabra) => new Palabra(palabra.toUpperCase()))
   );
};

//Espero a terminar de cargarlo para luego exportarlo
await cargarPalabras();
export { arrayPalabras }; //Exporto el array de objetos palabra
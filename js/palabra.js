//Este script contiene la clase Palabra y construye un array de objetos palabra

class Palabra {
   palabra;
   constructor(palabra) {
      this.palabra = palabra;
   }
}

const arrayPalabras = [];

// const cargarPalabras = async() => {
//    const resp = await fetch("../data/palabras.json");
//    const data = await resp.json();
//    arrayPalabras.push(...data.palabras.map(palabra => new Palabra(palabra.toUpperCase())))
// }
// cargarPalabras();

// function cargarPalabras(){
//    return fetch("../data/nuevo.json").then(response => response.json());
// }
// cargarPalabras().then(data => {
//    arrayPalabras.push(...data.map(elemento => new Palabra(elemento.palabra.toUpperCase())))
// })

const cargarPalabras = async() => {
   const resp = await fetch("../data/nuevo.json");
   const data = await resp.json();
   arrayPalabras.push(...data.map(elemento => new Palabra(elemento.toUpperCase())));
   console.log(resp);
}
cargarPalabras();

export { arrayPalabras }; //Exporto el array de objetos palabra















//Entrega anterior:
// const data = JSON.parse(
//    '{"palabras":["abaa","ababol","abaca","abacal","abacera","abaceria","abacero","abacial","abaco","abacora","abacorar","abad","abada","abadejo","abadenga","abadengo","abadesa","abadi","abadia","abadiado","abadiato","aeterno","abajar","abaje\u00F1a","abaje\u00F1o","abajera","abajo","abakua","abalada"]}'
// );
// arrayPalabras.push(...data.palabras.map(palabra => new Palabra(palabra.toUpperCase())))
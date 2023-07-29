//Juego: AHORCADO

/**
 * Clase Palabra
 * Representa la palabra que se va a adivinar
 * Internamente verifica si la letra existe en la palabra
 */
class Palabra{
    palabra;

    /**
     * Constructor.
     * @param {string} palabra - palabra que inicializara el atributo del objeto
     */
    constructor(palabra){
        this.palabra = palabra;
    }

    /**
     * Verifica si la letra existe en la palabra
     * @param {*} letra
     * @returns 
     */
    verificarLetra(letra){
        return this.palabra.includes(letra);
    }
}

/**
 * Clase Tablero
 * Representa el estado de la palabra a adivinar
 * con las letras que van siendo adivinadas
 */
class Tablero{

    palabra;
    estadoTablero = [];

    /**
     * Constructor.
     * El tablero se inicializara con el largo de la palabra
     * @param {string} palabra - palabra que inicializara el atributo del objeto
     */
    constructor(palabra){
        this.palabra = palabra;
        this.estadoTablero = this.inicializarTablero();
    }

    /**
     * 
     * @returns 
     */
    inicializarTablero(){

        //Convierto la palabra en un array de letras
        const arrLetras = this.palabra.split("");

        //Creo un nuevo array de espacios vacios. Sera un array con el largo de la palabra a adivinar
        return arrLetras.map(()=>"");
    }

    /**
     * Determina si la letra esta en el indice correcto, 
     * o si la letra se encuentra en la palabra pero no en el indice correcto 
     * o si la letra es errada.
     * @param {*} letra - letra a adivinar
     * @returns Un string que determina si se acerca o no a adivinar la palabra.
     *          "caliente" si esta en la palabra y en el indice correcto,
     *          "tibio" si la letra esta en la palabra,
     *          "frio" si la letra no esta en la palabra.
     */
    chequearLetraEnPalabra(letra){
        for(let i = 0; i < this.palabra.length; i++){
            if(letra == this.palabra[i])
                return "caliente";
            else if(this.palabra.includes(letra))
                return "tibio";
            else 
                return "frio";
        }
    }

    /**
     * Obtiene el estado del tablero para determinar cuantas letras ya se adivinaron
     * @returns {string} - El estado del tablero
     */
    obtenerEstadoTablero(){
        return this.estadoTablero.join("").toUpperCase();
    }
}
/**
 * Clase juego
 * Maneja la logica del juego
 * Controla la interaccion entre las distintas clases
 */
class Juego{

    palabra;
    tablero;
    intentos;

    /**
     * Constructor.
     * El tablero se inicializara con el largo de la palabra
     * @param {string} palabra - palabra que inicializara el atributo del objeto
     */
    constructor(palabra){
        this.palabra = new Palabra(palabra)
        this.tablero = new Tablero(palabra);
        this.intentos = 6;
    }

    /**
     * 
     * @param {*} letra 
     * @returns 
     */
    adivinarLetra(letra){
   
        if(this.tablero.chequearLetraEnPalabra(letra) == "frio"){
            this.intentos--;
            return false;
        }
        else 
        {
            return true;
        }
        
    }

    /**
     * Controla el estado del juego. Su estado por defecto es "Continue".
     * Cambia su estado al terminar.
     * Se termina porque se han adivinado las letras o porque se han acabado la cantidad de intentos.
     * @returns 
     */
    estadoJuego(){

        if(this.intentos == 0)
        {
            return "Fail";
        }
        else if(this.tablero.palabra == this.tablero.obtenerEstadoTablero())
        {
            return "Win";
        } 
        else
        {
            return "Continue";
        }      
    }
}
const sectionJuego = document.getElementById("juego");

const sectionAjustes = document.getElementById("ajustes");
document.getElementById("btn1").addEventListener("click",ajustes);
document.getElementById("close1").addEventListener("click",cerrarAjustes);

const sectionInfo = document.getElementById("info");
document.getElementById("btn2").addEventListener("click",info);
document.getElementById("close2").addEventListener("click",cerrarInfo);

/****** Display de Ajustes e Info *********/
sectionAjustes.style.display="none";
sectionInfo.style.display="none";

function ajustes(){
    sectionJuego.style.display="none";
    sectionInfo.style.display="none";
    sectionAjustes.style.display="";
}
function info(){
    sectionJuego.style.display="none";
    sectionInfo.style.display="";
    sectionAjustes.style.display="none";
}

function cerrarAjustes(){
    sectionJuego.style.display="";
    sectionAjustes.style.display="none";
    sectionInfo.style.display="none";
}
function cerrarInfo(){
    sectionJuego.style.display="";
    sectionAjustes.style.display="none";
    sectionInfo.style.display="none";
}

/************** Creacion de casilleros *****************/

//Creo una lista de todos los nodos boton
const listBtn = document.querySelectorAll(".cant-letras button");
listBtn.forEach(btn=>btn.addEventListener("click",seleccionarCantidadLetras))

function seleccionarCantidadLetras(){    
    //Obtengo la cantidad de casilleros a crear desde el atributo cant que estableci en el html
    let cantidad = parseInt(this.getAttribute("cant"));
    
    //Borro lo que hay en el inner para crear los casilleros que corresponden cada vez
    const contenedor = document.querySelector(".contenedor-filas");
    contenedor.innerHTML = "";

    //Creo las filas segun la cantidad de intentos del juego
    for(let i=0; i<6;i++)
    {
        //Creo un div que contenga cada fila
        const divFila = document.createElement("div");
        divFila.setAttribute("class","fila center");
        
        //Creo los casilleros segun la cantidad de letras elegida
        for (let j = 0; j < cantidad; j++) {
            const div = document.createElement("div");
            div.setAttribute("class","casillero center");
            divFila.appendChild(div); //Apendeo cada casillero a la fila
        }
        contenedor.appendChild(divFila);//Apendeo la fila al contenedor
    }

    //Cambio el estilo del boton para saber la cantidad de letras que tengo elegida
    listBtn.forEach(btn=>{
        if(btn == this)//Si el boton es el seleccionado le añado la clase selected
            btn.classList.add("selected");
            else //Sino remuevo de todos los botones la clase para que no queden coloreados
            btn.classList.remove("selected");
    })
}

//El juego arranca predefinidamente con 4 letras:
const btnCantidadPredefinida = document.getElementById("btn4-letras");
// Llama a la función para seleccionar la cantidad predefinida de casilleros
seleccionarCantidadLetras.call(btnCantidadPredefinida);


///Ver eventos para obtener lo que el usuario teclea
//Ver como poner cada letra dentro de cada casillero

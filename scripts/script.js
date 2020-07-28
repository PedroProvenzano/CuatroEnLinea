// variables globales
let queJugadorVa = 1;
let tableroCuatroenLinea = [];
let espacios = 0;
let colRow;


// Jugadores
let jugadorUno = prompt("Porfavor jugador uno ingrese su nombre");
let jugadorDos = prompt("Porfavor jugador dos ingrese su nombre");


// Constantes de DOM
const arrayCasilleros = document.getElementById("contenedorTateti").getElementsByTagName("div");
const pQuienJuega = document.getElementById("jugadorJuega");
const reiniciar = document.getElementById("reiniciar");
const felicitaciones = document.getElementById("felicitaciones");
const contenedorTateti = document.getElementById("contenedorTateti");
const contenedorBotones = document.getElementById("contenedorBotones");
const contenedorBotonesArray = document.getElementById("contenedorBotones").getElementsByTagName("div");

// EVENTO REINICIAR
reiniciar.addEventListener('click',()=>{
    for(let div of arrayCasilleros){
        div.style.backgroundColor = "white";
    }
    for(let div of contenedorBotonesArray){
        div.setAttribute("style", "pointer-events: all");
    }
    queJugadorVa = 1;
    pQuienJuega.innerText = jugadorUno + " Azul";
    // Reiniciar tablero
    tableroCuatroenLinea = [];
    for(let i=0;i<colRow;i++){
        tableroCuatroenLinea.push([]);
        for(let j=0;j<colRow;j++){
            tableroCuatroenLinea[i].push(0);
        }
    }
    checkGanarCuatro();
    felicitaciones.style.display = "none";
    espacios = 0;
})


// GANADOR

function ganador(nombreJugador){
    felicitaciones.innerText = "Felicitaciones " + nombreJugador + " ganaste!";
    felicitaciones.style.display = "block";
}


pQuienJuega.innerText = jugadorUno + " Azul";

// CREADOR DIVS

function creadorDivs(){
    let idDiv = 1;
    for(let i=0;i<colRow;i++){
        tableroCuatroenLinea.push([]);
        for(let j=0;j<colRow;j++){
            let divTateti = document.createElement("div");
            divTateti.id = idDiv;
            idDiv++
            divTateti.setAttribute("col", j);
            divTateti.setAttribute("row", i);
            tableroCuatroenLinea[i].push(0);
            contenedorTateti.appendChild(divTateti);
        }
    }
}


// INICIO DEL JUEGO 

function iniciarJuego(){
    let valor = prompt("Porfavor elegi cantidad de filas");
    colRow = parseInt(valor);
    if(valor>20||valor<=3){
        alert("Porfavor pone un valor entre 4 y 20");
        iniciarJuego();
    }else{
        contenedorTateti.setAttribute("style", "grid-template-columns: repeat("+ colRow +", 1fr); grid-template-rows: repeat("+ colRow +", 1fr);");
        contenedorBotones.setAttribute("style", "grid-template-columns: repeat("+ colRow +", 1fr); grid-template-rows: 1fr;");
    }
}


// CHECK GANAR

function checkGanarCuatro(){
    let checkGanar = setInterval(() => {
    // Horizontales
    for(let i = 0;i<colRow;i++){
        let arrayCheckHor = [];
        for(let j = 0;j<colRow-3;j++){

             arrayCheckHor.push(tableroCuatroenLinea[i][j]);
             arrayCheckHor.push(tableroCuatroenLinea[i][j+1]);
             arrayCheckHor.push(tableroCuatroenLinea[i][j+2]);
             arrayCheckHor.push(tableroCuatroenLinea[i][j+3]);

             switch(JSON.stringify(arrayCheckHor)){
                 case JSON.stringify([1,1,1,1]):
                    ganador(jugadorUno);
                    clearInterval(checkGanar);
                 break;
                 case JSON.stringify([2,2,2,2]):
                    ganador(jugadorDos);
                    clearInterval(checkGanar);
                 break;
                }
            arrayCheckHor = [];
        }
    }

    // Verticales
    for(let i = 0;i<colRow;i++){
        let arrayCheckVer = [];
        for(let j = 0; j<colRow-3;j++){
            arrayCheckVer.push(tableroCuatroenLinea[j][i]);
            arrayCheckVer.push(tableroCuatroenLinea[j+1][i]);
            arrayCheckVer.push(tableroCuatroenLinea[j+2][i]);
            arrayCheckVer.push(tableroCuatroenLinea[j+3][i]);

            switch(JSON.stringify(arrayCheckVer)){
                case JSON.stringify([1,1,1,1]):
                   ganador(jugadorUno);
                   clearInterval(checkGanar);
                break;
                case JSON.stringify([2,2,2,2]):
                   ganador(jugadorDos);
                   clearInterval(checkGanar);
                break;
               }
            arrayCheckVer = [];            
        }
    }

    // Diagonales 1 Arriba a Abajo  Izq a Der
    for(let i = 0;i<colRow-3;i++){
        let arrayCheckDiag = [];
        for(let j = 0;j<colRow-3;j++){

             arrayCheckDiag.push(tableroCuatroenLinea[i][j]);
             arrayCheckDiag.push(tableroCuatroenLinea[i+1][j+1]);
             arrayCheckDiag.push(tableroCuatroenLinea[i+2][j+2]);
             arrayCheckDiag.push(tableroCuatroenLinea[i+3][j+3]);

             switch(JSON.stringify(arrayCheckDiag)){
                 case JSON.stringify([1,1,1,1]):
                    ganador(jugadorUno);
                    clearInterval(checkGanar);
                 break;
                 case JSON.stringify([2,2,2,2]):
                    ganador(jugadorDos);
                    clearInterval(checkGanar);
                 break;
                }
            arrayCheckDiag = [];
        }
    }
    // Diagonales 2 Abajo a Arriba Izq a Der
    for(let i = colRow-1;i>=3;i--){
        let arrayCheckDiag = [];
        for(let j = 0;j<colRow-3;j++){

            arrayCheckDiag.push(tableroCuatroenLinea[i][j]);
            arrayCheckDiag.push(tableroCuatroenLinea[i-1][j+1]);
            arrayCheckDiag.push(tableroCuatroenLinea[i-2][j+2]);
            arrayCheckDiag.push(tableroCuatroenLinea[i-3][j+3]);

            switch(JSON.stringify(arrayCheckDiag)){
                case JSON.stringify([1,1,1,1]):
                   ganador(jugadorUno);
                   clearInterval(checkGanar);
                break;
                case JSON.stringify([2,2,2,2]):
                   ganador(jugadorDos);
                   clearInterval(checkGanar);
                break;
               }
           arrayCheckDiag = [];
        }
    }

}, 200);
}

// Creador de Divs Botones
function creadorDivsBotones(){
    for(let i=0;i<colRow;i++){
       let div = document.createElement("div");
       div.className = "botonFichas";
       div.setAttribute("col", i);
       div.addEventListener("click",clickDinamico);
       contenedorBotones.appendChild(div);
    }
}

// Evento clicks dinamicos

function clickDinamico(x){
    espacios++
    let div = x.target;
    let j = parseInt(div.getAttribute("col"));
    let a;
        // Inicio prueba
        let divsArray = contenedorTateti.children;
        let arrayDeDivs = [];
        for(let divArray of divsArray){
            if(parseInt(divArray.getAttribute("col"))==j){
                arrayDeDivs.push(divArray);
            }
        }
        // Fin prueba
    for(let i = 0; i<colRow;i++){
        if((tableroCuatroenLinea[i][j]==1||tableroCuatroenLinea[i][j]==2)&&i==0){
            div.setAttribute("style", "pointer-events: none");
            div.style.backgroundColor = "red";
            return;
            // Agregar cambio de color de flecha
        }else if(tableroCuatroenLinea[i][j]==1||tableroCuatroenLinea[i][j]==2){
            if(queJugadorVa==1){
                tableroCuatroenLinea[i-1][j] = queJugadorVa;
                pQuienJuega.innerText = jugadorDos + " Rojo";
                arrayDeDivs[i-1].style.backgroundColor = "blue";
                queJugadorVa++
                return;
            }else{
                tableroCuatroenLinea[i-1][j] = queJugadorVa;
                pQuienJuega.innerText = jugadorUno + " Azul";
                arrayDeDivs[i-1].style.backgroundColor = "red";
                queJugadorVa--
                return;
            }
        }
        a = i;
    }
    if(queJugadorVa==1){
        tableroCuatroenLinea[a][j] = queJugadorVa;
        pQuienJuega.innerText = jugadorDos + " Rojo";
        arrayDeDivs[a].style.backgroundColor = "blue";
        queJugadorVa++
    }else{
        tableroCuatroenLinea[a][j] = queJugadorVa;
        pQuienJuega.innerText = jugadorUno + " Azul";
        arrayDeDivs[a].style.backgroundColor = "red";
        queJugadorVa--
    }
}

iniciarJuego();
creadorDivsBotones();
creadorDivs();
checkGanarCuatro();


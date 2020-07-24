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

// EVENTO REINICIAR
reiniciar.addEventListener('click',()=>{
    for(let div of arrayCasilleros){
        div.innerText = "";
        div.setAttribute("style", "pointer-events: all");
    }
    queJugadorVa = 1;
    pQuienJuega.innerText = jugadorUno + " x";
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


pQuienJuega.innerText = jugadorUno + " x";

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
            divTateti.addEventListener('click',creadorEventosCuatro);
        }
    }
}

// CREADOR CLICK EVENTS

function creadorEventosCuatro(e){
    espacios++
    let div = e.target;
    let col = parseInt(div.getAttribute("col"));
    let row = parseInt(div.getAttribute("row"));
    if(queJugadorVa==1){
        div.innerText = "x";
        div.style.backgroundColor = "blue";
        queJugadorVa++
        pQuienJuega.innerText = jugadorDos + " o";
        tableroCuatroenLinea[row][col] = 1;
        div.setAttribute("style", "pointer-events: none");
    }else{
        div.innerText = "o";
        queJugadorVa--
        pQuienJuega.innerText = jugadorUno + " x";
        tableroCuatroenLinea[row][col] = 2;
        div.setAttribute("style", "pointer-events: none");
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

iniciarJuego();
creadorDivs();
checkGanarCuatro();


/**
 * 2C = Two of Clubs
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */

let deck           = [];
let tipos          = ['C','D','H','S']
let especiales     = ['A','J','Q','K']
let puntosJugador  = 0,
puntosComputador   = 0

//referencia

let puntosHTML         = document.querySelectorAll('small')
let divCartaJugador    = document.querySelector('#jugador-cartas')
let divCartaComputador = document.querySelector('#computadora-cartas')
let btnPedir           = document.querySelector('#btnPedir')
let btnDetener         = document.querySelector('#btnDetener')
let btnNuevo           = document.querySelector('#btnNuevo')

//esto crea el deck

let crearDeck = ()=>{
for (let i = 2; i <=10 ; i++) {
    for (const tipo of tipos) {
        deck.push(i + tipo)
    }
    for (const tipo of tipos) {
        for (const esp of especiales) {    
        deck.push(esp + tipo)
    }}

}
    deck = _.shuffle(deck)
    console.log(deck)
    return deck
}
crearDeck()

// esta funcion pide una carta

let pedirCarta = ()=>{
let carta = deck.pop()
console.log(carta)
return carta
}

// esta funcion asigna un valor a la carta

let valorCarta = (carta)=>{
let valor = carta.substring(0,carta.length-1)
return (isNaN(valor))?(valor === 'A')?11:10
:valor*1

}

//ia de la computadora

let turnoComputadora = (PuntosMinimos)=>{let carta = pedirCarta();

do {
    


    puntosComputador = puntosComputador + valorCarta(carta)
    puntosHTML[1].innerText = puntosComputador
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta')
    
    divCartaComputador.append(imgCarta)
    if (PuntosMinimos>21) {break}
} while ((puntosComputador<PuntosMinimos)&&(PuntosMinimos<=21));    

setTimeout(() => {
    if (PuntosMinimos>21) {
        alert('Computador Gana')
    } else if (puntosComputador>21){
        alert('Jugador gana')
    } else if (puntosComputador === PuntosMinimos){alert('nadie Gana')}
}, 50);
};

//controla el Boton pedir

btnPedir.addEventListener('click',()=>{
let carta = pedirCarta();
puntosJugador = puntosJugador + valorCarta(carta)
puntosHTML[0].innerText = puntosJugador
const imgCarta = document.createElement('img');
imgCarta.src = `assets/cartas/${carta}.png`;
imgCarta.classList.add('carta')

divCartaJugador.append(imgCarta)
turnoComputadora(puntosJugador)
if (puntosJugador>21) {
    console.warn('perdiste')
btnPedir.disabled   = true;
btnDetener.disabled = true;
    
} else if(puntosComputador === 21){
    console.warn('ganaste');
btnPedir.disabled   = true;
btnDetener.disabled = true;

    
}

})

//controla el btn detener

btnDetener.addEventListener('click',()=>{
btnPedir.disabled   = true;
btnDetener.disabled = true;


})

btnNuevo.addEventListener('click',()=>{
    deck = crearDeck()
    puntosComputador = 0
    puntosJugador = 0
    puntosHTML[0].innerText = 0
    puntosHTML[1].innerText = 0
    divCartaComputador.innerHTML =''
divCartaJugador.innerHTML=''

    btnPedir.disabled   = false;
    btnDetener.disabled = false;


})
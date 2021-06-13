//Este file arranca con declaraciones, recién la última línea es el punto de inicio

var input = document.getElementById('num');

const STRINGS = [
"Hola, amigo",
"No te puedo pasar el programita con lo que decía antes",
"Pero...",
"...",
"Sabés que?",
"Te puedo adivinar que raza de perro sos...",
"Ingresa tu número nomás...:"
];

let counter = 0;
  
const OPTIONS = {
    // Initial position
    offset: 0,
    // Timeout between each random character
    timeout: 5,
    // Number of random characters to show
    iterations: 10,
    // Random characters to pick from
    characters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'x', '#', '%', '&', '-', '+', '_', '?', '/', '\\', '='],
    // String to resolve
    resolveString: STRINGS[counter],
    // The element
    element: document.querySelector('[data-target-resolver]')
  }

const RESOLVER = {
  resolve:  function resolve(options, callback) {
    // The string to resolve
    const resolveString = options.resolveString || options.element.getAttribute('data-target-resolver');
    const combinedOptions = Object.assign({}, options, {resolveString: resolveString});
    
    function getRandomInteger(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    
    function randomCharacter(characters) {
      return characters[getRandomInteger(0, characters.length - 1)];
    };
    
    function doRandomiserEffect(options, callback) {
      const characters = options.characters;
      const timeout = options.timeout;
      const element = options.element;
      const partialString = options.partialString;
  
      let iterations = options.iterations;
  
      setTimeout(() => {
        if (iterations >= 0) {
          const nextOptions = Object.assign({}, options, {iterations: iterations - 1});
  
          // Ensures partialString without the random character as the final state.
          if (iterations === 0) {
            element.textContent = partialString;
          } else {
            // Replaces the last character of partialString with a random character
            element.textContent = partialString.substring(0, partialString.length - 1) + randomCharacter(characters);
          }
  
          doRandomiserEffect(nextOptions, callback)
        } else if (typeof callback === "function") {
          callback(); 
        }
      }, options.timeout);
    };
    
    function doResolverEffect(options, callback) {
      const resolveString = options.resolveString;
      const characters = options.characters;
      const offset = options.offset;
      const partialString = resolveString.substring(0, offset);
      const combinedOptions = Object.assign({}, options, {partialString: partialString});
  
      doRandomiserEffect(combinedOptions, () => {
        const nextOptions = Object.assign({}, options, {offset: offset + 1});
  
        if (offset <= resolveString.length) {
          doResolverEffect(nextOptions, callback);
        } else if (typeof callback === "function") {
          callback();
        }
      });
    };
  
    doResolverEffect(combinedOptions, callback);
  }
  
}

function callback() {
  var stop = false;
  setTimeout(() => {
    counter ++;
    
    if (counter >= STRINGS.length) {
      stop = true;
      input.style.display = "block";
    }
    
    if(!stop){
      iterar();
    }


  }, 1000);
}

function updateValue(x = "" ) {
  var num = x;
  if(num!=""){
    calcularRaza(num)
  }
  console.log(num);
}

function calcularRaza(num){
  num = parseInt(num)
  switch(true){
    case (num<3):
    //TODO
    // Pódrías poner dentro de este case una imagen de cada cosa
    STRINGS[STRINGS.length]="SOS CORAJE EL PERRO COBARDE"
    break;
    case (num<5): 
      STRINGS[STRINGS.length]="SOS PLUTO, MAN"
      STRINGS[STRINGS.length]="CORTA LA BOCHA"
      break;
    case (num<10): 
      STRINGS[STRINGS.length]="MMMMMMMMMMMMMMM"
      STRINGS[STRINGS.length]="SOS EL DE LOS SIMPSONS..."
      STRINGS[STRINGS.length]="AYUDANTE DE SANTA"
      break;
    case (num<15): 
      STRINGS[STRINGS.length]="SOS ROCKO.."
      STRINGS[STRINGS.length]="DE LA VIDA MODERNA DE ROCKO"
      break;
    case(num<18):
      STRINGS[STRINGS.length]="SOS BUDDY"
      STRINGS[STRINGS.length]="PERO NO HACES NINGUN DEPORTE"
      break;
    case(num<25):
    STRINGS[STRINGS.length]="SOS EL QUE QUIERAS..."
    default:
      STRINGS[STRINGS.length]="MMMMMMMMMM"
      STRINGS[STRINGS.length]="SOS ALGUNO DE LOS 101 DALMATAS"
      break;
  }
  stop = false;
  iterar();
}

function iterar(){
let nextOptions = Object.assign({}, OPTIONS, {resolveString: STRINGS[counter]});
RESOLVER.resolve(nextOptions, callback);
}

// Este es el punto de inicio del programa
RESOLVER.resolve(OPTIONS, callback);
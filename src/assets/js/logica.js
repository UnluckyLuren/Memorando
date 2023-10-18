var movimientos = 0;
var grupoTarjetas1 = [ ["./assets/img/Cartas/1.png", "./assets/img/Cartas/uno.png"], ["./assets/img/Cartas/2.png", "./assets/img/Cartas/dos.png"],  ["./assets/img/Cartas/3.png", "./assets/img/Cartas/tres.png"],  ["./assets/img/Cartas/4.png", "./assets/img/Cartas/cuatro.png"] ];
var nivelActual = 0;
var niveles=[
     {
      tarjeta:grupoTarjetas1[0],
      movimientosMax:3
     },
      {
      tarjeta:grupoTarjetas1[0].concat(grupoTarjetas1[1]),
      movimientosMax:8 
      },
  {
      tarjeta:grupoTarjetas1[0].concat(grupoTarjetas1[1],grupoTarjetas1[2]),
    movimientosMax: 12   
  },
  {
tarjeta:grupoTarjetas1[0].concat(grupoTarjetas1[1],grupoTarjetas1[2],grupoTarjetas1[3]),
   movimientosMax:15
  }
];

function maxContador(){
      var movimientosMaxTexto = niveles[nivelActual].movimientosMax;
      if(movimientosMaxTexto < 10){
        movimientosMaxTexto = "0"+ movimientosMaxTexto;
      }
     document.querySelector("#movTotal").innerText=movimientosMaxTexto;
    }

//tuction bellow activate card's game memorama
function iniciarJuego(){

    const contGame = document.getElementById('contGame');
    const pantallaPrincipal = document.getElementById('pantallaPrincipal');
    pantallaPrincipal.classList.add('disCero');
    contGame.classList.remove('disCero');

    document.querySelector("#acabanMovimientos").style.visibility="hidden";
    document.querySelector("#endGame").style.visibility="hidden";
    document.querySelector("#gameOver").style.visibility="hidden";
    maxContador();
    movimientos= 0;
    document.querySelector("#mov").innerText= "00";
    function barajeaTarjetas(lasTarjetas){
        var totalTarjetas = lasTarjetas.concat(lasTarjetas);
        var resultado = totalTarjetas.sort(
            function(){
                return 0.5 - Math.random();//tomamos 0.5 como valor base para marcar el lugar donde empieza a tomar valores y hacerlos aleatorios
            }
        );
        return resultado;
    }
  
  function reparteTarjetas(lasTarjetas){
    var tarjetasBarajeadas = barajeaTarjetas(lasTarjetas);
    var mesa = document.querySelector("#mesa");
   mesa.innerHTML = ""; //esta acción borra el contenido de la mesa para el siguiente juego 
  tarjetasBarajeadas.forEach (function (elemento){
     //creamos variable tarjeta como un elemento virtual que reproduce el elemento que hemos recogido en el forEach(cada icono concatenado, en este caso) y se imprime en la tarjeta cuantas veces exitan elementos en el array concatenado
     var tarjeta = document.createElement("div");
     tarjeta.innerHTML = //pintar contenido HTML dentro de variable tarjeta
     "<div class='tarjeta' data-valor= " + 
       elemento +
       ">"+
     "<div class='tarjeta__contenido'>" +
        '<img src="'+elemento+'" class="imgCard" > </img>'+
     "</div>" +
 "</div>"
 ;
     mesa.appendChild(tarjeta);//incluye los nodos hijos de tarjeta en variable mesa
     iniciaReloj();
   }); 
  
  function descubrir() {
  var totalDescubiertas = document.querySelectorAll(".descubierta:not(.Acertada)");
    if(totalDescubiertas.length > 1){
      return;
    }
   this.classList.add("descubierta");
    
    var descubiertas = document.querySelectorAll(".descubierta:not(.Acertada)");
    if( descubiertas.length < 2){
      return;
    }//hora de comparar tarjetas usamos .dataset.valor(lo que hallamos añadido de propiedad) y con dataset recoge cualquier valor que comience con data
  comparaTarjetas(descubiertas);
    
    /*ESTO NO DEBERÍA IR AQUI esta funcion debería estar en un archivo aparte, pero aqui corre*/
      function actualizaContador(){
      var movimientosTexto;
      movimientos++;
      movimientosTexto = movimientos;
        
        if(movimientos > niveles[nivelActual].movimientosMax){
          function finJuego(){
            document.querySelector("#acabanMovimientos").style.visibility="visible";
            document.querySelector("#endGame").style.visibility="hidden";
          }
          setTimeout(finJuego,1500);
          return;
        }
        
      if (movimientos<10){
      movimientosTexto = "0" + movimientos;
      }
      document.querySelector("#mov").innerText=movimientosTexto;
      }
      actualizaContador();
    
      var cartasRestantes = document.querySelectorAll(".tarjeta:not(.Acertada)");
      if(cartasRestantes.length === 0){
      setTimeout(finalizar,1500);
      }
    
    
    
 }

   document.querySelectorAll(".tarjeta").forEach( function(tarjetitaa){
    tarjetitaa.addEventListener("click", descubrir);
   });  
    
   }
  reparteTarjetas(niveles[nivelActual].tarjeta);
   

  }

//   Iniciar juego
    
    function finalizar(){
     if(nivelActual < niveles.length -1 ){
        document.querySelector("#endGame").style.visibility="visible";
     }else{
        document.querySelector("#gameOver").style.visibility="visible";
     }
   }
  
    
    
 function subirNivel(){
      nivelActual++;
      }
   
      function actualizaNivel(){
        var nivelActualTexto = nivelActual + 1;
       if(nivelActualTexto < 10){
         nivelActualTexto ="0"+ nivelActualTexto;
       }
        document.querySelector("#nivel").innerText = nivelActualTexto ;
      }
    function cargaNuevoNivel(){
     subirNivel();
     actualizaNivel();
     document.querySelector("#endGame").style.visibility="hidden";
      iniciaReloj();
      iniciarJuego();
      
    }
  document.querySelector("#levelUp").addEventListener("click",cargaNuevoNivel);

  function reiniciar(){
         movimientos = 0; 
         nivelActual = 0;  
         iniciarJuego();
         actualizaNivel();
      }
  
document.querySelectorAll(".reiniciar").forEach(function(reinicio){ reinicio.addEventListener("click",reiniciar);
 });        


function iniciaReloj(){
  var segundos = 0;
  var minutos = 0;
  var segundosTexto;
  var minutosTexto;
 
  let funcReloj = setInterval(() => {

    segundos ++; //segundos corre hacia adelante
    if(segundos > 59){
      segundos = 0;
      minutos++;
      }
   
    if(minutos > 59){
      minutos = 0;
      }
   
   segundosTexto = segundos;
   minutosTexto = minutos;
   
   if(segundos < 10){
    segundosTexto = "0"+ segundos ;
   } 
    if(minutos < 10){
    minutosTexto =  "0"+minutos ;
   } 
    
   document.querySelector("#segundos").innerText = segundosTexto;
   document.querySelector("#minutos").innerText = minutosTexto;

   
   var cartasRestantes = document.querySelectorAll(".tarjeta:not(.Acertada)");
   var movimientosMaxTexto = niveles[nivelActual].movimientosMax;

   if(cartasRestantes.length === 0 || movimientos > movimientosMaxTexto) {
       clearInterval(funcReloj);
   }
    
  }, 1000);
    
}
//iniciaReloj();
 // reparteTarjetas();
 


function comparaTarjetas(tarjetasVolteadas){
  
    if( tarjetasVolteadas[0].dataset.valor ===  tarjetasVolteadas[1].dataset.valor){
       ganaste(tarjetasVolteadas);
    }else{
      perdiste(tarjetasVolteadas);
    }
}

function ganaste(tarjetasVolteadas){
  
  tarjetasVolteadas.forEach(function(acertada){
    acertada.classList.add("Acertada");
  });
    
}

function perdiste(tarjetasVolteadas){
  tarjetasVolteadas.forEach(function(acertada){
    acertada.classList.add("error");
  });
  setTimeout( //funciona con dos parametros, el primero es la funcion a ejecutarse, y el segundo es el tiempo en milisegundos que se tardará en aplicarse
        function(){ //elimina la animacion y la clase descubierta
            tarjetasVolteadas.forEach(function(elemento){
                elemento.classList.remove("descubierta");
                elemento.classList.remove("error");
              });
        }, 1500);
    
}






/*==============MESA 2==============*/

// var grupoTarjetas2 =  [ ["./assets/img/Cartas/5.png", "./assets/img/Cartas/cinco.png"], ["./assets/img/Cartas/6.png", "./assets/img/Cartas/seis.png"],  ["./assets/img/Cartas/7.png", "./assets/img/Cartas/siete.png"],  ["./assets/img/Cartas/8.png", "./assets/img/Cartas/ocho.png"] ];
// var totalTarjetas2 = grupoTarjetas2.concat(grupoTarjetas2);
// var movimientos = 0;

// function barajeaTarjetas2(){
//     var resultado = totalTarjetas2.sort(
//       function(){
//         return 0.5 - Math.random();
//       }
//     );
//    return resultado;
// }


// function reparteTarjetas2() {
  
//   var tarjetasRevueltas = barajeaTarjetas2(); 
//   var mesita = document.querySelector("#mesa");
//   mesita.innerHTML = "";
//    tarjetasRevueltas.forEach(function (element){
//      var miTarjeta = document.createElement("div");
//       miTarjeta.innerHTML = 
//       "<div class='tarjeta' data-valor= " + element + ">"+
//         "<div class='tarjeta__contenido'>" +
//         '<img src="'+element+'" class="imgCard" > </img>'+
//         "</div>" +
//     "</div>"
//      ;
//      mesita.appendChild(miTarjeta);
//    });
  
  
//   function descubrir() {
//     var totalDescubiertas = document.querySelectorAll(".descubierta:not(.Acertada)");
//     if (totalDescubiertas.length > 1){
//       return;
//     }
//     this.classList.add("descubierta");
    
//     var cartasVolteadas = document.querySelectorAll(".descubierta:not(.Acertada)");
//     if (cartasVolteadas.length < 2){
//       return;
//     }
//   compararTarjetas(cartasVolteadas);
    
// }
  
// document.querySelectorAll(".tarjeta").forEach( function(tarjetitaa){
//   tarjetitaa.addEventListener("click", descubrir);
//  });
//   function iniciaReloj(){
//   var segundos = 0;
//   var minutos = 1;
//   var segundosTexto;
//   var minutosTexto;
//   var cronometro;
    
//   function relojCorre(){
//    segundos--;//decrecimiento de segundos
    
//      if(segundos < 0){
//        segundos = 59;
//        minutos--;
//        }
    
//      if(minutos< 0){
//        segundos = 0;
//        minutos = 0;
//        clearInterval(cronometro);
//      }
    
//     segundosTexto = segundos;
//     minutosTexto = minutos;
    
//     if(segundos < 10){
//      segundosTexto = "0"+ segundos ;
//     } 
//      if(minutos < 10){
//      minutosTexto =  "0"+minutos ;
//     } 
     
//     document.querySelector("#segundos").innerText = segundosTexto;
//     document.querySelector("#minutos").innerText = minutosTexto;
    
//     }  
// cronometro = setInterval(relojCorre, 1000);
// }
//   iniciaReloj(); 
  
// }

// function compararTarjetas(cartasVolteadas){
//      if(cartasVolteadas[0].dataset.img === cartasVolteadas[1].dataset.img){
//       ganar(cartasVolteadas);    
//     }else{
//      perder(cartasVolteadas);
//     }  
// }

// function ganar(cartasVolteadas){
//   cartasVolteadas.forEach(function(tarjetita){
//     tarjetita.classList.add("Acertada");
//   });
//    window.alert("Ganaste! abuebo" + cartasVolteadas[0].dataset.img +cartasVolteadas[1].dataset.img);
// }

// function perder(cartasVolteadas){
//   cartasVolteadas.forEach(function(tarjetita){
//     tarjetita.classList.remove("descubierta")
//   })
//     window.alert("Nel, hijín, vuelvelo a intentar."+ cartasVolteadas[0].dataset.img + cartasVolteadas[1].dataset.img);
// }



// // ==========JUEGO 3===========

// var tarjetasJuego3 = [ "🎅", "😈", "💀", "💩", "🤡", "👽", "🐶", "🦍"];
// var juegoCompleto = tarjetasJuego3.concat(tarjetasJuego3); 
// var movimientos = 0;

// function barajeaTarjetas3(){
//     var resultado = juegoCompleto.sort(
//       function(){
//         return 0.5 - Math.random();
//       }
//     );
//    return resultado;
// }

// function repartirTarjetas3 (){
  
//   var tarjetasRevueltas3 = barajeaTarjetas3();
//    var mesita3 = document.querySelector("#mesa");
//   mesita3.innerHTML = "";
  
//   tarjetasRevueltas3.forEach(function(icono){
//     var tarjetita = document.createElement("div");
//     tarjetita.innerHTML = 
//             "<div class='tarjeta' data-valor= " + 
//             icono +
//             ">"+
//             "<div class='tarjeta__contenido'>" +
//                 '<img src="'+icono+'" class="imgCard" > </img>'+
//             "</div>" +
//         "</div>"   
//      ;
//     mesita3.appendChild(tarjetita);
//   });
  
//   function descubrir() {
    
//   var tarjetitasVolteadas = document.querySelectorAll(".descubierta:not(.Acertada)");
 
//    if (tarjetitasVolteadas.length > 1){
//      return;
//    } this.classList.add("descubierta");
    
//   var lasVolteadas = document.querySelectorAll(".descubierta:not(.Acertada)");
//     if(lasVolteadas.length < 2 ){
//       return;
//     }
//     comparacionTarjetas(lasVolteadas);
    
//   }
    
// document.querySelectorAll(".tarjeta").forEach( function(tarjetitaa){
//   tarjetitaa.addEventListener("click", descubrir);
//  });
  
// }

//   function comparacionTarjetas(lasVolteadas){
//   if(lasVolteadas[0].dataset.value === lasVolteadas[1].dataset.value) {
//       acierto(lasVolteadas);
//     }else{
//      error(lasVolteadas); 
//     }  
//   }
  
//   function acierto(lasVolteadas){
//     var acertadas = document.querySelectorAll(".descubierta");
//     acertadas.forEach(function(correcta){
//       correcta.classList.add("Acertada");
//     });
//     console.log("Acertaste" + lasVolteadas[0].dataset.value + lasVolteadas[1].dataset.value);
//   }
  
//   function error(lasVolteadas){
//     var erroneas = document.querySelectorAll(".descubierta");
//     erroneas.forEach(function(errada){
//       errada.classList.remove("descubierta");
//     });
    
//     console.log("Fallaste" + lasVolteadas[0].dataset.value + lasVolteadas[1].dataset.value );
//   }



// Loop sin funcionar


var numeros=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

function revuelveNumeros(){
  
  var numbers = numeros.sort(function(){
    return 0.5 - Math.random(); 
  })
  return numbers;
}
   

function loopNumeros(){
  
  var numerosRevueltitos = revuelveNumeros();
  var tablita = document.querySelector("#tablaNumeros");
  tablita.innerHTML = "";
  
  
  numerosRevueltitos.forEach(function(numerito){
    var numeroNuevo = document.createElement("div");
    numeroNuevo.innerHTML = 
     "<div class='numeros'>"+
     "<h1>" + numerito + "</h1>"+
   "</div>";
 tablita.appendChild(numeroNuevo);
  });
 
}

//loopNumeros();

function seleccionarN(){
  this.classList.add("numberSelect");
  //Aqui creamos la funcion que agrega una nueva clase, que esta entre los parentesis, a un objeto, representado por this
}
//this señala "este" elemento en el que se esta invocando la function
document.querySelectorAll(".numeros").forEach(function(numerito){
  numerito.addEventListener("click",seleccionarN);
})

/*con el metodo querySelectorAll escogemos todo elemento de un documento con una caracteristica que indiquemos dentro del parentesis, en este caso todo elemento con la clase ".numeros"*/

/*una vez seleccionado, usamos forEach para recorrer cada elemento dentro de una funcion, que se repetirá tantos elementos existan dentro del documento con esa clase*/

/*señalamos el parametro para que sea recogido al usar function dentro de forEach, y lo usamos dentro de la misma function, agregando un addEventListener, invocando el evento(click en este caso) y la function a invocar (en este caso la que señalamos al principio)*/
// FUNCTION MATH RANDOM


/*var conteo = "La posicion del array es ";
//array de ejemplo para usar for
  for( var item = 0; item < 21; item++){
    console.log(conteo, item);
  }*/


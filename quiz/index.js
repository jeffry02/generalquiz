let preguntas_aleatorias = true;
let mostrar_pantalla_juego_terminado = true;
let reiniciar_puntos_al_reiniciar_el_juego = true;

let pregunta
let posibles_respuestas
let btn_correspondiente = [
  select_id("btn1"), select_id("btn2"),
  select_id("btn3"), select_id("btn4")
];
let npreguntas =[];

let preguntas_hechas = 0;
let preguntas_correctas = 0;

function escogerPreguntaAleatoria() {
  let n;
if (preguntas_aleatorias) {
  n = Math.floor(Math.random()*interpreteBp.length); // 0, 1 ,2 => 0 1 2
} else { 
  n = 0;
}
console.log('xxxxxxxxxxxxxx');
console.log(interpreteBp.length)
console.log(npreguntas.length);

if (npreguntas.length == interpreteBp.length) {  // 0 == 3
  if (mostrar_pantalla_juego_terminado) { 
    select_id('main').innerHTML = "Juego Terminado, Puntuación: " + preguntas_correctas + "/" + (preguntas_hechas);
    
    /*if(reiniciar_puntos_al_reiniciar_el_juego) {
      preguntas_correctas = 0
      preguntas_hechas = 0
    }
    npreguntas = [];*/

    /*
    quiero que se muestre un boton de empezar de nuevo cuando termiene el quiz, que este de debajo del mensaje de juego terminado.
    Y cuando el usuario le de click, entonces vengas y incies el contado reiniciar variables de preguntas correctas en 0, preguntas hechas en 0, npreguntas = []
    y mostres de nuevo el html para inicie el quiz.

    */
  }
  
}else{
  
  while(npreguntas.includes(n)) { //true
    n = Math.floor(Math.random()*interpreteBp.length);
  }

  npreguntas.push(n);
  preguntas_hechas++;

  escogerPregunta(n);

}

}

function escogerPregunta(n) {
    pregunta = interpreteBp[n]
  select_id("categoria").innerHTML = pregunta.categoria;
  select_id("pregunta").innerHTML = pregunta.pregunta;
  select_id("numero").innerHTML = "Posicion en el arreglo "+ (n+1);

if (preguntas_hechas >1) { 
  select_id("puntaje").innerHTML = preguntas_correctas + "/" + (preguntas_hechas - 1);
  } else { 
    select_id("puntaje").innerHTML = '0/0';
  }

  select_id("imagen").setAttribute("src",pregunta.imagen);
  style("imagen").objectFit = pregunta.objectFit; 
  desordenarRespuestas(pregunta);
} 

let btns = [
  select_id("btn1"),
  select_id("btn2"),
  select_id("btn3"),
  select_id("btn4")
]

function desordenarRespuestas(pregunta) {
 posibles_respuestas = [
    pregunta.respuesta,
    pregunta.incorrecta1,
    pregunta.incorrecta2,
    pregunta.incorrecta3
  ];
  posibles_respuestas.sort(() => Math.random() -0.5);

  select_id("btn1").innerHTML = posibles_respuestas[0];
  select_id("btn2").innerHTML = posibles_respuestas[1];
  select_id("btn3").innerHTML = posibles_respuestas[2];
  select_id("btn4").innerHTML = posibles_respuestas[3];
}

let suspender_botones = false;

function oprimir_btn(i) { 
  if (suspender_botones) {
    return;
  }
  suspender_botones = true;
  if(posibles_respuestas[i] == pregunta.respuesta) {
    preguntas_correctas++;
    btn_correspondiente[i].style.background = "blue";
  } else { 
    btn_correspondiente[i].style.background = "yellow";
  }
  for (let j = 0; j <4; j++) { 
    if (posibles_respuestas[j] == pregunta.respuesta) {
      btn_correspondiente[j].style.background = "blue";
      break;
    }
  }
  setTimeout(() => { 
    reiniciar();
    suspender_botones = false; 
  }, 3000);
}

function reiniciar() { 
  for (const btn of btn_correspondiente) { 
    btn.style.background = "white"
  }
  escogerPreguntaAleatoria();
}

function select_id(id) {
  return document.getElementById(id);
}

function style(id) {
  return select_id(id).style;
}

function readText(ruta_local) {
  var texto = null;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", ruta_local, false);
  xmlhttp.send();
  if (xmlhttp.status == 200) {
  texto = xmlhttp.responseText;
}
  return texto;
}

function getQuizQuestion(){
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open('GET', 'https://63ca11c1d0ab64be2b4be217.mockapi.io/api/v1/getQuiz', false);
  xmlhttp.send();
  //console.log('hola codigo');
  //console.log(xmlhttp.status);
  //console.log(xmlhttp.responseText);
  
  if (xmlhttp.status == 200) {
    return xmlhttp.responseText;
  }
}

window.onload = function() {

  /*var i = 0;

  while(i <= 5){
    console.log('soy '+i); // 0 1 2 3 4 5
    i++;
  }*/

  basePreguntas = getQuizQuestion();//readText("file:///home/mike/Documents/projects/personal/generalquiz/quiz/base-preguntas.Json");
  interpreteBp = JSON.parse(basePreguntas);
  //console.log('-----------------');
  //console.log(interpreteBp);
  escogerPreguntaAleatoria();
}
let escogerPreguntaAleatoria = true;
let mostrar_pantalla_juego_terminado = true;
let reiniciar_puntos_al_reiniciar_el_juego = true;

window.onload = function() {
  basePreguntas = readText("base-preguntas.Json");
  interpreteBp = JSON.parse(basePreguntas);
  escogerPreguntaAleatoria();
}

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
  n = Math.floor(Math.random()*interpreteBp.length);
} else { 
  n = 0;
}
while (npreguntas.includes(n)) {
  n++;
  if (n => interpreteBp.length) {
    n = 0;
  }
  if (npreguntas.length == interpreteBp.length) { 
    if (mostrar_pantalla_juego_terminado) { 
      swal.fire({ 
        title: "Juego Terminado",
        Text: "Puntuación: " + preguntas_correctas + "/" + (preguntas_hechas - 1),
        icon: "success"
      });
    }
    if(reiniciar_puntos_al_reiniciar_el_juego) {
      preguntas_correctas = 0
      preguntas_hechas = 0
    }
    npreguntas = [];
  }
}
npreguntas.push(n);
preguntas_hechas++;

escogerPregunta(n);
}

function escogerPregunta(n) {
  pregunta = interpreteBp[n]
  select_id("categoria").innerHTML = pregunta.categoria;
  select_id("pregunta").innerHTML = pregunta.pregunta;
  select_id("numero").innerHTML = n;
let pc = preguntas_correctas;
if (preguntas_hechas >1) { 
  select_id("puntaje").innerHTML = pc + "/" + (preguntas_hechas -1);
  } else { 
    select_id("puntaje").innerHTML = '';
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
    btn_correspondiente[i].style.background = "green"
  } else { 
    btn_correspondiente[i].style.background = "red"
  }
  for (let j = 0; j <4; j++) { 
    if (posibles_respuestas[j] == pregunta.respuesta) {
      btn_correspondiente[j].style.background = "green";
      break;
    }
  }
  setTimeout(() => { 
    reiniciar();
    suspender_botones = false; 
  }, 30000);
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
const temas = ["Tipos de Empresarios", "Gestión de RR.HH", "Gestión Financiera"];
const preguntas = {
  "Tipos de Empresarios": [
    { q: "¿Cuál de estos empresarios se enfoca en la innovación constante?", o: ["Operativo", "Innovador", "Estrategico", "Emprendedor"], c: 1 },
    { q: "¿Qué tipo de empresario sigue reglas ya establecidas?", o: ["Operativo", "Innovador", "Estrategico", "Emprendedor"], c: 0 },
    { q: "¿Cuál se caracteriza por asumir riesgos y crear nuevas oportunidades?", o: ["Estrategico", "Emprendedor", "Operativo", "Táctico"], c: 1 },
    { q: "¿El empresario estratégico se enfoca principalmente en...?", o: ["La gestión diaria", "El largo plazo", "Las ventas", "El producto"], c: 1 },
    { q: "¿Qué empresario busca optimizar procesos existentes?", o: ["Emprendedor", "Innovador", "Operativo", "Estrategico"], c: 2 },
    { q: "El empresario innovador se diferencia por...", o: ["Mantener rutinas", "Evitar riesgos", "Probar ideas nuevas", "Delegar tareas"], c: 2 },
    { q: "¿Qué tipo de empresario suele crear startups?", o: ["Operativo", "Emprendedor", "Técnico", "Estrategico"], c: 1 },
    { q: "El empresario operativo se centra en...", o: ["La innovación", "La ejecución diaria", "Las inversiones", "El liderazgo"], c: 1 },
    { q: "¿Quién define la visión y metas globales de la empresa?", o: ["Estrategico", "Innovador", "Operativo", "Emprendedor"], c: 0 },
    { q: "El empresario que adapta tecnologías nuevas es...", o: ["Innovador", "Emprendedor", "Estrategico", "Operativo"], c: 0 },
  ],
  "Gestión de Recursos Humanos": [
    { q: "¿Qué muestra un organigrama?", o: ["Los horarios", "La estructura jerárquica", "Los sueldos", "Los recursos físicos"], c: 1 },
    { q: "¿Qué función de RRHH se ocupa del reclutamiento?", o: ["Capacitación", "Selección", "Motivación", "Evaluación"], c: 1 },
    { q: "¿Qué documento contiene los datos y experiencia del candidato?", o: ["Contrato", "Currículum Vitae", "Profesiograma", "Organigrama"], c: 1 },
    { q: "El profesiograma describe...", o: ["Los productos", "Los sueldos", "Los requisitos de un puesto", "La estructura"], c: 2 },
    { q: "El reclutamiento busca...", o: ["Reducir personal", "Incorporar nuevos talentos", "Medir productividad", "Actualizar organigramas"], c: 1 },
    { q: "¿Qué función busca mejorar el ambiente laboral?", o: ["Reclutamiento", "Motivación", "Evaluación", "Profesiograma"], c: 1 },
    { q: "¿Qué herramienta muestra la jerarquía en una empresa?", o: ["CV", "Organigrama", "Contrato", "Evaluación"], c: 1 },
    { q: "¿Qué documento detalla funciones y requisitos de un cargo?", o: ["Profesiograma", "CV", "Contrato", "Currículum"], c: 0 },
    { q: "El área de RRHH se encarga de...", o: ["Diseñar productos", "Gestionar personal", "Finanzas", "Marketing"], c: 1 },
    { q: "El proceso de selección tiene como objetivo...", o: ["Despedir empleados", "Contratar al mejor candidato", "Capacitar al personal", "Aumentar ventas"], c: 1 },
  ],
  "Gestión Financiera": [
    { q: "¿Qué es un presupuesto?", o: ["Un gasto real", "Una estimación de ingresos y egresos", "Un préstamo", "Una factura"], c: 1 },
    { q: "¿Cuál es el objetivo principal del presupuesto?", o: ["Registrar ventas", "Controlar recursos económicos", "Pagar impuestos", "Emitir facturas"], c: 1 },
    { q: "¿Qué tipo de presupuesto estima ingresos y gastos futuros?", o: ["Financiero", "Táctico", "Administrativo", "Operativo"], c: 0 },
    { q: "¿El presupuesto sirve para...?", o: ["Tomar decisiones económicas", "Contratar personal", "Diseñar productos", "Medir satisfacción"], c: 0 },
    { q: "¿Qué se debe incluir en un presupuesto?", o: ["Solo gastos", "Ingresos y egresos", "Solo ingresos", "Inventarios"], c: 1 },
    { q: "¿Qué herramienta ayuda a comparar lo planificado con lo real?", o: ["Balance", "Presupuesto", "Plan estratégico", "Currículum"], c: 1 },
    { q: "Un presupuesto mal elaborado puede generar...", o: ["Mayor eficiencia", "Problemas financieros", "Más ventas", "Innovación"], c: 1 },
    { q: "¿Qué área de la empresa usa más los presupuestos?", o: ["RRHH", "Finanzas", "Marketing", "Producción"], c: 1 },
    { q: "¿Qué permite prever la necesidad de fondos?", o: ["El presupuesto", "El CV", "El profesiograma", "El inventario"], c: 0 },
    { q: "¿El presupuesto debe ser...?", o: ["Flexible y realista", "Fijo y cerrado", "Teórico", "Desordenado"], c: 0 },
  ]
};

const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const size = canvas.width / 2;
const arc = 2 * Math.PI / temas.length;
// idle rotation (degrees) when wheel is in rest state
let idleRotation = 0;
let idleRaf = null;
const idleSpeedDegPerMs = 0.01; // ~10 deg/sec
// neon palette to match CSS theme
const colors = ["#7c3aed", "#00f5d4", "#ffb86b"];

function drawWheel() {
  const startAngle = -Math.PI / 2 + (idleRotation * Math.PI) / 180;
  for (let i = 0; i < temas.length; i++) {
    const sliceStart = startAngle + i * arc;
    ctx.beginPath();
    ctx.fillStyle = colors[i % colors.length];
    ctx.moveTo(size, size);
    ctx.arc(size, size, size, sliceStart, sliceStart + arc);
    ctx.fill();

    // draw text
    ctx.save();
    ctx.translate(size, size);
    ctx.rotate(sliceStart + arc / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "rgba(8,10,14,0.95)"; // dark text for neon slices
    ctx.font = "600 18px Inter, Poppins, sans-serif";
    ctx.fillText(temas[i], size - 10, 10);
    ctx.restore();
  }
}
drawWheel();

function startIdleRotation() {
  if (idleRaf) return;
  let last = performance.now();
  function step(ts) {
    const dt = ts - last;
    last = ts;
    idleRotation = (idleRotation + dt * idleSpeedDegPerMs) % 360;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    // no extra rotation here; drawWheel uses idleRotation
    ctx.translate(size, size);
    ctx.translate(-size, -size);
    drawWheel();
    ctx.restore();
    idleRaf = requestAnimationFrame(step);
  }
  idleRaf = requestAnimationFrame(step);
}

function stopIdleRotation() {
  if (!idleRaf) return;
  cancelAnimationFrame(idleRaf);
  idleRaf = null;
}

// start idle on load
startIdleRotation();

document.getElementById("spin").addEventListener("click", spinWheel);
const spinSound = document.getElementById("spinSound");
const endSound = document.getElementById("endSound");

function spinWheel() {
  // Reset UI state so clicking "Girar Ruleta" regenerates a new session
  clearInterval(timer);
  document.getElementById("final").style.display = "none";
  document.getElementById("quiz").style.display = "none";
  document.getElementById("resultado").style.display = "none";
  const opcionesDiv = document.getElementById("opciones");
  if (opcionesDiv) opcionesDiv.innerHTML = "";
  const timerDisplay = document.getElementById("timer");
  if (timerDisplay) timerDisplay.innerText = "";
  currentQuestion = 0;
  score = 0;
  selectedTema = null;
  // stop idle rotation and capture current idle angle to include in spin
  stopIdleRotation();
  const idleAtStart = idleRotation;
  // redraw wheel to ensure visual reset
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawWheel();

  spinSound.play();
  const spinTime = Math.random() * 3000 + 3000;
  const rotation = Math.random() * 360 + 720; 

  let start = null;
  // easing function for smooth deceleration (fast -> slow)
  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }
  function animate(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    const t = Math.min(progress / spinTime, 1);
    const eased = easeOutCubic(t);
    const currentRotation = rotation * eased;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(size, size);
    ctx.rotate((currentRotation * Math.PI) / 180);
    ctx.translate(-size, -size);
    drawWheel();
    ctx.restore();
    if (progress < spinTime) {
      requestAnimationFrame(animate);
    } else {
      endSound.play();

      // include idle rotation that was active before spin started
      const finalRotation = (rotation + (typeof idleAtStart !== 'undefined' ? idleAtStart : 0)) % 360;
      const sliceSize = 360 / temas.length;
      const startDeg = -90; 
      const arrowDeg = 270;

      
      const isBetween = (angle, start, end) => {
        const a = (angle + 360) % 360;
        const s = (start + 360) % 360;
        const e = (end + 360) % 360;
        if (s <= e) return a >= s && a < e;
        return a >= s || a < e;
      };

      let selectedIndex = 0;
      for (let i = 0; i < temas.length; i++) {
        const sliceStart = startDeg + i * sliceSize;
        const sliceEnd = sliceStart + sliceSize;
        const sliceStartRot = (sliceStart + finalRotation + 360) % 360;
        const sliceEndRot = (sliceEnd + finalRotation + 360) % 360;
        if (isBetween(arrowDeg, sliceStartRot, sliceEndRot)) {
          selectedIndex = i;
          break;
        }
      }
      const temaSeleccionado = temas[selectedIndex];
      document.getElementById("resultado").style.display = "block";
      document.getElementById("temaElegido").innerText = `Tema seleccionado: ${temaSeleccionado}`;
      document.getElementById("irQuiz").onclick = () => iniciarQuiz(temaSeleccionado);
      // set idleRotation to final orientation and restart idle
      idleRotation = finalRotation % 360;
      startIdleRotation();
    }
  }
  requestAnimationFrame(animate);
}

let currentQuestion = 0, score = 0, selectedTema, timer;

function iniciarQuiz(tema) {
  selectedTema = tema;
  document.getElementById("resultado").style.display = "none";
  document.getElementById("quiz").style.display = "block";
  currentQuestion = 0;
  score = 0;
  mostrarPregunta();
}

function mostrarPregunta() {
  const preguntaActual = preguntas[selectedTema][currentQuestion];
  document.getElementById("pregunta").innerText = preguntaActual.q;
  const opcionesDiv = document.getElementById("opciones");
  opcionesDiv.innerHTML = "";

  preguntaActual.o.forEach((opcion, i) => {
    const div = document.createElement("div");
    div.className = "option";
    div.innerText = opcion;
    div.onclick = () => responder(i);
    opcionesDiv.appendChild(div);
  });

  iniciarTimer(30);
}

function responder(selectedIndex) {
  clearInterval(timer);
  const preguntaActual = preguntas[selectedTema][currentQuestion];
  const opcionesDiv = document.getElementById("opciones");
  const children = Array.from(opcionesDiv.children);

  const correctIndex = preguntaActual.c;
  children.forEach((child, i) => {
    child.style.pointerEvents = 'none';
    child.classList.remove('correct', 'wrong');
    if (i === correctIndex) child.classList.add('correct');
    if (i === selectedIndex && i !== correctIndex) child.classList.add('wrong');
  });

  const timerDisplay = document.getElementById("timer");
  if (selectedIndex === correctIndex) {
    score++;
    timerDisplay.innerText = "¡Correcto!";
    timerDisplay.style.color = "#0b5f13";
  } else if (selectedIndex === -1) {
    timerDisplay.innerText = "Tiempo agotado";
    timerDisplay.style.color = "#e63946";
  } else {
    timerDisplay.innerText = "Incorrecto";
    timerDisplay.style.color = "#8b0a0a";
  }
  currentQuestion++;
  setTimeout(() => {
    if (currentQuestion < 10) {
      const timerDisplay = document.getElementById("timer");
      timerDisplay.style.color = "#e63946";
      mostrarPregunta();
    } else {
      mostrarResultado();
    }
  }, 1000);
}

function iniciarTimer(segundos) {
  let tiempo = segundos;
  const timerDisplay = document.getElementById("timer");
  timerDisplay.innerText = `Tiempo: ${tiempo}s`;
  timer = setInterval(() => {
    tiempo--;
    timerDisplay.innerText = `Tiempo: ${tiempo}s`;
    if (tiempo <= 0) {
      clearInterval(timer);
        responder(-1);
    }
  }, 1000);
}

function mostrarResultado() {
  document.getElementById("quiz").style.display = "none";
  document.getElementById("final").style.display = "block";
  document.getElementById("puntaje").innerText = `Respuestas correctas: ${score} de 10`;
}
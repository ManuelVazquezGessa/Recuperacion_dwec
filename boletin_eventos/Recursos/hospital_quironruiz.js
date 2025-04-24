let SEGUROS_MEDICOS = [{
    value: 1,
    texto: 'Adeslas'
  },
  {
    value: 2,
    texto: 'Asisa'
  },
  {
    value: 3,
    texto: 'Caser Salud'
  },
  {
    value: 4,
    texto: 'DKV'
  },
  {
    value: 5,
    texto: 'Mapfre'
  },
  {
    value: 6,
    texto: 'Sanitas'
  }
];

function inicio() {
  let boton = document.getElementById("enviar");
  boton.addEventListener("click", comprobarDNI);

  obligatorio();
  seguros_medicos();
  especialidad();

  document.getElementById("inputFechaCita").addEventListener("change", () => {
    fecha();            // Validación de día de la semana
    validarHoraCita();  // Revalida la hora si cambia la fecha
  });

  document.getElementById("inputHoraCita").addEventListener("change", validarHoraCita);
}



function obligatorio() {
  let nombre = document.getElementById("inputNombre");
  let apellido = document.getElementById("inputApellidos");
  let fecha = document.getElementById("inputFechaCita");
  let hora = document.getElementById("inputHoraCita");

  nombre.setAttribute("required", true);
  apellido.setAttribute("required", true)
  fecha.setAttribute("required", true);
  hora.setAttribute("required", true);
}

function comprobarDNI() {
  let inputDni = document.getElementById("inputDNI");
  let patron = /^\d{8}[trwagmyfpdxbnjzsqvhlcke]$/i;
  let comprobar = patron.test(inputDni.value);
  if (comprobar) {
    inputDni.setCustomValidity("");
  } else {
    inputDni.setCustomValidity("Formato de DNI no válido");
  }
}

function seguros_medicos() {
  let seguroMedico = document.getElementById("inputSeguroMedico");

  SEGUROS_MEDICOS.forEach(seguro => {
    let option = document.createElement("option");
    option.value = seguro.value;
    option.textContent = seguro.texto;
    seguroMedico.appendChild(option);
  });
}

function especialidad() {
  let radioFamilia = document.getElementById("inputMedicoFamilia");
  let radioEspecialista = document.getElementById("inputMedicoEspecialista");
  let selectEspecialidad = document.getElementById("inputEspecialidad");

  function actualizar() {
    if (radioEspecialista.checked) {
      selectEspecialidad.removeAttribute("disabled");
      selectEspecialidad.setAttribute("required", true);
    } else {
      selectEspecialidad.setAttribute("disabled", true);
      selectEspecialidad.removeAttribute("required");
      selectEspecialidad.value = "";
    }
  }

  actualizar();

  radioFamilia.addEventListener("change", actualizar);
  radioEspecialista.addEventListener("change", actualizar);
}

function fecha() {
  let inputFecha = document.getElementById("inputFechaCita");
  inputFecha.setAttribute("required", true); 

  let fechaSeleccionada = inputFecha.value;
  if (!fechaSeleccionada) {
    inputFecha.setCustomValidity("Por favor, selecciona una fecha.");
    return;
  }

  let fecha = new Date(fechaSeleccionada);
  let diaSemana = fecha.getDay();

  if (diaSemana < 1 || diaSemana > 4) {
    inputFecha.setCustomValidity("El día de la cita sólo puede ser de lunes a jueves");
  } else {
    inputFecha.setCustomValidity(""); 
  }
}

function validarHoraCita() {
  let inputHora = document.getElementById("inputHoraCita");
  let inputFecha = document.getElementById("inputFechaCita");

  let horaSeleccionada = inputHora.value;
  let fechaSeleccionada = inputFecha.value;

  if (!horaSeleccionada) {
    inputHora.setCustomValidity("Por favor, selecciona una hora.");
    return;
  }

  let fecha = new Date(fechaSeleccionada);
  let diaSemana = fecha.getDay(); 

  let [horas, minutos] = horaSeleccionada.split(":").map(Number);
  let totalMinutos = horas * 60 + minutos;

  let horaValida = false;

  if (diaSemana >= 1 && diaSemana <= 3) {
    horaValida = totalMinutos >= 600 && totalMinutos <= 855;
    if (!horaValida) {
      inputHora.setCustomValidity("Para lunes a miércoles, la hora debe estar entre 10:00 y 14:15.");
      return;
    }
  } else if (diaSemana === 4) {
    horaValida = totalMinutos >= 1110 && totalMinutos <= 1200;
    if (!horaValida) {
      inputHora.setCustomValidity("Para los jueves, la hora debe estar entre 18:30 y 20:00.");
      return;
    }
  } else {
    inputHora.setCustomValidity("La fecha debe ser de lunes a jueves para seleccionar hora.");
    return;
  }

  inputHora.setCustomValidity("");
}


addEventListener("load", inicio);
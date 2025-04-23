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
  especialidad(); 
  seguros_medicos();
}



function obligatorio() {
  let nombre = document.getElementById("inputNombre");
  let apellido = document.getElementById("inputApellidos");

  nombre.setAttribute("required", "true");
  apellido.setAttribute("required", "true");
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
  let medico = document.getElementsByName("medico");
  let select = document.getElementById("inputEspecialidad");
  for (i = 0; i < medico.length; i++) {
    if (medico[i].checked) {
      if (medico[i].id == "inputMedicoEspecialista") {
        select.removeAttribute("disabled");
        select.setAttribute("required", true);
      } else if (medico[i].id == "inputMedicoFamilia") {
        select.removeAttribute("required");
        select.setAttribute("disabled", true);
      }
    }
  }
}


addEventListener("load", inicio);
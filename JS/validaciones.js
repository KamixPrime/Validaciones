export function validar(input) {
  const tipoDeInput = input.dataset.tipo;
  if (validadores[tipoDeInput]) {
    validadores[tipoDeInput](input);
  }

  if (input.validity.valid) {
    input.parentElement.classList.remove("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML ="";
  } else {
    input.parentElement.classList.add("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);
  }
}

const tipoDeErrores = [
  "valueMissing",
  "typeMismatch",
  "paternMismatch",
  "customError",
];

const mensajesDeError = {
  nombre: {
    valueMissing: "Este campo no pued estar vacio",
  },
  email: {
    valueMissing: "Este campo no puede estar vacio",
    typeMismatch: "El correo no es valido",
  },
  password: {
    valueMissing: "Este campo no puede estar vacio",
    paternMismatch: 
    "Al menos 6 caracteres, maximo 12, debe contener una letra minuscula, una letra mayuscula, un numero y no puede contener caracteres especiales. ",
  },
  nacimiento: {
    valueMissing: "Este campo no puede estar vacio",
    customError: "Debes tener al menos 18 años de edad.",
  },
  numero: {
    valueMissing:"Este campo no puede estar vacio",
    paternMismatch:"El formato requerido es XXXXXXXXXX 10 numeros.",
  },
  direccion: {
    valueMissing:"Este campo no puede estar vacio",
    paternMismatch:"La direccion debe tener entre 10 y 40 caracteres. ",
  },
  ciudad: {
    valueMissing:"Este campo no puede estar vacio",
    paternMismatch:"La ciudad debe tener entre 10 y 40 caracteres. ",
  },
  estado: {
    valueMissing:"Este campo no puede estar vacio",
    paternMismatch:"La estado debe tener entre 10 y 40 caracteres. ",
  }
};

const validadores = {
  nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeInput, input) {
  let mensaje = "";
  tipoDeErrores.forEach((error) => {
    if(input.validity[error]){
      console.log(tipoDeInput, error);
      console.log(input.validity[error]);
      console.log(mensajesDeError[tipoDeInput][error]);
      mensaje = mensajesDeError[tipoDeInput][error];
    }
  });
  return mensaje;
}

function validarNacimiento(input) {
  const fechaCliente = new Date(input.value);
  let mensaje = "";
  if (!mayorDeEdad (fechaCliente)){
    mensaje = "Debes tener al menos 18 años de edad."
  };

  input.setCustomValidity(mensaje);  
}

function mayorDeEdad(fecha) {
  const fechaActual = new Date ();
  const diferenciaFechas = new Date (
    fecha.getUTCFullYear() + 18, 
    fecha.getUTCMonth(), 
    fecha.getUTCDate());
  return diferenciaFechas <= fechaActual;
} 
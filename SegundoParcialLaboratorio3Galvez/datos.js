class Persona {
  constructor(id, nombre, apellido, edad) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
  }

  toString() {
    return `${this.nombre} ${this.apellido}, Edad: ${this.edad}`;
  }

  toJson() {
    return JSON.stringify({
      id: this.id,
      nombre: this.nombre,
      apellido: this.apellido,
      edad: this.edad,
    });
  }
}

class Futbolista extends Persona {
  constructor(id, nombre, apellido, edad, equipo, posicion, cantidadGoles) {
    // Llama al constructor de la clase padre (Persona)
    super(id, nombre, apellido, edad, equipo, posicion, cantidadGoles);

    this.equipo = equipo;
    this.posicion = posicion;
    this.cantidadGoles = cantidadGoles;
  }

  toString() {
    return `${super.toString()}, Equipo: $${this.equipo}, Posicion: ${
      this.posicion
    }, CantidadGoles: $${this.cantidadGoles}`;
  }
}

class Profesional extends Persona {
  constructor(id, nombre, apellido, edad, titulo, facultad, añoGraduacion) {
    // Llama al constructor de la clase padre (Persona)
    super(id, nombre, apellido, edad, titulo, facultad, añoGraduacion);

    this.titulo = titulo;
    this.facultad = facultad;
    this.añoGraduacion = añoGraduacion;
  }

  toString() {
    return `${super.toString()}, Titulo: $${this.titulo}, Facultad: ${
      this.facultad
    }, AnioGraduacion: ${this.añoGraduacion}`;
  }
}

function validarCampos(nombre, apellido, edad) {
  const errores = [];

  if (nombre.trim() === "" || !isNaN(nombre.trim())) {
    errores.push("El nombre es obligatorio y debe contener letras");
  }

  if (apellido.trim() === "" || !isNaN(apellido.trim())) {
    errores.push("El apellido es obligatorio y debe contener letras");
  }

  if (isNaN(edad) || edad <= 15) {
    errores.push("La edad debe ser un número entero mayor a 15.");
  }

  return errores;
}

function validarFutbolista(
  nombre,
  apellido,
  edad,
  equipo,
  posicion,
  cantidadGoles
) {
  const errores = validarCampos(nombre, apellido, edad);

  if (equipo.trim() === "" || !isNaN(equipo.trim())) {
    errores.push("El equipo es obligatorio y debe contener letras");
  }

  if (posicion.trim() === "" || !isNaN(posicion.trim())) {
    errores.push("La posicion es obligatorio y debe contener letras");
  }

  if (isNaN(cantidadGoles) || cantidadGoles <= -1) {
    errores.push("La cantidad de goles debe ser un número mayor a -1.");
  }

  return errores;
}

function validarProfesional(
  nombre,
  apellido,
  edad,
  titulo,
  facultad,
  añoGraduacion
) {
  const errores = validarCampos(nombre, apellido, edad);
  console.log(facultad);

  if (titulo.trim() === "" || !isNaN(titulo.trim())) {
    errores.push("El titulo es obligatorio y debe contener letras");
  }

  if (facultad.trim() === "" || !isNaN(facultad.trim())) {
    errores.push("La facultad es obligatorio y debe contener letras");
  }

  if (isNaN(añoGraduacion) || añoGraduacion <= 1950) {
    errores.push("El añoGraduacion deben ser un número mayor a 1950.");
  }

  return errores;
}

// Muestra el spinner
function showSpinner(spinner) {
  if (spinner) {
    spinner.style.display = "flex";
  } else {
    console.error(
      "El elemento spinner no existe o no se ha pasado correctamente a la función showSpinner"
    );
  }
}

// Oculta el spinner
function hideSpinner(spinner) {
  spinner.style.display = "none";
}

const spinner = document.getElementById("spinner");
document.addEventListener("DOMContentLoaded", function () {
  // Ejemplo de uso: Simular una carga de 3 segundos
  showSpinner(spinner);
  setTimeout(() => {
    hideSpinner(spinner);
  }, 3000);
});

arrayPersonas = [];

document.addEventListener("DOMContentLoaded", function () {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "PersonasFutbolistasProfesionales.php", true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      var data = JSON.parse(xhr.responseText);
      for (var i = 0; i < data.length; i++) {
        var obj = data[i];
        if (obj.equipo && obj.posicion && obj.cantidadGoles) {
          arrayPersonas.push(
            new Futbolista(
              obj.id,
              obj.nombre,
              obj.apellido,
              obj.edad,
              obj.equipo,
              obj.posicion,
              obj.cantidadGoles
            )
          );
        } else if (obj.titulo && obj.facultad && obj.añoGraduacion) {
          arrayPersonas.push(
            new Profesional(
              obj.id,
              obj.nombre,
              obj.apellido,
              obj.edad,
              obj.titulo,
              obj.facultad,
              obj.añoGraduacion
            )
          );
        }
      }
      // Ahora, 'arrayPersonas' contiene todos los objetos de las clases Empleado y Cliente

      // Insertar las personas en la tabla
      insertarPersonas(arrayPersonas);
    } else {
      alert("Hubo un error al recuperar los datos");
    }
  };
  xhr.send();
});

function insertarPersonas(personas) {
  console.log(personas);

  // Obtén una referencia al cuerpo de la tabla
  const tablaCuerpo = document.getElementById("tablaCuerpo");

  tablaCuerpo.innerHTML = "";

  // Recorre el array de personas y crea una fila para cada objeto
  personas.forEach((objeto) => {
    const nuevaFila = document.createElement("tr");
    nuevaFila.id = `fila_con_id-${objeto.id}`; // Asigna un id a la fila
    console.log(nuevaFila.id);
    nuevaFila.innerHTML = `
          <td>${objeto.id}</td>
          <td>${objeto.nombre}</td>
          <td>${objeto.apellido}</td>
          <td>${objeto.edad}</td>
          <td>${objeto.equipo || "N/A"}</td>
          <td>${objeto.posicion || "N/A"}</td>
          <td>${objeto.cantidadGoles || "N/A"}</td>
          <td>${objeto.titulo || "N/A"}</td>
          <td>${objeto.facultad || "N/A"}</td>
          <td>${objeto.añoGraduacion || "N/A"}</td>
          <td><span onclick="modificarUsuario(${
            objeto.id
          })">Modificar</span></td>
          <td><span onclick="eliminarUsuario(${objeto.id})">Eliminar</span></td>
      `;
    tablaCuerpo.appendChild(nuevaFila);
  });
}

// Obtén los encabezados de la tabla
let headers = Array.from(document.querySelectorAll("#tablaDatos th"));

// Añade un evento de click a cada encabezado
headers.forEach((header, index) => {
  header.addEventListener("click", () => {
    sortTable(index);
  });
});

function sortTable(index) {
  // Obtén las filas de la tabla
  let rows = Array.from(document.querySelectorAll("#tablaDatos tbody tr"));

  // Ordena las filas
  let sortedRows = rows.sort((a, b) => {
    let aValue = a.children[index].textContent;
    let bValue = b.children[index].textContent;

    // Si las celdas contienen números, conviértelos a números para la comparación
    if (!isNaN(aValue)) {
      aValue = Number(aValue);
      bValue = Number(bValue);
    }

    if (aValue < bValue) {
      return -1;
    } else if (aValue > bValue) {
      return 1;
    } else {
      return 0;
    }
  });

  // Elimina las filas actuales de la tabla
  rows.forEach((row) => {
    row.parentNode.removeChild(row);
  });

  // Añade las filas ordenadas a la tabla
  let tbody = document.querySelector("#tablaDatos tbody");
  sortedRows.forEach((row) => {
    tbody.appendChild(row);
  });
}

function mostrarError(mensaje) {
  const mensajeError = document.getElementById("mensaje_error");
  mensajeError.textContent = mensaje;
  mensajeError.style.display = "block"; // Mostrar el mensaje de error
}

// Función para ocultar el mensaje de error
function ocultarError() {
  const mensajeError = document.getElementById("mensaje_error");
  mensajeError.textContent = ""; // Limpiar el contenido del mensaje
  mensajeError.style.display = "none"; // Ocultar el mensaje de error
}

function refrescarInputs() {
  document.getElementById("nombre").value = "";
  document.getElementById("apellido").value = "";
  document.getElementById("edad").value = "";
  document.getElementById("equipo_agregar").value = "";
  document.getElementById("posicion_agregar").value = "";
  document.getElementById("goles_agregar").value = "";
  document.getElementById("titulo_agregar").value = "";
  document.getElementById("facultad_agregar").value = "";
  document.getElementById("añoGraduacion_agregar").value = "";
}

function cambioABMParaAlta() {
  document.getElementById("tipo_persona_label").style.display = "block";
  document.getElementById("tipo_agregar").style.display = "block";
  document.getElementById("btn_aceptar").style.display = "block";
  document.getElementById("btn_cancelar").style.display = "block";
  document.getElementById("encabezado_form_abm").innerText =
    "****************Alta****************";

  document.getElementById("btn_aceptar_cambio").style.display = "none";
  document.getElementById("btn_cancelar_cambio").style.display = "none";
  document.getElementById("btn_aceptar_eliminacion").style.display = "none";
  document.getElementById("btn_cancelar_eliminacion").style.display = "none";


  cambiarABMParaTipoSeleccionado(document.getElementById("tipo_agregar").value);
}

//FORMULARIO ABM CAMBIO DE TIPO DE PERSONA A AGREGAR

//referencia al selector de tipo en el segundo formulario
const tipoAgregarSelect = document.getElementById("tipo_agregar");

const nombreInput = document.getElementById("nombre");
const apellidoInput = document.getElementById("apellido");
const edadInput = document.getElementById("edad");

//referencia a los campos en el segundo formulario
const equipoInput = document.getElementById("equipo_agregar");
const posicionInput = document.getElementById("posicion_agregar");
const golesInput = document.getElementById("goles_agregar");

const tituloInput = document.getElementById("titulo_agregar");
const facultadInput = document.getElementById("facultad_agregar");
const añoGraduacionInput = document.getElementById("añoGraduacion_agregar");

//referencia a los labels de los campos en el segundo formulario
const equipoLabel = document.getElementById("equipo_agregar_label");
const posicionLabel = document.getElementById("posicion_agregar_label");
const golesLabel = document.getElementById("goles_agregar_label");

const tituloLabel = document.getElementById("titulo_agregar_label");
const facultadLabel = document.getElementById("facultad_agregar_label");
const añoGraduacionLabel = document.getElementById(
  "añoGraduacion_agregar_label"
);

// Agrega un evento change al selector de tipo
tipoAgregarSelect.addEventListener("change", function () {
  const tipoSeleccionado = tipoAgregarSelect.value;

  nombreInput.value = "";
  apellidoInput.value = "";
  edadInput.value = "";

  // Ocultar todos los campos y labels por defecto
  equipoLabel.style.display = "none";
  equipoInput.style.display = "none";

  posicionLabel.style.display = "none";
  posicionInput.style.display = "none";

  golesLabel.style.display = "none";
  golesInput.style.display = "none";

  tituloLabel.style.display = "none";
  tituloInput.style.display = "none";

  facultadLabel.style.display = "none";
  facultadInput.style.display = "none";

  añoGraduacionLabel.style.display = "none";
  añoGraduacionInput.style.display = "none";

  cambiarABMParaTipoSeleccionado(tipoSeleccionado);
});

function cambiarABMParaTipoSeleccionado(tipoSeleccionado) {
  // Mostrar campos y labels según el tipo seleccionado
  if (tipoSeleccionado === "futbolista") {
    equipoLabel.style.display = "inline";
    equipoInput.style.display = "inline";

    posicionLabel.style.display = "inline";
    posicionInput.style.display = "inline";

    golesLabel.style.display = "inline";
    golesInput.style.display = "inline";
  } else if (tipoSeleccionado === "profesional") {
    tituloLabel.style.display = "inline";
    tituloInput.style.display = "inline";

    facultadLabel.style.display = "inline";
    facultadInput.style.display = "inline";

    añoGraduacionLabel.style.display = "inline";
    añoGraduacionInput.style.display = "inline";
  }
}

function ocultarABMFormulario() {
  document.getElementById("form_agregar").style.display = "none";
}
function mostrarABMFormulario() {
  document.getElementById("form_agregar").style.display = "block";
}

function ocultarFormularioPrincipal() {
  document.getElementById("form_principal").style.display = "none";
}
function mostrarFormularioLista() {
  document.getElementById("form_principal").style.display = "block";
}



function hacerTextoInput() {
    document.getElementById("nombre").readOnly = false;
    document.getElementById("apellido").readOnly = false;
    document.getElementById("edad").readOnly = false;
    document.getElementById("equipo_agregar").readOnly = false;
    document.getElementById("posicion_agregar").readOnly = false;
    document.getElementById("goles_agregar").readOnly = false;
    document.getElementById("titulo_agregar").readOnly = false;
    document.getElementById("facultad_agregar").readOnly = false;
    document.getElementById("añoGraduacion_agregar").readOnly = false;
  }

//*************************************PUNTO 4 ALTAS************************************************** */

function agregarObjeto() {
  // Obtén una referencia al cuerpo de la tabla
  const tablaCuerpo = document.getElementById("tablaCuerpo");

  // Obtén los valores de los campos
  const tipo = document.getElementById("tipo_agregar").value;
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const edad = parseInt(document.getElementById("edad").value);

  erroresValidacion = "";

  // Crear el objeto según el tipo seleccionado
  let objeto = null;

  if (tipo === "futbolista") {
    const equipo = document.getElementById("equipo_agregar").value;
    const posicion = document.getElementById("posicion_agregar").value;
    const cantidadGoles = parseInt(
      document.getElementById("goles_agregar").value
    );
    // Validar los campos
    erroresValidacion = validarFutbolista(
      nombre,
      apellido,
      edad,
      equipo,
      posicion,
      cantidadGoles
    );
    objeto = new Futbolista(
      0,
      nombre,
      apellido,
      edad,
      equipo,
      posicion,
      cantidadGoles
    );
  } else if (tipo === "profesional") {
    const titulo = document.getElementById("titulo_agregar").value;
    const facultad = document.getElementById("facultad_agregar").value;
    const añoGraduacion = parseInt(
      document.getElementById("añoGraduacion_agregar").value
    );
    erroresValidacion = validarProfesional(
      nombre,
      apellido,
      edad,
      titulo,
      facultad,
      añoGraduacion
    );
    objeto = new Profesional(
      0,
      nombre,
      apellido,
      edad,
      titulo,
      facultad,
      añoGraduacion
    );
  }

  if (erroresValidacion.length > 0) {
    mostrarError(erroresValidacion.join(" "));
    return;
  }

  if (objeto !== null) {
    console.log(objeto);
    return objeto;
  }
}

document
  .getElementById("btn_agregar_elemento")
  .addEventListener("click", function (evento) {
    evento.preventDefault(); // Prevenir el comportamiento predeterminado del botón
    refrescarInputs();
    cambioABMParaAlta();
    hacerTextoInput();

    document.getElementById("form_principal").style.display = "none";
    document.getElementById("form_agregar").style.display = "block";
    document.getElementById("btn_aceptar_cambio").style.display = "none";
    document.getElementById("btn_cancelar_cambio").style.display = "none";

    // Eliminar el event listener existente antes de agregar uno nuevo
    const btnAceptar = document.getElementById("btn_aceptar");
    btnAceptar.removeEventListener("click", handlerAgregarPersona);

    btnAceptar.addEventListener("click", handlerAgregarPersona);

    ///EVENTO PARA OCULTAR SEGUNDO FORMULARIO
    const botonCancelar = document.getElementById("btn_cancelar");
    // Agregar un evento click al botón "Cancelar"
    botonCancelar.addEventListener("click", function (event) {
      event.preventDefault(); // Prevenir el comportamiento predeterminado del botón
      document.getElementById("form_agregar").style.display = "none"; // Oculta el segundo formulario
      document.getElementById("form_principal").style.display = "block"; // muestra el form principal
    });
  });

async function handlerAgregarPersona(event) {
  ocultarError();
  event.preventDefault();
  showSpinner(spinner);
  setTimeout(() => {
    hideSpinner(spinner);
  }, 3000);

  var elemento = agregarObjeto();

  var headers = new Headers({
    "Content-Type": "application/json",
  });
  var init = {
    method: "PUT",
    headers: headers,
    body: JSON.stringify(elemento),
  };

  try {
    var response = await fetch("PersonasFutbolistasProfesionales.php", init);

    if (response.status === 200) {
      var data = await response.json();
      elemento.id = data.id;
      arrayPersonas.push(elemento);
      insertarPersonas(arrayPersonas);
      document.getElementById("spinner").style.display = "none";
      document.getElementById("form_agregar").style.display = "none";
      document.getElementById("form_principal").style.display = "block";
      ocultarError();
    } else {
      throw new Error("Error: " + response.status);
    }
  } catch (error) {
    console.log("Hubo un problema con la operación fetch: " + error.message);
    document.getElementById("spinner").style.display = "none";
    document.getElementById("form_agregar").style.display = "none";
    document.getElementById("form_principal").style.display = "block";
    alert(
      "No se pudo realizar la operación. Por favor, inténtelo de nuevo más tarde."
    );
    ocultarError();
  }
}

////*******************************************PUNTO 5 MODIFICACION********************************************* */

function modificarUsuario(idPersona) {
  console.log("Id de persona a modificar: " + idPersona);

  const resultado = confirm(
    "Está seguro/a de modificar el id " + idPersona + "?"
  );

  if (!resultado) {
    console.log("Cancelado");
    return;
  } else {
    refrescarInputs();

    document.getElementById("form_principal").style.display = "none";
    document.getElementById("form_agregar").style.display = "block";
    var objetoEncontrado = arrayPersonas.find(function (objeto) {
      return objeto.id === idPersona;
    });

    cambiarFormABMParaModificar(objetoEncontrado);
    hacerTextoInput();

    document.getElementById("btn_aceptar_cambio").removeEventListener("click", (event) => {
        handlerModificarPersona(event, objetoEncontrado);
      });
      
      document.getElementById("btn_aceptar_cambio").addEventListener("click", (event) => {
        handlerModificarPersona(event, objetoEncontrado);
      });
      

    const botonCancelarCambio = document.getElementById("btn_cancelar_cambio");
    botonCancelarCambio.addEventListener("click", function (event) {
      event.preventDefault();
      document.getElementById("form_agregar").style.display = "none";
      document.getElementById("form_principal").style.display = "block";
    });
  }
}

function handlerModificarPersona(event, objetoEncontrado) {
  event.preventDefault();
  showSpinner(spinner);
  setTimeout(() => {
    hideSpinner(spinner);
  }, 3000);

  var elemento = objetoEncontrado;

  elemento.nombre = document.getElementById("nombre").value;
  elemento.apellido = document.getElementById("apellido").value;
  elemento.edad = parseInt(document.getElementById("edad").value);
  if (elemento instanceof Futbolista) {
    elemento.equipo = document.getElementById("equipo_agregar").value;
    elemento.posicion = document.getElementById("posicion_agregar").value;
    elemento.cantidadGoles = document.getElementById("goles_agregar").value;
  } else {
    elemento.titulo = document.getElementById("titulo_agregar").value;
    elemento.facultad = document.getElementById("facultad_agregar").value;
    elemento.añoGraduacion = document.getElementById(
      "añoGraduacion_agregar"
    ).value;
  }

  var headers = new Headers({
    "Content-Type": "application/json",
  });

  var init = {
    method: "POST",
    headers: headers,
    body: JSON.stringify(elemento),
  };

  fetch("PersonasFutbolistasProfesionales.php", init)
    .then(function (response) {
        console.log("entre al then 1 de modificar");
        return response.json();
    })
    .then(function (data) {
      if (data.status === 200) {
        console.log("entre al then 2 de modificar");
        var elementoIndex = arrayPersonas.findIndex(function (persona) {
          return persona.id === idPersona;
        });
        console.log(data.id);
        elemento.id = data.id;
        arrayPersonas[elementoIndex] = elemento;
        insertarPersonas(arrayPersonas);
        document.getElementById("form_agregar").style.display = "none";
        document.getElementById("form_principal").style.display = "block";
        console.log("entré al then 2 de modificar");
      } else {
        throw new Error("Error: " + data.status);
      }
    })
    .catch(function (error) {
      console.log("Hubo un problema con la operación fetch: " + error.message);
      document.getElementById("spinner").style.display = "none";
      document.getElementById("form_agregar").style.display = "none";
      document.getElementById("form_principal").style.display = "block";
    });
}

function cambiarFormABMParaModificar(objeto) {
  document.getElementById("tipo_agregar").style.display = "none";
  document.getElementById("tipo_persona_label").style.display = "none";
  document.getElementById("btn_aceptar").style.display = "none";
  document.getElementById("btn_cancelar").style.display = "none";
  document.getElementById("btn_aceptar_eliminacion").style.display = "none";
  document.getElementById("btn_cancelar_eliminacion").style.display = "none";

  document.getElementById("btn_aceptar_cambio").style.display = "block";
  document.getElementById("btn_cancelar_cambio").style.display = "block";

  document.getElementById("encabezado_form_abm").innerText =
    "*************Modificacion*************";
  cambiarABMParaTipoSeleccionado(objeto.tipo);
  insertarDatosSegunTipoParaModificarOEliminar(objeto);
}

function insertarDatosSegunTipoParaModificarOEliminar(objeto) {
  document.getElementById("nombre").value = objeto.nombre;
  document.getElementById("apellido").value = objeto.apellido;
  document.getElementById("edad").value = objeto.edad;
  if (objeto instanceof Futbolista) {
    document.getElementById("tipo_agregar").value = "futbolista";

    equipo_agregar.value = objeto.equipo;
    posicion_agregar.value = objeto.posicion;
    goles_agregar.value = objeto.cantidadGoles;

    document.getElementById("equipo_agregar_label").style.display = "inline";
    document.getElementById("posicion_agregar_label").style.display = "inline";
    document.getElementById("goles_agregar_label").style.display = "inline";

    equipo_agregar.style.display = "inline";
    posicion_agregar.style.display = "inline";
    goles_agregar.style.display = "inline";

    document.getElementById("titulo_agregar_label").style.display = "none";
    document.getElementById("facultad_agregar_label").style.display = "none";
    document.getElementById("añoGraduacion_agregar_label").style.display = "none";

    titulo_agregar.style.display = "none";
    facultad_agregar.style.display = "none";
    añoGraduacion_agregar.style.display = "none";
  } else {
    document.getElementById("tipo_agregar").value = "profesional";

    titulo_agregar.value = objeto.titulo;
    facultad_agregar.value = objeto.facultad;
    añoGraduacion_agregar.value = objeto.añoGraduacion;

    document.getElementById("titulo_agregar_label").style.display = "inline";
    document.getElementById("facultad_agregar_label").style.display = "inline";
    document.getElementById("añoGraduacion_agregar_label").style.display = "inline";

    titulo_agregar.style.display = "inline";
    facultad_agregar.style.display = "inline";
    añoGraduacion_agregar.style.display = "inline";


    document.getElementById("equipo_agregar_label").style.display = "none";
    document.getElementById("posicion_agregar_label").style.display = "none";
    document.getElementById("goles_agregar_label").style.display = "none";

    equipo_agregar.style.display = "none";
    posicion_agregar.style.display = "none";
    goles_agregar.style.display = "none";
  }
}

////*******************************************PUNTO 6 ELIMINAR********************************************* */

function eliminarUsuario(idPersona) {
  console.log("Id de persona a eliminar: " + idPersona);

  const resultado = confirm(
    "Está seguro/a de eliminar el id " + idPersona + "?"
  );

  if (!resultado) {
    console.log("Cancelado");
    return;
  } else {
    ocultarFormularioPrincipal();
    mostrarABMFormulario();
    var objetoEncontrado = arrayPersonas.find(function (objeto) {
      return objeto.id === idPersona;
    });
    cambiarFormABMParaEliminar(objetoEncontrado);
    hacerTextoSoloLectura();

    document
      .getElementById("btn_aceptar_eliminacion")
      .addEventListener("click", function (event) {
        // Bloquear la pantalla con el Spinner
        event.preventDefault();
        showSpinner(spinner);
        setTimeout(() => {
          hideSpinner(spinner);
        }, 3000);
        var idElemento = { id: idPersona };
        var headers = new Headers({
          "Content-Type": "application/json",
        });
        var init = {
          method: "DELETE",
          headers: headers,
          body: JSON.stringify(idElemento),
        };

        fetch("PersonasFutbolistasProfesionales.php", init)
          .then(function (response) {
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
              if (response.status === 200) {
                return response.json();
              } else {
                throw new Error("Error: " + response.status);
              }
            } else {
              return response.text();
            }
          })
          .then(function (data) {
            if (data.status === 200) {
              var elementoIndex = arrayPersonas.findIndex(function (persona) {
                return persona.id === idPersona;
              });
              console.log(data.id);
              arrayPersonas.splice(elementoIndex, 1); // Eliminar a la persona de la lista
              insertarPersonas(arrayPersonas);
              document.getElementById("form_agregar").style.display = "none";
              document.getElementById("form_principal").style.display = "block";
              console.log("entré al then 2 de modificar");
            } else {
              throw new Error("Error: " + data.status);
            }

            console.log(arrayPersonas);
            console.log(data);
          })
          .catch(function (error) {
            console.log(
              "Hubo un problema con la operación fetch: " + error.message
            );
            document.getElementById("spinner").style.display = "none";
            document.getElementById("form_agregar").style.display = "none";
            document.getElementById("form_principal").style.display = "block";
          });

       
      });

    console.log("Persona eliminada");
  }

  ///EVENTO PARA OCULTAR SEGUNDO FORMULARIO
  const botonCancelarEliminacion = document.getElementById(
    "btn_cancelar_eliminacion"
  );
  // Agregar un evento click al botón "Cancelar"
  botonCancelarEliminacion.addEventListener("click", function (event) {
    //ocultarError();
    event.preventDefault(); // Prevenir el comportamiento predeterminado del botón
    ocultarABMFormulario();
    mostrarFormularioLista();
  });
}

function cambiarFormABMParaEliminar(objeto) {
  document.getElementById("tipo_agregar").style.display = "none";
  document.getElementById("tipo_persona_label").style.display = "none";
  document.getElementById("btn_aceptar").style.display = "none";
  document.getElementById("btn_cancelar").style.display = "none";
  document.getElementById("btn_aceptar_cambio").style.display = "none";
  document.getElementById("btn_cancelar_cambio").style.display = "none";

  document.getElementById("btn_aceptar_eliminacion").style.display = "block";
  document.getElementById("btn_cancelar_eliminacion").style.display = "block";

  document.getElementById("encabezado_form_abm").innerText =
    "*************Eliminacion*************";
  cambiarABMParaTipoSeleccionado(objeto.tipo);
  insertarDatosSegunTipoParaModificarOEliminar(objeto);
}

function hacerTextoSoloLectura() {
  document.getElementById("nombre").readOnly = true;
  document.getElementById("apellido").readOnly = true;
  document.getElementById("edad").readOnly = true;
  document.getElementById("equipo_agregar").readOnly = true;
  document.getElementById("posicion_agregar").readOnly = true;
  document.getElementById("goles_agregar").readOnly = true;
  document.getElementById("titulo_agregar").readOnly = true;
  document.getElementById("facultad_agregar").readOnly = true;
  document.getElementById("añoGraduacion_agregar").readOnly = true;
}

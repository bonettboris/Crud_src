(function() {

  'use strict';

  var vueltaId = 0;
  var contenidoInfo = document.getElementById('contenidoInfo');
  var guradarLS = document.getElementById("guardarLS");
  var removerIcono;
  var actualizarIcono;
  var listadoDeDatos;

  // Inicializar lista de datos
  // Agregar evento al boton guardar
  // Renderizar la lista

  //comienzo de inicializar
  function inicializar() {

    if (!!(window.localStorage.getItem('datos'))) {
      listadoDeDatos = JSON.parse(window.localStorage.getItem('datos'));
    } else {
      listadoDeDatos = [];
    }
    guradarLS.addEventListener('click', guardarStorage);
    mostrarLista();
  }

  //fin Inicializar

  //CRUD tareas

  function mostrarLista() {

    if (!!listadoDeDatos.length) {
      obtenerUltimoId();
      for (var item in listadoDeDatos) {
        var tarea = listadoDeDatos[item];
        listaDatos(tarea);
      }
      sincronizarEventos();
    }

  }

  function guardarStorage() {

    var datos = {
      id: vueltaId,
      nombre: document.getElementById('nombre').value,
      apellido: document.getElementById('apellido').value
    };
    listadoDeDatos.push(datos);
    sincronizacionTareas();
    listaDatos(datos);
    sincronizarEventos();
    vueltaId++;
  }

  function listaDatos(task) {

    var removerIcono = document.createElement('span');
    var elemento = document.createElement('li');
    var actualizarIcono = document.createElement('span');

    removerIcono.innerHTML = "X";
    removerIcono.className = "remove_item clickeable";
    removerIcono.setAttribute("title", "Remove");

    actualizarIcono.innerHTML = "U";
    actualizarIcono.className = "update_icon clickeable";
    actualizarIcono.setAttribute("title", "Update");


    elemento.appendChild(removerIcono);
    elemento.appendChild(actualizarIcono);
    elemento.setAttribute("id", task.id);
    elemento.innerHTML += task.nombre;
    contenidoInfo.appendChild(elemento);
  }

  function actualizacionTareas(event) {

    var etiquetaDeTareas = event.currentTarget.parentNode;
    var iD = etiquetaDeTareas.id;
    var actualizadorTareas = encontrarTarea(iD).lista;
    var pos = encontrarTarea(iD).posicion;
    if (!!actualizadorTareas) {
      var nombrePromt = prompt("Task Description", actualizadorTareas.nombre);
      var apellidoPromt = prompt("Task State", actualizadorTareas.apellido);
      actualizadorTareas.nombre = nombrePromt;
      actualizadorTareas.apellido = apellidoPromt;
      listadoDeDatos[pos] = actualizadorTareas;
      etiquetaDeTareas.lastChild.textContent = actualizadorTareas.nombre;
      sincronizacionTareas();
    }
  }

  function quitarTareas(event) {

    var tareaParaEliminar = event.currentTarget.parentNode;
    var iD = tareaParaEliminar.id;
    contenidoInfo.removeChild(tareaParaEliminar);
    listadoDeDatos.forEach(function(value, i) {
      if (value.id == iD) {
        listadoDeDatos.splice(i, 1);
      }
    })

    sincronizacionTareas();
  }

  // fin CRUD de tareas


  //funciones accion

  function sincronizacionTareas() {
    window.localStorage.setItem('datos', JSON.stringify(listadoDeDatos));
    listadoDeDatos = JSON.parse(window.localStorage.getItem('taskList'));
  }

  function obtenerUltimoId() {
    var ultimaTarea = listadoDeDatos[listadoDeDatos.length - 1];
    vueltaId = ultimaTarea.id + 1;
  }

  function sincronizarEventos() {

    actualizarIcono = document.getElementsByClassName("update_icon");
    removerIcono = document.getElementsByClassName("remove_item");
    if (!!removerIcono.length) {
      for (var index = 0; index < removerIcono.length; index++) {
        removerIcono[index].addEventListener('click', quitarTareas);
      }
    }
    if (!!actualizarIcono.length) {
      for (var i = 0; i < actualizarIcono.length; i++) {
        actualizarIcono[i].addEventListener('click', actualizacionTareas);
      }
    }
  }
  //findTask
  function encontrarTarea(id) {

    var respuesta = {
      lista: '',
      posicion: 0
    };
    listadoDeDatos.forEach(function(element, index) {
      if (element.id == id) {
        respuesta.lista = element;
        respuesta.posicion = index;
      }
    });

    return respuesta;
  }

  //fin funciones accion

  inicializar();

})();
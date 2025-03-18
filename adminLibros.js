function init() {
  $("#nuevoLibro_form").on("submit", function (e) {
    agregarNuevoLibro(e);
  });

  $("#editLibro_form").on("submit", function (e) {
    actualizarLibro(e);
  });
}

$(document).ready(function () {
  cargarLibros();
});

//Función para agregar un nuevo libro
function agregarNuevoLibro(e) {
  e.preventDefault();
  var formData = new FormData($("#nuevoLibro_form")[0]);
  $.ajax({
    url: "controller/libro.php?op=insert",
    type: "POST",
    data: formData,
    contentType: false,
    processData: false,
    success: function (datos) {
      if (datos.includes("Error")) {
        Swal.fire({
          title: "Error",
          text: "Hubo un error al insertar los datos",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      } else {
        Swal.fire({
          title: "¡Éxito!",
          text: "Insertaste datos correctamente",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
        cargarLibros();
        //Limpiar campos
        $("#nuevoLibro_form")[0].reset();
      }
    },
  });
}

//Función para cargar los libros disponibles registrados
function cargarLibros() {
  $.ajax({
    url: "controller/libro.php?op=listar_libros",
    type: "POST",
    dataType: "json",
    success: function (data) {
      let tbody = "";
      data.forEach(function (libro, index) {
        tbody += `
          <tr class="text-center"">
            <td>${libro.id_libro}</td>
            <td>${libro.titulo}</td>
            <td>${libro.autor}</td>
            <td>${libro.genero}</td>
            <td>${libro.stock}</td>
            <td>
              <button class="btn btn-warning" id="btnEditar" onclick="cargarModalLibro(${libro.id_libro})"><i class="bi bi-pencil-fill"></i></button>
              <button class="btn btn-danger" id="btnEliminar" onclick="eliminarLibro(${libro.id_libro})"><i class="bi bi-trash2-fill"></i></button>
            </td>
          </tr>
        `;
      });
      $("#tbody-libros").html(tbody);
      console.log(data);
    },
    error: function (xhr, status, error) {
      console.error("Error al cargar los libros:", status, error);
      console.error("Detalles del error:", xhr.responseText);
    },
  });
}

//Función para Cargar el modal con los libros
function cargarModalLibro(id_libro) {
  $.ajax({
    url: "controller/libro.php?op=obtener_libro",
    type: "POST",
    data: { id_libro: id_libro },
    dataType: "json",
    success: function (data) {
      data.forEach(function (libro) {
        $("#idLibro_form").val(libro.id_libro);
        $("#editTitle_form").val(libro.titulo);
        $("#editAutor_form").val(libro.autor);
        $("#editGenero_form").val(libro.genero);
        $("#editStock_form").val(libro.stock);
      });

      $("#modal_libro").modal("show");
    },
    error: function (xhr, status, error) {
      console.error("Error al obtener los datos del libro:", status, error);
      console.error("Detalles del error:", xhr.responseText);
    },
  });
}

//Función para actualizar un libro
function actualizarLibro(e) {
  e.preventDefault();
  const formData = new FormData($("#editLibro_form")[0]);

  $.ajax({
    url: "controller/libro.php?op=update",
    type: "POST",
    data: formData,
    contentType: false,
    processData: false,
    success: function (datos) {
      if (datos.includes("Error")) {
        Swal.fire({
          title: "Error",
          text: "Hubo un error al actualizar los datos",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      } else {
        Swal.fire({
          title: "¡Éxito!",
          text: "Actualizaste datos correctamente",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
        cargarLibros();
        //Cerrar el modal luego de editar
        $("#modal_libro").modal("hide");
      }
    },
  });
}

//Función para eliminar un libro
function eliminarLibro(id_libro) {
  $.ajax({
    url: "controller/libro.php?op=delete",
    type: "POST",
    data: { id: id_libro },
    success: function () {
      Swal.fire({
        title: "¡Éxito!",
        text: "Cuenta eliminada correctamente.",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
      cargarLibros();
    },
    error: function (xhr, status, error) {
      Swal.fire({
        title: "¡ERROR!",
        text: "Error al eliminar la cuenta.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    },
  });
}

init();

// SEGURIDAD: Si no se encuentra en localStorage info del usuario
// no lo deja acceder a la página, redirigiendo al login inmediatamente.
if (!localStorage.jwt) {
  console.log(`No lo tengo`);
  window.location.href = "index.html";
}

/* ------ comienzan las funcionalidades una vez que carga el documento ------ */
window.addEventListener("load", function () {
  /* ---------------- variables globales y llamado a funciones ---------------- */
  const btnCerrarSesion = document.getElementById("closeApp");
  const url = "https://todo-api.ctd.academy/v1";
  obtenerNombreUsuario();

  /* -------------------------------------------------------------------------- */
  /*                          FUNCIÓN 1 - Cerrar sesión                         */
  /* -------------------------------------------------------------------------- */

  btnCerrarSesion.addEventListener("click", function () {
    const cerrarSesion = confirm("¿Desea cerrar sesión?");
    if (cerrarSesion) {
      localStorage.removeItem("jwt");
      window.location.href = "index.html";
    }
  });

  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 2 - Obtener nombre de usuario [GET]                */
  /* -------------------------------------------------------------------------- */

  function obtenerNombreUsuario() {
    // Obtiene el token JWT (JSON Web Token) del almacenamiento local (localStorage)
    const jwt = JSON.parse(localStorage.getItem("jwt"));
    // Aquí se asume que el token JWT ya está guardado en localStorage

    // Configura las opciones para la solicitud fetch
    const settings = {
      method: "GET", // Método HTTP GET
      headers: {
        authorization: jwt, // Encabezado de autorización con el token JWT
        "Content-Type": "application/json", // Tipo de contenido de la solicitud
      },
    };

    // Realiza una solicitud fetch a una URL específica (que debe estar definida previamente como 'url')
    fetch(`${url}/users/getMe`, settings)
      .then((response) => {
        // Entra aquí cuando la solicitud fetch se completa (ya sea con éxito o no)

        console.log({ response }); // Muestra la respuesta en la consola

        // Comprueba si la respuesta HTTP indica un error (por ejemplo, 404, 500)
        if (!response.ok) {
          if (response.status === 400) {
            throw new Error(
              "Error 400: El usuario ya está registrado o datos requeridos incompletos"
            );
          } else if (response.status === 500) {
            throw new Error("Error 500: Error del servidor");
          } else {
            throw new Error(
              `Error ${response.status}: Error desconocido, póngase en contacto con el administrador`
            );
          }
        }

        // Si la respuesta es exitosa, convierte los datos de la respuesta a JSON
        return response.json();
      })
      .then((data) => {
        // Entra aquí cuando la conversión a JSON se completa

        console.log("Promesa cumplida💍"); // Muestra un mensaje en la consola

        // Obtiene el nombre de usuario del objeto 'data' y lo almacena en 'nombreUsuario'
        const nombreUsuario = data.firstName;
        return nombreUsuario;
      });
  }

  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 3 - Obtener listado de tareas [GET]                */
  /* -------------------------------------------------------------------------- */

  function consultarTareas() {}

  /* -------------------------------------------------------------------------- */
  /*                    FUNCIÓN 4 - Crear nueva tarea [POST]                    */
  /* -------------------------------------------------------------------------- */

  formCrearTarea.addEventListener("submit", function (event) {});

  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 5 - Renderizar tareas en pantalla                 */
  /* -------------------------------------------------------------------------- */
  function renderizarTareas(listado) {}

  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 6 - Cambiar estado de tarea [PUT]                 */
  /* -------------------------------------------------------------------------- */
  function botonesCambioEstado() {}

  /* -------------------------------------------------------------------------- */
  /*                     FUNCIÓN 7 - Eliminar tarea [DELETE]                    */
  /* -------------------------------------------------------------------------- */
  function botonBorrarTarea() {}
});

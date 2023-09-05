window.addEventListener("load", function () {
  /* ---------------------- obtenemos variables globales ---------------------- */
  const form = document.forms[0];
  const nombre = document.getElementById("inputNombre");
  const apellido = document.getElementById("inputApellido");
  const email = document.getElementById("inputEmail");
  const password = document.getElementById("inputPassword");
  const url = "https://todo-api.ctd.academy/v1";

  /* -------------------------------------------------------------------------- */
  /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
  /* -------------------------------------------------------------------------- */
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    //Creamos el cuerpo de la request (petición al servidor)
    const payload = {
      firstName: nombre.value,
      lastName: apellido.value,
      email: email.value,
      password: password.value,
    };
    // vemos el objeto que recibimos del formulario
    console.log(payload);

    //configuramos la request del Fetch
    const settings = {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Lanzamos la consulta del login a la API
    realizarRegister(settings);

    // Limpiamos el formulario
    form.reset();
  });

  /* -------------------------------------------------------------------------- */
  /*                    FUNCIÓN 2: Realizar el signup [POST]                    */
  /* -------------------------------------------------------------------------- */
  function realizarRegister(settings) {
    console.log("Lanzar la consulta a la API...");

    fetch(`${url}/users`, settings)
      .then((response) => {
        console.log(response);

        if (!response.ok) {
          if (response.status === 400) {
            throw new Error(
              "Error 400: El usuario ya está registrado o datos requeridos incompletos"
            );
          } else if (response.status === 500) {
            throw new Error("Error 500: Error del servidor");
          } else {
            throw new Error(
              `Error ${response.status}: Error desconocido, pongase en contacto con el administrador`
            );
          }
        }

        return response.json();
      })
      .then((data) => {
        console.log("Promesa cumplida💍");
        console.log(data);

        if (data.jwt) {
          localStorage.setItem("jwt", JSON.stringify(data.jwt));
        }
      })
      .catch((err) => {
        console.warn("Promesa rechazada ");
        console.error(err.message);
        alert(err.message);
      });
  }
});

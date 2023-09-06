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

    const payload = {
      firstName: nombre.value,
      lastName: apellido.value,
      email: email.value,
      password: password.value,
    };
    console.log(payload);

    const settings = {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    };

    realizarRegister(settings);

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
          window.location.href = "mis-tareas.html";
        }
      })
      .catch((err) => {
        console.warn("Promesa rechazada");
        console.error(err.message);
        alert(err.message);
      });
  }
});

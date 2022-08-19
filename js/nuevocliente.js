(function () {
  let DB;

  const formulario = document.querySelector("#formulario");

  document.addEventListener("DOMContentLoaded", () => {
    formulario.addEventListener("submit", validarCliente);
    conectarDB();
  });
 

  function validarCliente(e) {
    e.preventDefault();
    //leer inputs.

    const nombre = document.querySelector("#nombre").value;
    const email = document.querySelector("#email").value;
    const telefono = document.querySelector("#telefono").value;
    const empresa = document.querySelector("#empresa").value;

    if (nombre === "" || email === "" || telefono === "" || empresa === "") {
      imprimirAlerta("todos los campos son obligatorios", "error");
      return;
    }
    //crer un objeto para la informacion.

    const cliente = {
      nombre,
      email,
      telefono,
      empresa,
      id: Date.now(),
    };
    crearNuevoCliente(cliente);
  }
  function crearNuevoCliente(cliente) {
    const transaction = DB.transaction(["crm"], "readwrite");
    const objectStore = transaction.objectStore("crm");

    objectStore.add(cliente);

    transaction.onerror = function () {
      imprimirAlerta("hubo un error", "error");
    };
    transaction.oncomplete = function () {
      console.log("Cliente Agregada");

      imprimirAlerta("El cliente se agrego Correctamente");

      setTimeout(() => {
        window.location.href = "index.html";
      }, 3000);
    };
  }

  
})();

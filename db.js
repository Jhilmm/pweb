let db;

const request = indexedDB.open("gestor-de-tareas-db", 1);

request.onupgradeneeded = function (event) {
  db = event.target.result;
  if (db.objectStoreNames.contains("tareas")) {
    db.deleteObjectStore("tareas");
  }

  const objectStore = db.createObjectStore("tareas", {
    keyPath: "id",
    autoIncrement: true,
  });

  objectStore.createIndex("titulo", "titulo", { unique: false });
  objectStore.createIndex("descripcion", "descripcion", { unique: false });
  objectStore.createIndex("fecha", "fecha", { unique: false });
};

request.onsuccess = function (event) {
  db = event.target.result;
  console.log("La base de datos se ha creado correctamente.");

  //if (!db.objectStoreNames.contains("tareas")) {
  db = event.target.result;
  console.log("La base de datos se ha creado correctamente.");

  const tasks = [
    {
      titulo: "Comprar leche",
      descripcion: "Comprar leche en la tienda",
      fecha: "2023-05-01",
    },
    {
      titulo: "Llamar al médico",
      descripcion: "Llamar al médico para pedir cita",
      fecha: "2023-05-03",
    },
    {
      titulo: "Ir al gimnasio",
      descripcion: "Ir al gimnasio a las 18:00 horas",
      fecha: "2023-05-05",
    },
    {
      titulo: "Comprar frutas y verduras",
      descripcion: "Ir al mercado a comprar frutas y verduras frescas",
      fecha: "2023-05-02",
    },
    {
      titulo: "Estudiar para el examen",
      descripcion: "Repasar el material de estudio para el examen de historia",
      fecha: "2023-05-07",
    },
    {
      titulo: "Limpiar la casa",
      descripcion: "Hacer una limpieza profunda de la casa",
      fecha: "2023-05-09",
    },
    {
      titulo: "Comprar un regalo para mi hermano",
      descripcion:
        "Ir a la tienda de regalos y comprar un regalo para mi hermano",
      fecha: "2023-05-11",
    },
    {
      titulo: "Ir al cine con amigos",
      descripcion: "Ver la nueva película de acción en el cine",
      fecha: "2023-05-13",
    },
    {
      titulo: "Preparar la cena para invitados",
      descripcion:
        "Preparar una cena especial para mis amigos que vienen a visitarme",
      fecha: "2023-05-14",
    },
    {
      titulo: "Pasear al perro",
      descripcion: "Sacar al perro a dar un paseo por el parque",
      fecha: "2023-05-16",
    },
    {
      titulo: "Comprar un libro",
      descripcion: "Ir a la librería y comprar un libro de ciencia ficción",
      fecha: "2023-05-18",
    },
    {
      titulo: "Hacer ejercicio en casa",
      descripcion: "Hacer una rutina de ejercicios en casa",
      fecha: "2023-05-20",
    },
    {
      titulo: "Reunión con el jefe",
      descripcion:
        "Tener una reunión con el jefe para discutir los objetivos del proyecto",
      fecha: "2023-05-21",
    },
    {
      titulo: "Renovar el pasaporte",
      descripcion: "Ir a la oficina de pasaportes para renovar el pasaporte",
      fecha: "2023-05-23",
    },
    {
      titulo: "Ir al concierto de rock",
      descripcion: "Asistir al concierto de rock de mi banda favorita",
      fecha: "2023-05-25",
    },
    {
      titulo: "Hacer una videollamada con los abuelos",
      descripcion: "Hablar con los abuelos a través de una videollamada",
      fecha: "2023-05-27",
    },
  ];

  const transaction = db.transaction(["tareas"], "readwrite");
  const objectStore = transaction.objectStore("tareas");

  //borrarTareas();
  tasks.forEach(function (task) {
    objectStore.add(task);
  });

  transaction.oncomplete = function () {
    console.log("Los datos de prueba se han agregado correctamente.");
  };

  transaction.onerror = function () {
    console.log("Se ha producido un error al agregar los datos de prueba.");
  };
};
//};

request.onerror = function (event) {
  console.log("Se ha producido un error al crear la base de datos.");
};

function borrarTareas() {
  const transaction = db.transaction(["tareas"], "readwrite");
  const objectStore = transaction.objectStore("tareas");
  const request = objectStore.clear();

  request.onerror = function (event) {
    console.log("Se ha producido un error al borrar las tareas.");
  };

  request.onsuccess = function (event) {
    console.log("Todas las tareas han sido borradas correctamente.");
  };
}

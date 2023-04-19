const taskList = document.getElementById("task-list");

function displayTasks() {
  const request = indexedDB.open("gestor-de-tareas-db", 1);
  request.onsuccess = function (event) {
    const db = event.target.result;
    const transaction = db.transaction(["tareas"], "readonly");
    const objectStore = transaction.objectStore("tareas");
    const getAllRequest = objectStore.getAll();
    getAllRequest.onsuccess = function () {
      const tasks = getAllRequest.result;
      tasks.forEach(function (task) {
        const taskCardHTML = createTaskCard(task);
        if (taskList) {
          taskList.insertAdjacentHTML("beforeend", taskCardHTML);
        } else {
          console.error(
            'El elemento con id "task-list" no se encontró en el documento.'
          );
        }
      });
    };
  };
}

function createTaskCard(task) {
  const taskCardHTML = `
    <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
      <div class="card shadow">
        <div class="card-body">
          <h5 class="card-title">${task.titulo}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${task.fecha}</h6>
          <p class="card-text">${task.descripcion}</p>
          <div class="d-flex justify-content-end">
            <a href="#" class="card-link mx-2">Modificar</a>
            <a href="#" class="card-link mx-2">Eliminar</a>
          </div>
        </div>
      </div>
    </div>
  `;
  return taskCardHTML;
}

document.addEventListener("DOMContentLoaded", function () {
  displayTasks();
});

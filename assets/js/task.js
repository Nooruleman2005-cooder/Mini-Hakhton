let today = new Date();
let options = { year: 'numeric', month: 'long', day: 'numeric' };
let formattedDate = today.toLocaleDateString('en-US', options);
document.getElementById('calendar-date').innerText = formattedDate;

let taskForm = document.getElementById('task-form');
let taskList = document.getElementById('task-list');
let taskCount = document.getElementById('task-count');
let count = 0;

let savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
savedTasks.forEach(function(taskName) {
  createTaskCard(taskName);
  count++;
});
taskCount.innerText = `${count} Task${count > 1 ? 's' : ''}`;

taskForm.addEventListener('submit', function(event) {
  event.preventDefault();
  let taskName = document.getElementById('taskName').value.trim();

  if (taskName !== "") {
    createTaskCard(taskName);

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(taskName);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    count++;
    taskCount.innerText = `${count} Task${count > 1 ? 's' : ''}`;

    taskForm.reset();
  }
});

function createTaskCard(taskName) {
  let taskCard = document.createElement('div');
  taskCard.className = 'calendar mt-3';
  taskCard.style.position = "relative";

  let taskTitle = document.createElement('h5');
  taskTitle.innerText = taskName;
  taskCard.appendChild(taskTitle);

  let editBtn = document.createElement('button');
  editBtn.className = 'btn btn1 btn-primary btn-sm me-2';
  editBtn.innerText = 'Edit';
  editBtn.style.position = "absolute";
  editBtn.style.top = "10px";
  editBtn.style.right = "80px";

  let deleteBtn = document.createElement('button');
  deleteBtn.className = 'btn btn-danger btn-sm';
  deleteBtn.innerText = 'Delete';
  deleteBtn.style.position = "absolute";
  deleteBtn.style.top = "10px";
  deleteBtn.style.right = "10px";

  taskCard.appendChild(editBtn);
  taskCard.appendChild(deleteBtn);

  taskList.appendChild(taskCard);

  editBtn.addEventListener('click', function() {
    let newTaskName = prompt("Edit your task:", taskTitle.innerText);
    if (newTaskName !== null && newTaskName.trim() !== "") {
      taskTitle.innerText = newTaskName;

      let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      let index = tasks.indexOf(taskName);
      if (index !== -1) {
        tasks[index] = newTaskName;
        localStorage.setItem('tasks', JSON.stringify(tasks));
      }
    }
  });

  deleteBtn.addEventListener('click', function() {
    if (confirm("Are you sure you want to delete this task?")) {
      taskCard.remove();
      count--;
      taskCount.innerText = `${count} Task${count > 1 ? 's' : ''}`;

      let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks = tasks.filter(task => task !== taskName);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  });
}

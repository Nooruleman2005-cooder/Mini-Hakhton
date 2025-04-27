let myTaskList = document.getElementById('my-task-list');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

if (tasks.length === 0) {
  myTaskList.innerHTML = "<p>No tasks found.</p>";
} else {
  tasks.forEach(function(task) {
    let taskCard = document.createElement('div');
    taskCard.className = 'task-card';  

    let taskTitle = document.createElement('h5');
    taskTitle.innerText = task;
    taskCard.appendChild(taskTitle);

    let taskBtns = document.createElement('div');
    taskBtns.className = 'task-btns'; 

    // Edit Button
    let editBtn = document.createElement('button');
    editBtn.className = 'btn btn1 btn-primary btn-sm';
    editBtn.innerText = 'Edit';
    taskBtns.appendChild(editBtn);

    // Delete Button
    let deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger btn-sm';
    deleteBtn.innerText = 'Delete';
    taskBtns.appendChild(deleteBtn);

    taskCard.appendChild(taskBtns);
    myTaskList.appendChild(taskCard);

    // Edit functionality
    editBtn.addEventListener('click', function() {
      let newTaskName = prompt("Edit your task:", task);
      if (newTaskName !== null && newTaskName.trim() !== "") {

        let taskIndex = tasks.indexOf(task);
        if (taskIndex !== -1) {
          tasks[taskIndex] = newTaskName;
          localStorage.setItem('tasks', JSON.stringify(tasks));
          taskTitle.innerText = newTaskName;
        }
      }
    });

    // Delete functionality
    deleteBtn.addEventListener('click', function() {
      if (confirm("Are you sure you want to delete this task?")) {
        myTaskList.removeChild(taskCard);
        tasks = tasks.filter(t => t !== task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
      }
    });
  });
}

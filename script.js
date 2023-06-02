// Variables
var taskInput = document.getElementById('new-task-input');
var addButton = document.getElementById('new-task-submit');
var taskList = document.getElementById('tasks');
var tasks = [];

// Add task function
function addTask() {
  var task = taskInput.value.trim();

  if (task !== '') {
    tasks.push({ text: task, completed: false });
    renderTasks();
    taskInput.value = '';
  }
}

// Toggle task completion function
function toggleTaskCompletion(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

// Remove task function
function removeTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

// Render tasks function
function renderTasks() {
  taskList.innerHTML = '';

  tasks.forEach(function (task, index) {
    var taskItem = document.createElement('div');
    taskItem.className = 'task';

    var content = document.createElement('div');
    content.className = 'content';

    var taskText = document.createElement('input');
    taskText.type = 'text';
    taskText.className = 'text';
    taskText.value = task.text;
    taskText.readOnly = true;

    if (task.completed) {
      taskItem.classList.add('completed');
    }

    taskText.addEventListener('change', function (event) {
      tasks[index].text = event.target.value;
    });

    content.appendChild(taskText);
    taskItem.appendChild(content);

    var actions = document.createElement('div');
    actions.className = 'actions';

    var doneButton = document.createElement('button');
    doneButton.textContent = 'Done';
    doneButton.className = 'done';
    doneButton.addEventListener('click', function () {
      toggleTaskCompletion(index);
    });

    var editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'edit';
    editButton.addEventListener('click', function () {
      taskText.readOnly = !taskText.readOnly;
      if (!taskText.readOnly) {
        taskText.focus();
      }
    });

    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete';
    deleteButton.addEventListener('click', function () {
      removeTask(index);
    });

    actions.appendChild(doneButton);
    actions.appendChild(editButton);
    actions.appendChild(deleteButton);
    taskItem.appendChild(actions);

    taskList.appendChild(taskItem);
  });
}

// Add event listener to add button
addButton.addEventListener('click', function (event) {
  event.preventDefault();
  addTask();
});

// Add event listener to form submit
document.getElementById('new-task-form').addEventListener('submit', function (event) {
  event.preventDefault();
  addTask();
});

renderTasks();

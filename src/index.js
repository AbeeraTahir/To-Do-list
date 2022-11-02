import './style.css';

const form = document.getElementById('add-to-list');
const listItems = document.getElementById('to-do-list');

// array for storing objects of to-do tasks
const taskArr = [];

// function for display added task to list
const displayTask = (task) => {
  const listItem = `
  <li>
    <div class="check">
      <input type="checkbox" name="${task.description}">
      <input type="text" class="task-description" name="${task.description}" class="task-name" id="task-name" value="${task.description}">
    </div>
    <div class="actions">
      <i class="fa-solid fa-pen-to-square edit"></i>
      <i class="fa-solid fa-trash-can del"></i>
    </div>
  </li>`;
  listItems.insertAdjacentHTML('beforeend', listItem);
};

// displaying tasks on window loading
window.addEventListener('DOMContentLoaded', () => {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  tasks.forEach((task) => displayTask(task));
});

// function for adding task to list
const addTask = (task) => {
  const taskObj = {};
  taskObj.index = taskArr.length + 1;
  taskObj.description = task;
  taskObj.completed = false;
  displayTask(taskObj);
  taskArr.push(taskObj);
  localStorage.setItem('tasks', JSON.stringify(taskArr));
};

// deleting task
const deleteTask = (task, element) => {
  const taskName = task.children[0].children[1].value;
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  const taskIndex = tasks.findIndex((x) => x.description === taskName);
  tasks.splice(taskIndex, 1);
  tasks.forEach((item, ind) => {
    item.index = ind + 1;
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
  element.parentElement.parentElement.remove();
};

// editing task
// task will be edited when first the input field of task is updated and then edit icon is clicked
const editTask = (task) => {
  const taskItem = task.children[0].children[1].name;
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  const taskIndex = tasks.findIndex((x) => x.description === taskItem);
  const taskName = task.querySelector('#task-name').value;
  tasks[taskIndex].description = taskName;
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Element target for task deletion and updation
listItems.addEventListener('click', (e) => {
  const task = e.target.parentElement.parentElement;
  if (e.target.classList.contains('del')) {
    deleteTask(task, e.target);
  }
  // task will be edited when first the input field of task is updated and then edit icon is clicked
  if (e.target.classList.contains('edit')) {
    editTask(task);
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const task = document.getElementById('task');
  addTask(task.value);
  task.value = '';
});
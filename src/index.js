import './style.css';

const listItems = document.querySelector('.to-do-list');
const toDoList = [
  {
    index: 0,
    completed: 'true',
    description: 'wash the dishes',
  },
  {
    index: 1,
    completed: 'true',
    description: 'cook food',
  },
  {
    index: 2,
    completed: 'true',
    description: 'complete project',
  },
];

const showListItems = () => {
  toDoList.forEach((item) => {
    const listItem = `
    <li>
      <div class="check">
        <input type="checkbox" name="${item.index}" id="${item.index}">
        <p>${item.description}</p>
      </div>
      <i class="fa-solid fa-ellipsis-vertical"></i>
    </li>`;
    listItems.insertAdjacentHTML('beforeend', listItem);
  });
};

showListItems();
// function to set task to local storage
const setLocalStorage = (tasks) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

// function to get task from local storage
const getLocalStorage = () => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  return tasks;
};

export { setLocalStorage, getLocalStorage };
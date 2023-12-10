const taksContainerElement = document.getElementById('taksContainer');
const inputCreateElement = document.getElementById('createTask');
const formTaskElement = document.getElementById('task-form');
const inputCheckTaskElement = document.getElementById('checkTask');
const buttonFilterCompleteElement = document.getElementById('completeTask');
const buttonFilterActiveTaskElement = document.getElementById('activeTask');
const buttonFilterAllTaskElement = document.getElementById('showAllTask');
const buttonDeleteTaskElement = document.getElementById('deleteTask');
const remainTasksElement = document.getElementById('remainTasks');

let tasks = [];

addTask = () => {
  const newTask = inputCreateElement.value;
  if (newTask !== '') {
    const objNewTask = {
      id: Date.now(),
      task: newTask,
      completed: false,
    };
    tasks.push(objNewTask);
    createNewTask(objNewTask);
  }
  updateRemainTask();
};
// Create new task
createNewTask = task => {
  const newItemTask = document.createElement('li');
  const newInputCheck = document.createElement('input');
  const newTextTask = document.createElement('span');
  newItemTask.id = task.id;
  newInputCheck.type = 'checkbox';
  newInputCheck.id = task.id;
  newTextTask.textContent = task.task;

  if (task.completed) {
    newInputCheck.checked = true;
    newTextTask.classList.add('taskChecked');
  }

  newItemTask.append(newInputCheck);
  newItemTask.append(newTextTask);

  taksContainerElement.append(newItemTask);

  newInputCheck.addEventListener('change', () => {
    checkTask(task, newTextTask, newInputCheck);
  });
};
// Mark the task as completed
checkTask = (task, spanElement, checkbox) => {
  if (checkbox.checked) {
    task.completed = true;
    spanElement.classList.add('taskChecked');
  } else {
    task.completed = false;
    spanElement.classList.remove('taskChecked');
  }
  updateRemainTask();
};

// Filter the task with the options buttons
filterCompletTask = () => {
  const completedTasks = tasks.filter(task => task.completed);
  clearTaskList();
  completedTasks.forEach(task => createNewTask(task));
};
filterIncompleteTask = () => {
  const incompleteTasks = tasks.filter(task => !task.completed);
  clearTaskList();
  incompleteTasks.forEach(task => createNewTask(task));
};
showAllTasks = () => {
  clearTaskList();
  tasks.forEach(task => createNewTask(task));
  updateRemainTask();
};
clearTaskList = () => {
  taksContainerElement.innerHTML = '';
};
deleteCompleteTask = () => {
  const completedTasks = tasks.filter(task => task.completed);

  completedTasks.forEach(completedTask => {
    const taskElement = document.getElementById(completedTask.id);
    taskElement.remove();
  });

  tasks = tasks.filter(task => !task.completed);
  updateRemainTask();
};
updateRemainTask = () => {
  const incompleteTasksCount = tasks.filter(task => !task.completed).length;
  remainTasksElement.textContent = `${incompleteTasksCount} tasks left`;
};

formTaskElement.addEventListener('keyup', event => {
  if (event.key === 'Enter') {
    addTask();
    inputCreateElement.value = '';
  }
});
formTaskElement.addEventListener('submit', function (event) {
  event.preventDefault();
});
buttonFilterCompleteElement.addEventListener('click', filterCompletTask);
buttonFilterActiveTaskElement.addEventListener('click', filterIncompleteTask);
buttonFilterAllTaskElement.addEventListener('click', showAllTasks);
buttonDeleteTaskElement.addEventListener('click', deleteCompleteTask);

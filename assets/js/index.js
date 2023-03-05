// INITIAL TASK LIST
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
updateTask();
// NEW TASK BTN -> DISFORMPLAY FORM
const newTaskBtnElement = document.getElementById('newtask__btn');
const newTaskFormElement = document.querySelector('.newtask__container');
newTaskBtnElement.addEventListener('click', () => {
  newTaskFormElement.classList.remove('newtask--hidden');
  newTaskFormElement.classList.add('newtask--nonedit');
  newTaskFormElement.querySelector("h3").innerHTML = "Add new task";
  editOrAddCheck = false;
});
// CLOSE BTN -> HIDE FORM
const closeBtnElement = document.querySelector('.closeaddform__btn');
closeBtnElement.addEventListener('click', () => {
  newTaskFormElement.classList.add('newtask--hidden');
  reloadForm();
});
// ADD/EDIT TASK
let editOrAddCheck = false;// false = add, true = edit
let editTaskIndex;
const submitBtnElement = document.querySelector('#submit__btn');
const categoryInputElement = document.querySelector('#category__input');
const titleInputElement = document.querySelector('#title__input');
const contentInputElement = document.querySelector('#content__input');
let inputList = [categoryInputElement, titleInputElement, contentInputElement];
//for edit:
const todoRadioBtnElement = document.querySelector('#todo__radiobtn');
const doingRadioBtnElement = document.querySelector('#doing__radiobtn');
const finishedRadioBtnElement = document.querySelector('#finished__radiobtn');
// Add event listener for each input when focus in and focus out.
for (let i = 0; i < inputList.length; i++) {
  inputList[i].addEventListener('focusin', () => {
    inputList[i].classList.remove('input--error');
    inputList[i].classList.remove('input--accepted');
  });
  inputList[i].addEventListener('focusout', () => {
    if (inputList[i].value === '') {
      inputList[i].classList.add('input--error');
      inputList[i].classList.remove('input--accepted');
    } else {
      inputList[i].classList.add('input--accepted');
      inputList[i].classList.remove('input--error');
    }
  });
}
// Add event listener for submit button.
submitBtnElement.addEventListener('click', () => {
  let checkInput = true;
  for (let i = 0; i < inputList.length; i++) {
    if (inputList[i].value === '') {
      inputList[i].classList.add('input--error');
      inputList[i].classList.remove('input--accepted');
      checkInput = false;
    } else {
      inputList[i].classList.add('input--accepted');
      inputList[i].classList.remove('input--error');
    }
  }
  if (checkInput) {
    let category = categoryInputElement.value;
    let title = titleInputElement.value;
    let content = contentInputElement.value;
    let status = 'todo';
    if (editOrAddCheck) {
      if (doingRadioBtnElement.checked) {
        status = 'doing';
      } else if (finishedRadioBtnElement.checked) {
        status = 'finished';
      }
      taskList.splice(editTaskIndex, 1);
    }
    let newTask = new Task(category, title, content, status);
    taskList.push(newTask);
    newTaskFormElement.classList.add('newtask--hidden');
    updateTask();
    reloadForm();
  }
});
// Make the form doesn't have border when open form again.
function reloadForm() {
  for (let i = 0; i < inputList.length; i++) {
    inputList[i].classList.remove('input--error');
    inputList[i].classList.remove('input--accepted');
    inputList[i].value = '';
  }
}
// RENDER TASK LIST
function updateTask() {
  // SAVE TO LOCALSTORAGE
  localStorage.setItem("tasks", JSON.stringify(taskList));
  // RENDER TASK LIST
  renderTaskList();//render task list
  addELforeachTask();//add event listener for each task
  countTaskforeachCategory();//count task for each category
  //=============
  //INNER FUNCTION
  function renderTaskList() {
    const todoContainerElement = document.querySelector('.todo__container');
    const doingContainerElement = document.querySelector('.doing__container');
    const finishedContainerElement = document.querySelector('.finished__container');
    // get task container of each category
    const todoTaskContainerElement = todoContainerElement.querySelector('.task__container');
    const doingTaskContainerElement = doingContainerElement.querySelector('.task__container');
    const finishedTaskContainerElement = finishedContainerElement.querySelector('.task__container');
    todoTaskContainerElement.innerHTML = '';
    doingTaskContainerElement.innerHTML = '';
    finishedTaskContainerElement.innerHTML = '';
    // render task list
    for (let i = 0; i < taskList.length; i++) {
      let task = taskList[i];
      let taskElement = document.createElement('div');
      taskElement.classList.add('task');
      taskElement.innerHTML = `
      <div class="task__main">
                <div class="task__header">
                  <div class="task__category">
                    <span class="task__category--text">${task.category}</span>
                  </div>
                </div>
                <div class="task__title">
                  <p class="task__title--text">${task.title}</p>
                </div>
                <hr class="task__hr" />
                <div class="task__body">
                  <div class="task__content">
                    <p class="task__content--text">${task.content}</p>
                  </div>
                  <div class="task__date">
                    <i class="fa-regular fa-clock"></i>
                    <span class="task__date--text">${task.date}</span>
                  </div>
                </div>
              </div>
              <div class="task__action">
                <div class="action__wrapper">
                  <button class="btn btn--edit">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="btn btn--delete">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </div>
      `;
      switch (task.status) {
        case 'todo':
          todoTaskContainerElement.appendChild(taskElement);
          break;
        case 'doing':
          doingTaskContainerElement.appendChild(taskElement);
          break;
        case 'finished':
          finishedTaskContainerElement.appendChild(taskElement);
          break;
      }
    }
  }
  function addELforeachTask() {
    const taskElements = document.querySelectorAll('.task');
    for (let i = 0; i < taskList.length; i++) {
      let taskEditBtnElement = taskElements[i].querySelector('.btn--edit');
      let taskDeleteBtnElement = taskElements[i].querySelector('.btn--delete');
      taskEditBtnElement.addEventListener('click', () => {
        editTask(i);
      });
      taskDeleteBtnElement.addEventListener('click', () => {
        deleteTask(i);
      });
    }
    function editTask(index) {
      let editTask;
      for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].date.toLocaleString() === taskElements[index].querySelector('.task__date--text').innerText) {
          editTask = taskList[i];
          editTaskIndex = i;
          break;
        }
      }
      newTaskFormElement.querySelector("h3").innerText = "Edit Task";
      newTaskFormElement.classList.remove('newtask--hidden');
      categoryInputElement.value = editTask.category;
      titleInputElement.value = editTask.title;
      contentInputElement.value = editTask.content;
      if (editTask.status === 'todo') {
        todoRadioBtnElement.checked = true;
      } else if (editTask.status === 'doing') {
        doingRadioBtnElement.checked = true;
      } else if (editTask.status === 'finished') {
        finishedRadioBtnElement.checked = true;
      }
      editOrAddCheck = true;
      newTaskFormElement.classList.remove('newtask--nonedit');
    }
    function deleteTask(index) {
      for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].date.toLocaleString() === taskElements[index].querySelector('.task__date--text').innerText) {
          taskList.splice(i, 1);
          break;
        }
      }
      updateTask();
    }
  }
  function countTaskforeachCategory() {
    const todoCountElement = document.querySelector('.todo__count');
    const doingCountElement = document.querySelector('.doing__count');
    const finishedCountElement = document.querySelector('.finished__count');
    let todoCount = 0;
    let doingCount = 0;
    let finishedCount = 0;
    for (let i = 0; i < taskList.length; i++) {
      switch (taskList[i].status) {
        case 'todo':
          todoCount++;
          break;
        case 'doing':
          doingCount++;
          break;
        case 'finished':
          finishedCount++;
          break;
      }
    }
    todoCountElement.innerText = todoCount;
    doingCountElement.innerText = doingCount;
    finishedCountElement.innerText = finishedCount;
  }
}
// TASK OBJECT
class Task {
  constructor(category, title, content, status) {
    this.category = category;
    this.title = title;
    this.content = content;
    this.date = new Date().toLocaleString();
    this.status = status;
  }
}
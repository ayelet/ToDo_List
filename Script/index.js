// const TaskList = require('./tasklist');
// const Task = require('./tasklist.js');
// const Task = require('./tasklist');
// import {TaskList} from '../Script/tasklist.js';
// import {Task} from '../Script/tasklist.js';

class TaskListDisplay {
  constructor() {
    this.taskList = new TaskList();
    this.displayStyle = TaskListDisplay.Style.list;
    let i = 0;

    this.getFromLocalStorage();
  }
  add(text) {
    this.taskList.createTask(text);
    this.taskList.print(); // prints to console log
    console.log("adding new task:", text);
    this.addToLocalStorage();
    this.updateDisplay();
    this.clearInputField();
  }

  removeTask(id) {
    this.taskList.removeTask(id);
    console.log("removing ", id);
    this.addToLocalStorage();
    this.updateDisplay();
  }
  updateTask(taskId, newText) {
    this.taskList.updateTask(taskId, newText);
    this.addToLocalStorage();
    this.updateDisplay();
  }
  completeTask(taskId, isDone) {
    this.taskList.markAsDone(taskId, isDone);
    this.addToLocalStorage();
    this.updateDisplay();
  }
  async addToLocalStorage() {
    let data = JSON.stringify(this.taskList.tasks);
    localStorage.setItem("tasks", data);
    localStorage.setItem("TaskCounter", TaskList.counter);
  } // write tasks to local storage
  getFromLocalStorage() {
    const counter = localStorage.getItem("TaskCounter");
    TaskList.counter = Number(counter);
    const storage = localStorage.getItem("tasks");
    if (storage) {
      let data = JSON.parse(storage);
      console.log(data);
      let i = 0;
      while (i < data.length) {
        let task = Task.fromJson(data[i]);
        console.log(task instanceof Task);
        // task.print();
        this.taskList.tasks.push(task);
        i++;
      }
    }
    this.updateDisplay();
  } // fetch tasks to local storage

  updateDisplay() {
    let taskContainer = document.querySelector(".task-list-container");
    taskContainer.innerHTML = "";
    let ul = document.createElement("ul");
    ul.classList.add("task-list");
    taskContainer.appendChild(ul);
    this.taskList.tasks.forEach((task) => {
      let li = document.createElement("li");
      li.classList.add("task-item");
      ul.appendChild(li);

      let innerDiv = document.createElement("div");
      innerDiv.classList.add("task");
      innerDiv.setAttribute("data-key", task.getTimeStamp());
      innerDiv.setAttribute("id", task.getId());
      let completBtn = document.createElement("input");
      completBtn.classList.add("btn");
      completBtn.classList.add("task-complete");
      completBtn.setAttribute("type", "checkbox");
      innerDiv.appendChild(completBtn);
      let span = document.createElement("span");
      span.classList.add("checkmark");
      innerDiv.appendChild(span);
      let taskText = document.createElement("input");

      taskText.value = task.get();
      taskText.classList.add("task-text");
      taskText.setAttribute("type", "text");
      taskText.setAttribute("aria-label", "Task description");
      taskText.disabled = true;

      innerDiv.appendChild(taskText);

      let deleteBtn = document.createElement("input");
      deleteBtn.classList.add("btn");
      deleteBtn.classList.add("task-delete");
      deleteBtn.classList.add("far");
      deleteBtn.classList.add("fa-trash-alt");
      deleteBtn.setAttribute("value", "\uf2ed");
      deleteBtn.setAttribute("type", "button");
      deleteBtn.setAttribute("aria-label", "Delete task");
      if (task.isDone()) {
        completBtn.checked = true;
        taskText.style.textDecoration = "line-through";
      }
      innerDiv.appendChild(deleteBtn);

      li.appendChild(innerDiv);

      let deleteBtns = document.querySelectorAll(".task-delete");
      deleteBtns.forEach((btn) =>
        btn.addEventListener("click", this.deleteTaskHandler)
      );
      let completeBtns = document.querySelectorAll(".task-complete");
      completeBtns.forEach((btn) => {
        btn.addEventListener("click", this.completeTaskHandler);
        btn.setAttribute("aria-label", "check for task completed");
      });
      const hr = document.createElement("hr");
      innerDiv.appendChild(hr);
    });
  }
  clearInputField() {
    let textField = document.querySelector(".input-field");
    textField.value = "";
  }
  //!!!- use arrow function as event handlers in order to bind the appropriate this
  deleteTaskHandler = (e) => {
    try {
      let id = parseInt(e.target.parentElement.id);
      this.removeTask(id);
    } catch (err) {
      console.log("deleteTaskHandler: ", err);
    }
  };
  completeTaskHandler = (e) => {
    try {
      let id = parseInt(e.target.parentElement.id);
      console.log("id of parent is ", id, e.target.checked);
      this.completeTask(id, e.target.checked);
    } catch (err) {
      console.log("completeTaskHandler: ", err);
    }
  };
  static Style = { list: 0, notes: 1 };
}

function main() {
  let storage = window.localStorage;
  taskListDisplay = new TaskListDisplay();
  let add = document.querySelector(".new-task-btn");
  add.addEventListener("click", (e) => {
    let text = document.querySelector(".input-field").value;
    taskListDisplay.add(text);
  });
}

let taskListDisplay = null;
window.onload = (event) => {
  main();
};

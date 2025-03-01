function $(id) {
  return (id === "" ? null : document.getElementById(id));
}

let tasks = [];

class Task {
  constructor(title, desc, isNotDone, i) {
    this.title = title;
    this.desc = desc;
    this.classes = ["text", "bg-1", "rounded", "p-2", "my-2", "mx-2"];
    this.isNotDone = isNotDone;
    this.isUrgent = false;
    this.i = i;
  }

  render(targetId, redraw = false) {
    let task = document.createElement("div");
    task.classList.add(...this.classes);
    if (!this.isNotDone) {
      task.classList.remove("bg-1", "bg-red");
      task.classList.add("bg-green");
    }
    task.id = `task-${this.i}-container`;
    let div = document.createElement("div");
    div.classList.add("bg-1", "rounded", "p-2", "my-2", "mx-2");
    div.id = `task-${this.i}`;
    div.innerHTML = `
        <h3>Task: ${this.title}</h3>
        <h4>Desc:</h4>
        <p>${this.desc}</p>
        <p>Is urgent: ${this.isUrgent ? "Yes" : "No"}</p>
        `;
    let button = document.createElement("button");
    button.classList.add("rounded");
    if (this.isNotDone) {
      button.innerHTML = "Mark done!";
      button.onclick = () => {
        this.markDone();
      };
      button.classList.add("bg-btn");
    } else {
      button.innerHTML = "Done!";
      button.disabled = true;
      button.classList.add("btn-disabled");
    }
    div.appendChild(button);
    if (redraw) {
      let target = $(targetId);
      target.innerHTML = div.innerHTML;
      let targetContainer = $(`${targetId}-container`);
      targetContainer.classList.remove("bg-1", "bg-red");
      targetContainer.classList.add("bg-green");
    } else {
      task.appendChild(div);
      $(targetId).appendChild(task);
    }
  }

  markDone() {
    this.isNotDone = false;
    this.classes = this.classes.filter((c) => c !== "bg-1");
    this.classes.push("bg-green");
    this.render(`task-${this.i}`, true);
  }
}

class UrgentTask extends Task {
  constructor(title, desc, isNotDone, i) {
    super(title, desc, isNotDone, i);
    this.classes = ["bg-red", "text", "rounded", "p-2", "my-2", "mx-2"];
    this.isUrgent = true;
  }
}

function newTask(title, desc, isUrgent, isNotDone, i) {
  if (isUrgent) {
    return new UrgentTask(title, desc, isNotDone, i);
  }
  return new Task(title, desc, isNotDone, i);
}

function _validateInput(fieldId) {
  const field = $(fieldId);
  if (
    (field.value.length <= 0 ||
      field.value.length > 30) ||
    field.value === ""
  ) {
    field.classList.add("br-red");
    console.log("error for ", fieldId);
    return false;
  }
  field.classList.remove("br-red");
  console.log("pass ", fieldId);
  return true;
}

function addTask() {
  if (!_validateInput("todoTitle") || !_validateInput("todoDesc")) {
    return;
  }
  let task = newTask($("todoTitle").value, $("todoDesc").value, $("todoUrgent").value === "1" ? true : false, true, tasks.length);
  tasks.push(task);
  task.render("tasks");
}

function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks, (k, v) => {
    if (k === "classes" || k === "i") {
      return undefined;
    }
    return v;
  }, 0));
}

function load() {
  if (tasks.length > 0) {
    alert("Tasks already loaded!\nPlease clear tasks first or hold shift for loading a json file!");
    return;
  }
  if (!localStorage.getItem("tasks")) {
    alert("No tasks saved!");
    return;
  }
  tasks = JSON.parse(localStorage.getItem("tasks"));
  let newTasks = [];
  tasks.forEach((task, i) => {
    newTasks.push(newTask(task.title, task.desc, task.isUrgent, task.isNotDone, i));
  });
  tasks = newTasks;
  tasks.forEach((task) => {
    task.render("tasks");
  });
}

function clearTasks() {
  localStorage.removeItem("tasks");
  $("tasks").innerHTML = "";
  alert("Tasks cleared!");
  window.location.reload();
}

function saveFile() {
  let data = JSON.stringify(tasks, (k, v) => {
    if (k === "classes" || k === "i") {
      return undefined;
    }
    return v;
  }, 2);
  let blob = new Blob([data], { type: "application/json" });
  let link = document.createElement('a');

  link.href = URL.createObjectURL(blob);
  link.download = "todo.json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function loadFile(file) {
  let reader = new FileReader();
  reader.onload = function () {
    let data = JSON.parse(reader.result);
    let newTasks = [];
    data.forEach((task) => {
      newTasks.push(newTask(task.title, task.desc, task.isUrgent));
    });
    tasks = newTasks;
    tasks.forEach((task) => {
      task.render("tasks");
    });
  };
  reader.readAsText(file.target.files[0]);
}

$("loadTodo").addEventListener("click", function (event) {
  if (event.shiftKey) {
    $("todoFile").click();
  } else {
    load();
  }
});

$("saveTodo").addEventListener("click", function (event) {
  if (event.shiftKey) {
    saveFile();
  } else {
    save();
  }
});

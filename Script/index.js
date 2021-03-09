// ToDo List - Ayelet Danieli

class Task {
    constructor(id, description="") {
        this.description = description;
        this.id = id;
        this.done = false;
    }
    get() { return this.description;}
    getId() { return this.id; }
    set(newDescription) { this.description = newDescription}
    isDone() { return this.done; }
    toString() { return `Task[${this.id}]: ${this.description} Done:[${this.done ? "yes":"no"}]`}
}

class TaskList {
    constructor() {
        this.tasks = [];
    }

    createTask(taskData="") {
        this.tasks.push(new Task(TaskList.counter, taskData));
        TaskList.counter++;
    } //C
    getTask(id) {
        return this.tasks.find(task => task.id === id)
    } //R
    updateTask(id, newData) {
        let task =this.getTask(id);
      if (task)
            task.set(newData);
    } //U
    removeTask(id) {
        let task = this.getTask(id);
        let i = this.tasks.indexOf(task);
        this.tasks.splice(i, 1);
        TaskList.counter--;
    } // D
    markAsDone(id, mark) {
        let task = this.getTask(id);
        if (task)
            task.done = mark;
     }
    print() { 
        console.log("To Do List:");
        this.tasks.forEach(task => {
            console.log(task.toString());
        })
    }
    list() {
        this.tasks.sort((t1, t2) => t1.isDone() - t2.isDone());
    }
    static counter =0;
}

const toDo = new TaskList();
toDo.createTask("Go to Post office");
toDo.createTask("Send greetings");
toDo.createTask("Buy notebooks for school");
toDo.createTask("Cook soup");
toDo.createTask("Make sushi");
toDo.createTask("Go to dentist");
toDo.createTask("Go shopping");

toDo.print();
toDo.updateTask(0, toDo.getTask(0).get() + ": updated!!!");
toDo.updateTask(1, "send greeting cards");
toDo.print();
toDo.removeTask(3);
toDo.removeTask(10); // remove task that doesn't exist
toDo.print();
toDo.markAsDone(0, true);
toDo.markAsDone(4, true);
toDo.list();
toDo.print();
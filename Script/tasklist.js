// ToDo List - Ayelet Danieli

class Task {
    constructor(id, description="", done=false, priority= Task.Priority.low, timeStamp="") {
        this.description = description;
        this.id = id;
        this.done = done;
        this.priority = priority;
        if (timeStamp === "")
            this.timeStamp = Date.now();
        else
            this.timeStamp = timeStamp;
    }
    get() { return this.description;}
    getId() { return this.id; }
    getTimeStamp()  { return this.timeStamp; }
    set(newDescription) { this.description = newDescription}
    isDone() { return this.done; }
    toString() { return `Task[${this.id}]: ${this.description} Done:[${this.done ? "yes":"no"}]`}
    
    static Priority = { low: 0, medium: 1, high: 2};
    
}

Task.prototype.toJson = function() {
    return JSON.stringify({
        description: this.description, 
        id: this.id, 
        done: this.done, 
        priority: this.priority,
        timeStamp: this.timeStamp,
    });
};

Task.fromJson = function(json) {
    // var data = JSON.parse(json); // Parsing the json string.
    var data = json; // No need to parse, it is already a string
    return new Task(parseInt(data.id), data.description, data.done, parseInt(data.priority), parseInt(data.timeStamp));
};

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
        // TaskList.counter--;
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

// const toDo = new TaskList();
// toDo.createTask("Go to Post office");
// toDo.createTask("Send greetings");
// toDo.createTask("Buy notebooks for school");
// toDo.createTask("Cook soup");
// toDo.createTask("Make sushi");
// toDo.createTask("Go to dentist");
// toDo.createTask("Go shopping");

// toDo.print();
// toDo.updateTask(0, toDo.getTask(0).get() + ": updated!!!");
// toDo.updateTask(1, "send greeting cards");
// toDo.print();
// toDo.removeTask(3);
// toDo.removeTask(10); // remove task that doesn't exist
// toDo.print();
// toDo.markAsDone(0, true);
// toDo.markAsDone(4, true);
// toDo.list();
// toDo.print();

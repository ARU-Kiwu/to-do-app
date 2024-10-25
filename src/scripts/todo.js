const projects = {}

class Project { 
    constructor(name, icon, id) {
        this.name = name;
        this.icon = icon;
        this.id = id;
        this.todos = [];
        this.done =  [];
    }

    addToDo(todo) {
        this.todos.push(todo)
    }

}

class ToDo {
    constructor(title, description, dueDate, priority, id) {
        this.title = title
        this.description = description
        this.dueDate = dueDate
        this.priority = priority
        this.completed = false
        this.id = id
    }

    setDone() {
        this.completed = true
    }
 
    setUndone() {
        this.completed = false
    }

}

function createProject(name, icon) {
    const id = Date.now().toString()
    const project = new Project(name, icon, id)
    projects[id] = project
    return project
}

function deleteProject(id) {
    delete projects[id];
}

function addTodoToProject(projectId, title, description, dueDate, priority) {
    const project = projects[projectId];
    if (project) {
        const todo = new ToDo(title, description, dueDate, priority);
        project.addToDo(todo);
    }
}

function deleteTodoFromProject(projectId, todoIndex) {
    const project = projects[projectId];
    if (project && project.todos[todoIndex]) {
        project.todos.splice(todoIndex, 1); // Remove the todo by index
    }
}

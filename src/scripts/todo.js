export const projects = {}

export class Project { 
    constructor(name, icon, id) {
        this.name = name;
        this.icon = icon;
        this.id = id;
        this.todos = [];
        this.done =  [];
    }

    addToDo(todo) {
        this.todos.push(todo);
    }

    addToDoneList(todo) {
        const doneTodo = this.todos.splice(todo, 1)
        this.done.push(doneTodo);
    }

}

export class ToDo {
    constructor(title, description, dueDate, priority) {
        this.title = title
        this.description = description
        this.dueDate = dueDate
        this.priority = priority
        this.completed = false
        this.id = Date.now().toString()
    }

    setDone() {
        this.completed = true
    }
 
    setUndone() {
        this.completed = false
    }

}

export function createProject(name, icon) {
    const id = Date.now().toString()
    const project = new Project(name, icon, id)
    projects[id] = project
    return project
}

export function deleteProject(id) {
    delete projects[id];
}

export function addTodoToProject(projectId, title, description, dueDate, priority) {
    const project = projects[projectId];
    if (project) {
        const todo = new ToDo(title, description, dueDate, priority);
        project.addToDo(todo);
    }
}

export function deleteTodoFromProject(projectId, todoId) {
    const project = projects[projectId];
    console.log(projects[projectId].indexOf(todoId))
}

export function setTodoCompleted(projectId, todoId) {
    const project = projects[projectId];
    
    if (project) {

        const todoIndex = project.todos.findIndex(todo => todo.id === todoId);

        if (todoIndex !== -1) { // Check if the todo was found
            const todo = project.todos[todoIndex];
            todo.setDone();
            const completedTodo = project.todos.splice(todoIndex, 1);
            project.done.push(completedTodo[0]);
            // You can return the index if needed
            return todoIndex;
        } 
    }
}

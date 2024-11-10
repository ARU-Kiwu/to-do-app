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
        // Find the index of the todo that needs to be marked as completed
        const todoIndex = project.todos.findIndex(todo => todo.id === todoId);

        if (todoIndex !== -1) { // Check if the todo was found
            const todo = project.todos[todoIndex];
            todo.setDone();  // Mark the todo as done (this method needs to exist on your todo object)

            // Remove the todo from the 'todos' array and add it to the 'done' array
            const completedTodo = project.todos.splice(todoIndex, 1)[0]; // Remove and get the todo
            project.done.push(completedTodo);  // Add to 'done' array

            // Optionally return the index of the removed todo
            return todoIndex;
        } 
    }
}

export function setTodoUncompleted(projectId, todoId) {
    const project = projects[projectId];
    
    if (project) {
        // Find the index of the todo that needs to be marked as uncompleted
        const todoIndex = project.done.findIndex(todo => todo.id === todoId);

        if (todoIndex !== -1) { // Check if the todo was found
            const todo = project.done[todoIndex];
            todo.setUndone();  // Mark the todo as undone (this method needs to exist on your todo object)

            // Remove the todo from the 'done' array and add it to the 'todos' array
            const uncompletedTodo = project.done.splice(todoIndex, 1)[0]; // Remove and get the todo
            project.todos.push(uncompletedTodo);  // Add back to 'todos' array

            // Optionally return the index of the moved todo
            return todoIndex;
        } 
    }
}

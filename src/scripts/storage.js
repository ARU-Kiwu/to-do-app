import { projects } from "./todo";
import { ToDo, Project } from "./todo";

// Save data to localStorage
export function saveData() {
    localStorage.setItem('projects', JSON.stringify(projects));
}

// Load data from localStorage
export function loadData() {
    const storedProjects = localStorage.getItem('projects');
    if (storedProjects) {
        const parsedProjects = JSON.parse(storedProjects);

        // Clear existing projects to avoid duplication
        for (const key in projects) {
            delete projects[key];
        }

        // Reconstruct projects and todos
        Object.keys(parsedProjects).forEach(projectId => {
            const projectData = parsedProjects[projectId];
            const project = new Project(projectData.name, projectData.icon, projectData.id);

            // Reconstruct each todo and add it to the project
            project.todos = projectData.todos.map(todoData => {
                const todo = new ToDo(todoData.title, todoData.description, todoData.dueDate, todoData.priority, todoData.id);
                todo.completed = todoData.completed; // Restore completion status
                return todo;
            });

            project.done = projectData.done.map(todoData => {
                const todo = new ToDo(todoData.title, todoData.description, todoData.dueDate, todoData.priority, todoData.id);
                todo.completed = todoData.completed; // Restore completion status
                return todo;
            });

            projects[projectId] = project; // Add the reconstructed project
        });
    }
}

// Function to save the theme in local storage
export function saveThemeToLocalStorage(theme) {
    localStorage.setItem('theme', theme);
}

// Function to get the theme from local storage
export function getThemeFromLocalStorage() {
    return localStorage.getItem('theme');
}

// Function to apply the theme from local storage as a class on the document
export function applyThemeFromLocalStorage() {
    const theme = getThemeFromLocalStorage();
    if (theme) {
        document.documentElement.classList.add(theme);
    }
}

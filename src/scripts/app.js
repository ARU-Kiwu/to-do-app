import { generateSettingsSection, createProjectDialog, generateIcon, generateProjectPage, renderProjectsIcons, generateDashboardPage } from "./dom"
import { getThemeFromLocalStorage, applyThemeFromLocalStorage } from "./storage"
import { projects } from "./todo"

export function app() {
    const theme = getThemeFromLocalStorage()
    applyThemeFromLocalStorage()
    const app = document.querySelector('#app')
    // Create the project container where you can see all of your current projects
    const projectsContainer = document.createElement('div')
    projectsContainer.setAttribute('data-projects', '')
    
        const addProjectContainer = document.createElement('button')
        addProjectContainer.setAttribute('data-addProject', '')

            const addProjectButtonText = document.createElement('span')
            addProjectButtonText.textContent = 'Create a project'
            const addProjectIcon = generateIcon('add')

        addProjectContainer.append(addProjectButtonText, addProjectIcon)    

        //Create Project Logic
        addProjectContainer.addEventListener('click', ()=> {
            createProjectDialog()
        })

        const projectsDisplayContainer = document.createElement('div')
        projectsDisplayContainer.setAttribute('data-projectDisplay', '')

        const settingsContainer = document.createElement('div')
        settingsContainer.setAttribute('data-settings', '')
        generateSettingsSection(settingsContainer)
        
        const mobileExpandContainer = document.createElement('div')
        mobileExpandContainer.classList.add('mobile-expand')
        const mobileIcon = generateIcon('expand')
        mobileExpandContainer.addEventListener('click', ()=> {
            const projectsContainer = document.querySelector('[data-projectdisplay]')
            projectsContainer.classList.add('active')
        })
        mobileExpandContainer.append(mobileIcon)


        projectsContainer.append(addProjectContainer, mobileExpandContainer, projectsDisplayContainer, settingsContainer)

    // Create the page container to display project contents
    const projectPageContainer  = document.createElement('div')
    projectPageContainer.setAttribute('data-project-page', '')

    // Create the container for all the dialog related elements
    const dialogBoxContainer = document.createElement('div')
    dialogBoxContainer.setAttribute('data-dialog', '')

    app.append(projectsContainer, projectPageContainer, dialogBoxContainer)

    renderProjectsIcons(projects)
    generateDashboardPage(projects) 
}




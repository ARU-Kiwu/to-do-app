
import { app } from './scripts/app'
import { createProjectIcon, generateProjectPage, renderTodos } from './scripts/dom'
import { createProject, projects } from './scripts/todo'
import './styles/styles.css'

app()


// const createProjectButton = document.querySelector('#create-project')

// createProjectButton.addEventListener('click', ()=> {
//    const titleElement = document.querySelector('[data-titleinput]')
//    const title = titleElement.value
   
//     const iconContainer = document.querySelector('[data-iconContainer]')
//     const icon = iconContainer.querySelector('[data-icon]')
//     const iconType = icon.dataset.icontype

//     const project = createProject(title, icon)
//     const projectIcon = createProjectIcon(iconType)
//     projectIcon.setAttribute('data', `${project.id}`)

//     const projectsContainer = document.querySelector('#projects-container')
//     projectsContainer.append(projectIcon)
   
//     projectIcon.addEventListener('click', ()=> {
//         console.log(project)
//         generateProjectPage(project)
//         renderTodos(project)
//     })

// })
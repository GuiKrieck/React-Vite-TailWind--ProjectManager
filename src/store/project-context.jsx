import { useContext } from "react";
import { createContext, useState } from "react";


export const ProjectContext = createContext();

export default function ProjectsProvider({ children }) {
    const [projectsState, setProjectsState] = useState({
        selectedProjectId: undefined,
        projects: [],
    });

    return (
        <ProjectContext.Provider value={({ projectsState, setProjectsState })}>
            {children}
        </ProjectContext.Provider>
    )
}

export function useProjectContext() {
    const { projectsState, setProjectsState } = useContext(ProjectContext);

    function handleSaveNewProject() {
        setProjectsState((prevProjectsState) => {
          return {
            ...prevProjectsState,
            selectedProjectId: null,
          }
        })
      }

      function handleCancelNewProject() {
        setProjectsState((prevProjectsState) => {
          return {
            ...prevProjectsState,
            selectedProjectId: undefined,
          }
        })
      }

      function handleAddProject(newProjectData) {
        setProjectsState((prevProjectsState) => {
        
            return {
            ...prevProjectsState,
            selectedProjectId: undefined,
            projects: [...prevProjectsState.projects, newProjectData]
          }
        })
      }

      function handleSelectedProject(projectId) {
        setProjectsState((prevProjectsState) => {
          return {
            ...prevProjectsState,
            selectedProjectId: projectId,
          }
        })
      }

      function handleDeleteProject() {
        setProjectsState((prevProjectsState) => {
          return {
            ...prevProjectsState,
            selectedProjectId: undefined,
            projects: prevProjectsState.projects.filter((project) => project.id !== prevProjectsState.selectedProjectId)
          }
        })
      }

      function handleAddTasks(task) {
        setProjectsState((prevProjectsState) => {
          const newTask = {
            ...task,
          }
    
          const selectedProjectIndex = prevProjectsState.projects.findIndex((project) => project.id === prevProjectsState.selectedProjectId);
    
          const updatedProject = {
            ...prevProjectsState.projects[selectedProjectIndex],
            tasks: [...prevProjectsState.projects[selectedProjectIndex].tasks, newTask]
          };
    
          const updatedProjects = [...prevProjectsState.projects];
          updatedProjects[selectedProjectIndex] = updatedProject;
    
          return {
            ...prevProjectsState,
            projects: updatedProjects,
          }
        })
      }

      function handleDeleteTasks(id) {
        setProjectsState((prevProjectsState) => {
    
          const selectedProjectIndex = prevProjectsState.projects.findIndex((project) => project.id === prevProjectsState.selectedProjectId);
    
          const updatedProject = {
            ...prevProjectsState.projects[selectedProjectIndex],
            tasks: prevProjectsState.projects[selectedProjectIndex].tasks.filter((task) => task.id !== id)
          };
    
          const updatedProjects = [...prevProjectsState.projects];
          updatedProjects[selectedProjectIndex] = updatedProject;
    
          return {
            ...prevProjectsState,
            projects: updatedProjects,
          }
        })
      }



    return{
        projectsState,
        handleSaveNewProject,
        handleCancelNewProject,
        handleAddProject,
        handleSelectedProject,
        handleDeleteProject,
        handleAddTasks,
        handleDeleteTasks,
    }
}
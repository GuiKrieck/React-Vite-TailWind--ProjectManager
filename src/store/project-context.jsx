import { useContext, useEffect, useState } from "react";
import { createContext } from "react";

const getAPIData = 'http://localhost:5000/projects'
const addProjectsAPI = 'http://localhost:5000/addProject'

export const ProjectContext = createContext();

export default function ProjectsProvider({ children }) {
    const [projectsState, setProjectsState] = useState({
        selectedProjectId: undefined,
        projects: [],
    });

    useEffect(() => {
      const fetchProjects = async () =>{
        try {
          const response = await fetch(getAPIData);
          const data = await response.json();
          setProjectsState({
            selectedProjectId: undefined,
            projects: data.projects,
          });
        } catch (error){
          console.error('Error on loading the projects', error)
        }
      };

      fetchProjects();
    },[]);

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

      async function handleAddProject(newProjectData) {
        
        try{
          const response = await fetch(addProjectsAPI, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProjectData)
          });

          if(!response.ok){
            throw new Error('Error on adding the project')
          }
          
          setProjectsState((prevProjectsState) => {
          
              return {
              ...prevProjectsState,
              selectedProjectId: undefined,
              projects: [...prevProjectsState.projects, newProjectData]
            }
          })

        } catch(error){
          console.error(error)
        }
      }

      function handleSelectedProject(projectId) {
        setProjectsState((prevProjectsState) => {
          return {
            ...prevProjectsState,
            selectedProjectId: projectId,
          }
        })
      }

      async function handleEditProject(newProjectData){
        const projectId = projectsState.selectedProjectId;

        try{
          const response = await fetch(`http://localhost:5000/projects/${projectId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProjectData),
          });

          if (!response.ok) {
            throw new Error('Error updating the project')
          }

          const data = await response.json();
          const updatedProject = data.updatedProjectData
          
          setProjectsState((prevProjectsState) => {
            const updatedProjects = prevProjectsState.projects.map(project =>
                project.id === projectId ? updatedProject : project
            );

            return {
                ...prevProjectsState,
                projects: updatedProjects,
            };
        });



        } catch (error) {
          console.error('Error updating the project:', error);
        }
      }

      async function handleDeleteProject() {
        try{
          const response = await fetch(`http://localhost:5000/projects/${projectsState.selectedProjectId}` ,{
            method:'DELETE',
          });

          if(!response.ok) {
            throw new Error('Error deleting the project');
          }

          setProjectsState((prevProjectsState) => {
            return {
              ...prevProjectsState,
              selectedProjectId: undefined,
              projects: prevProjectsState.projects.filter((project) => project.id !== prevProjectsState.selectedProjectId),
            };
          });
        } catch (error) {
          console.error(error);
        }
      }

      async function handleAddTasks(task) {
        const projectId = projectsState.selectedProjectId;

        try{
          const response = await fetch(`http://localhost:5000/addTask/${projectId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
          });

          if(!response.ok) {
            throw new Error("Error on adding the task");
          }

          setProjectsState((prevProjectsState) => {
            const selectedProjectIndex = prevProjectsState.projects.findIndex((project) => project.id === projectId);
      
            const updatedProject = {
              ...prevProjectsState.projects[selectedProjectIndex],
              tasks: [...(prevProjectsState.projects[selectedProjectIndex].tasks || []), task]
            };
      
            const updatedProjects = [...prevProjectsState.projects];
            updatedProjects[selectedProjectIndex] = updatedProject;
      
            return {
              ...prevProjectsState,
              projects: updatedProjects,
            };
          });

        }catch(error){
          console.error(error)
        }
      }

      async function handleDeleteTasks(id) {
        try{
          const response = await fetch(`http://localhost:5000/projects/${projectsState.selectedProjectId}/tasks/${id}`,{
            method: 'DELETE',
          });

          if(!response.ok){
            throw new Error("Error deleting the task");
          }

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
            };
          });
        }catch(error){
          console.log(error);
        }
      }

    return{
        projectsState,
        handleSaveNewProject,
        handleCancelNewProject,
        handleAddProject,
        handleSelectedProject,
        handleEditProject,
        handleDeleteProject,
        handleAddTasks,
        handleDeleteTasks,
    }
}
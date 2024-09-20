import {useState } from "react";
import DefaultBackground from "./components/DefaultBackground";
import NewProject from "./components/NewProject";
import SideBar from "./components/SideBar";
import ProjectBackground from "./components/ProjectBackground";

function App() {

  const[ projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects:[],
    tasks:[],
  });

  function handleAddtasks(task){
    setProjectsState((prevProjectsState) => {
      const newTask = {
        ...task,
        projectId: prevProjectsState.selectedProjectId
      }

      return{
        ...prevProjectsState,
        tasks: [...prevProjectsState.tasks, newTask ]
      }
    })
  }

  function handleDeleteTasks(id){
    setProjectsState((prevProjectsState) => {
      return{
        ...prevProjectsState,
        tasks: prevProjectsState.tasks.filter((task) => task.id !== id)
      }
    })
  }

  function handleSaveNewProject() {
    setProjectsState((prevProjectsState) => {
      return{
        ...prevProjectsState,
        selectedProjectId: null,
      }
    })
  }

  function handleAddProject(newProjectData){
    setProjectsState((prevProjectsState) =>{
      return{
        ...prevProjectsState,
        selectedProjectId: undefined,
        projects:[...prevProjectsState.projects, newProjectData]
      }
    })
  }

  function handleCancelNewProject(){
    setProjectsState((prevProjectsState) => {
      return{
        ...prevProjectsState,
        selectedProjectId: undefined,
      }
    })
  }

  function handleSelectedProject(projectId){
    setProjectsState((prevProjectsState) => {
      return{
        ...prevProjectsState,
        selectedProjectId: projectId,
      }
    })
  }

  function handleDeleteProject(){
    setProjectsState((prevProjectsState) => {
      return{
        ...prevProjectsState,
        selectedProjectId: undefined,
        projects: prevProjectsState.projects.filter((project) => project.id !== prevProjectsState.selectedProjectId)
      }
    })
  }

  
  const selectedProject = projectsState.projects.find((project) => project.id === projectsState.selectedProjectId)

  let content = <ProjectBackground 
                  project={selectedProject} 
                  onDeleteProject={handleDeleteProject} 
                  onAddTask={handleAddtasks}
                  onDeleteTask={handleDeleteTasks}
                  tasks={projectsState.tasks} 
                />
  if(projectsState.selectedProjectId === undefined){
    content= <DefaultBackground onSaveNewProject={handleSaveNewProject} />
  } else if (projectsState.selectedProjectId === null){
    content = <NewProject onAddProject={handleAddProject} onCancel={handleCancelNewProject} />
  }

  return (
    <main className="h-screen flex gap-8 bg-slate-400" >
      <SideBar 
        onSaveNewProject={handleSaveNewProject} 
        projects={projectsState.projects} 
        onSelectProject={handleSelectedProject}
        selectedProjectId={projectsState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;

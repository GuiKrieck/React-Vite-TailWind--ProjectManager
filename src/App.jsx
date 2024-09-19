import {useState } from "react";
import DefaultBackground from "./components/DefaultBackground";
import NewProject from "./components/NewProject";
import SideBar from "./components/SideBar";

function App() {

  const[ projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects:[]
  });

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
  
  let content;
  if(projectsState.selectedProjectId === undefined){
    content= <DefaultBackground onSaveNewProject={handleSaveNewProject} />
  } else if (projectsState.selectedProjectId === null){
    content = <NewProject onAddProject={handleAddProject} onCancel={handleCancelNewProject} />
  }

  function handleCancelNewProject(){
    setProjectsState((prevProjectsState) => {
      return{
        ...prevProjectsState,
        selectedProjectId: undefined,
      }
    })
  }

  return (
    <main className="h-screen flex gap-8 bg-slate-400" >
      <SideBar onSaveNewProject={handleSaveNewProject} projects={projectsState.projects} />
      {content}
    </main>
  );
}

export default App;

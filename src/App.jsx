import { useState } from "react";
import DefaultBackground from "./components/DefaultBackground";
import NewProject from "./components/NewProject";
import SideBar from "./components/SideBar";

function App() {

  const[ projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects:[]
  });

  function handleAddProject() {
    setProjectsState((prevProjectsState) => {
      return{
        ...prevProjectsState,
        selectedProjectId: null,
      }
    })
  }

  let content;
  if(projectsState.selectedProjectId === undefined){
    content= <DefaultBackground onAddProject={handleAddProject} />
  } else if (projectsState.selectedProjectId === null){
    content = <NewProject />
  }

  return (
    <main className="h-screen flex gap-8 bg-slate-400" >
      <SideBar onAddProject={handleAddProject} />
      {content}
    </main>
  );
}

export default App;

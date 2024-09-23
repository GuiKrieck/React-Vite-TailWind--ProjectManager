import DefaultBackground from "./components/DefaultBackground";
import NewProject from "./components/NewProject";
import SideBar from "./components/SideBar";
import ProjectBackground from "./components/ProjectBackground";
import { useProjectContext } from "./store/project-context";

function App() {

  const {projectsState} = useProjectContext();

  let content = <ProjectBackground  />

  if (projectsState.selectedProjectId === undefined) {
    content = <DefaultBackground />
  } else if (projectsState.selectedProjectId === null) {
    content = <NewProject />
  }

  return (
      <main className="h-screen flex gap-8 bg-slate-400" >
        <SideBar />
        {content}
      </main>
  )
}

export default App;

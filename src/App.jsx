import DefaultBackground from "./components/DefaultBackground";
import NewProject from "./components/NewProject";
import SideBar from "./components/SideBar";

function App() {
  return (
    <main className="h-screen flex gap-8 bg-slate-400" >
      <SideBar />
      <DefaultBackground />
      <NewProject />
      
    </main>
  );
}

export default App;

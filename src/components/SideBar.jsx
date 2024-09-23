import { useProjectContext } from "../store/project-context";
import Button from "./Button";

export default function SideBar({ selectedProjectId}){

    const {projectsState, handleSaveNewProject, handleSelectedProject} = useProjectContext();

    return(
        <aside className="w-1/3 px-8 py-16 bg-sky-900 text-stone-50 md:w-72 rounded-r-xl">
            <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">Project Manager</h2>
            <div>
                <Button onClick={handleSaveNewProject}>
                    + Add Project
                </Button> 
            </div>
            <ul className="max-h-[35rem] overflow-y-auto scroll-smooth">
                <h3 className="w-full text-center uppercase py-1 border-b mt-4">Projects</h3>
                {projectsState.projects.map((project) => {

                    let classes

                    const formatedDate = new Date(project.dueDate).toLocaleDateString('en-us', {
                        day:'numeric',
                        month:'short',
                        year:'numeric',
                    })

                    if (project.id === selectedProjectId){
                        classes = "flex justify-between cursor-pointer border-b w-full px-2 py-1 rounded-sm my-1 bg-cyan-400 text-stone-900"
                    } else{
                        classes = "flex justify-between cursor-pointer border-b w-full px-2 py-1 rounded-sm my-1 text-stone-100 hover:bg-cyan-400 hover:text-stone-900"
                    }

                   return (
                    <li
                        className={classes}
                        onClick={() => handleSelectedProject(project.id)}
                        key={project.id}
                    >
                        <button className="max-w-[60%] text-left">{project.title}</button>
                        <p className="text-sm text-red-500">
                            {formatedDate}
                        </p>
                    </li>
                   )}
                )}
            </ul>
        </aside>
    )
}
import { useProjectContext } from "../store/project-context";
import AddTasks from "./AddTasks";

export default function Tasks(){
    
    const {projectsState, handleDeleteTasks} = useProjectContext()

    const selectedProject = projectsState.projects.find((project) => project.id === projectsState.selectedProjectId)
    
    return(
        <section>
            <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
            <AddTasks />
            {selectedProject.tasks.length === 0 && <p className="text-stone-800 mb-4">This project does not have any tasks yet</p>}
            {selectedProject.tasks.length > 0 && 
                <ul className="p-4 rounded-md bg-slate-400 max-h-[23rem] overflow-y-auto" >
                    {selectedProject.tasks.map((task) => (
                        <li className="flex justify-between my-4 border-b-2" key={task.id}>
                            <span>
                                {task.task}
                            </span>
                            <button 
                                className="px-6 py-2 rounded-md bg-stone-200 text-stone-800 hover:bg-red-500 hover:text-stone-950" 
                                onClick={() => handleDeleteTasks(task.id)}
                            >
                                Clear
                            </button>
                        </li>
                    ))}
                </ul>}
        </section>
    )    
}
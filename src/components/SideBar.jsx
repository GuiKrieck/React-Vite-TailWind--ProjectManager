import Button from "./Button";

export default function SideBar({onSaveNewProject, projects}){
    return(
        <aside className="w-1/3 px-8 py-16 bg-sky-900 text-stone-50 md:w-72 rounded-r-xl">
            <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">Project Manager</h2>
            <div>
                <Button onClick={onSaveNewProject}>
                    + Add Project
                </Button> 
            </div>
            <ul>
                <h3 className="w-full text-center uppercase py-1 border-b mt-4">Projects</h3>
                {projects.map((project) => (
                    <li key={project.id}>
                        <button className="w-full text-left px-2 py-1 rounded-sm my-1 text-stone-100 hover:bg-cyan-400 hover:text-stone-900">
                            {project.title}
                        </button>
                    </li>
                ))}
            </ul>
        </aside>
    )
}
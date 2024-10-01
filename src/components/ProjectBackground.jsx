import { useRef } from "react";
import { useProjectContext } from "../store/project-context"
import Tasks from "./Tasks"
import Modal from "./Modal";

export default function ProjectBackground() {

    const modalRef = useRef();

    const {projectsState, handleDeleteProject} = useProjectContext()

    const selectedProject = projectsState.projects.find((project) => project.id === projectsState.selectedProjectId)
    
    const formatedDate = new Date(selectedProject.dueDate).toLocaleDateString('en-us', {
        day:'numeric',
        month:'short',
        year:'numeric',
    })

    function handleDeleteClick(){
        modalRef.current.open().then((result) =>{
            if (result) {
                handleDeleteProject()
            } else {
                return
            }
        })
    }
    
    return (
        <>
        <Modal 
            ref={modalRef} 
            modalTitle="Are you sure you want to delete this project?" 
            modalMessage="Click ok to delete or cancel to close this window."
            isDeleting={true}
        />    
        <section className="w-[35rem] mt-16">
            <div className="pb-4 mb-4 border-b-2 border-stone-300" >
                <div className="flex items-center justify-between" >
                    <h1 className="text-3xl font-bold text-stone-800 mb-2">{selectedProject.title}</h1>
                    <button 
                        className="px-6 py-2 rounded-md bg-stone-200 text-stone-800 hover:bg-red-500 hover:text-stone-950"
                        onClick={handleDeleteClick}
                        >
                        Delete
                    </button>
                </div>
                <p className=" text-stone-900 mb-8">
                    Due: <span className="mb-4 text-red-800"> {formatedDate} </span>
                </p>
                <p className="mb-4 text-stone-900 whitespace-pre-wrap">
                    {selectedProject.description}
                </p>
            </div>
            <Tasks />
        </section>
        </>
    )
}
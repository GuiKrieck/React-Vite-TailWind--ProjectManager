import { forwardRef, useEffect, useImperativeHandle, useRef } from "react"
import { createPortal } from "react-dom"
import Input from "./Input";
import { useProjectContext } from "../store/project-context";


const EditModal = forwardRef(function Modal({projectTitle, projectDescription, projectDueDate},ref) {

    const {handleEditProject} = useProjectContext()
    const refTitle = useRef();
    const refDescription = useRef();
    const refDueDate = useRef();
    
    const todayDate = new Date().toISOString().split("T")[0];
    
    const title = projectTitle
    const description = projectDescription
    const dueDate = new Date(projectDueDate).toISOString().split("T")[0];

    const dialog = useRef()

    useEffect(() =>{
        refTitle.current.value = projectTitle;
        refDescription.current.value = projectDescription;
        refDueDate.current.value = new Date(projectDueDate).toISOString().split("T")[0];
    }, [projectTitle, projectDescription, projectDueDate]);
    
    useImperativeHandle(ref, () =>{
        return{
            open(){
               dialog.current.showModal(); 
            },
            close(){
                dialog.current.close();
            }
        }
    })

    function handleEditSave(){
        
        if(refTitle.current.value === title && refDescription.current.value === description && refDueDate.current.value === dueDate){
            dialog.current.close();
            return
        }

        const updatedProject = {
            title: refTitle.current.value.trim() ==="" ? title: refTitle.current.value,
            description: refDescription.current.value.trim() ==="" ? description: refDescription.current.value,
            dueDate: refDueDate.current.value.trim() ==="" ? dueDate: refDueDate.current.value,
        };

        handleEditProject(updatedProject);

        dialog.current.close();
    }

    function handleEditCancel(){
        refTitle.current.value = title;
        refDescription.current.value = description;
        refDueDate.current.value = dueDate
        dialog.current.close();
    }

    return(
        createPortal(<dialog ref={dialog} className="w-1/2 backdrop:bg-indigo-950/80 p-4 rounded-md shadow-md bg-slate-300 border-4 border-sky-500">
            <h2 className="w-full mb-4 text-center uppercase font-bold text-stone-900 text-xl">Edit project</h2>
            <div>
                <Input ref={refTitle} label="Title" type="text" />
                <Input ref={refDescription} label="Description" isTextArea />
                <Input ref={refDueDate} label="Due Date" type="date" min={todayDate} />
            </div>
            <form
                method="dialog"
                className="flex justify-center gap-5 mb-5"
            >
                <button 
                    className="px-6 py-2 rounded-md bg-stone-200 text-stone-800 hover:bg-cyan-500 hover:text-stone-950"
                    onClick={(handleEditSave)}
                >
                    Save
                </button>
                <button
                    className="px-6 py-2 rounded-md bg-stone-200 text-stone-800 hover:bg-red-500 hover:text-stone-950"
                    onClick={handleEditCancel}
                >
                    Cancel
                </button>
            </form>
        </dialog>,
        document.getElementById('modal-root'))
    )
})
export default EditModal
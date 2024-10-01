import { useRef } from "react";
import Input from "./Input";
import { v4 as uuidv4 } from 'uuid';
import Modal from "./Modal";
import { useProjectContext } from "../store/project-context";

export default function NewProject() {

    const{handleCancelNewProject, handleAddProject}=useProjectContext()

    const modalRef = useRef();

    const refTitle = useRef();
    const refDescription = useRef();
    const refDueDate = useRef();
    const generatedId = uuidv4()
    const todayDate = new Date().toISOString().split("T")[0];

    function handleSave() {
        const enteredTitle = refTitle.current.value;
        const enteredDescription = refDescription.current.value;
        const enteredDueDate = refDueDate.current.value;

        if (enteredTitle.trim() === "" || enteredDescription.trim() === "" || enteredDueDate.trim() === "") {
            modalRef.current.open()
            return
        }


        handleAddProject({
            title: enteredTitle,
            description: enteredDescription,
            dueDate: enteredDueDate,
            id: generatedId,
            tasks:[],
        })
    }

    return (
        <>
            <Modal 
                ref={modalRef} 
                buttonCaption="Close" 
                modalTitle="Invalid Inputs" 
                modalMessage="Please make sure to provide a value for every field."
            />
            <div className="w-[35rem] mt-16" >
                <h2 className="w-full text-center uppercase font-bold text-stone-900 text-xl">New Project</h2>
                <div>
                    <Input ref={refTitle} label="Title" type="text" />
                    <Input ref={refDescription} label="Description" isTextArea />
                    <Input ref={refDueDate} label="Due Date" type="date" min={todayDate} />
                </div>
                <menu className="flex items-center justify-end gap-4 my-4">
                    <li>
                        <button 
                            className="px-6 py-2 rounded-md bg-stone-200 text-stone-800 hover:bg-stone-300 hover:text-stone-950"
                            onClick={handleCancelNewProject}
                        >
                            Cancel
                        </button>
                    </li>
                    <li>
                        <button
                            className="px-6 py-2 rounded-md bg-cyan-400 text-stone-900 hover:bg-cyan-600 hover:text-stone-950"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                    </li>
                </menu>
            </div>
        </>
    )
}
import { useRef } from "react";
import Input from "./Input"

export default function NewProject() {
    
    const refTitle = useRef();
    const refDescription = useRef();
    const refDueDate = useRef();

    const date = new Date().toLocaleDateString();
    

    return(
        <div className="w-[35rem] mt-16" >
            <h2 className="w-full text-center uppercase font-bold text-stone-900 text-xl">New Project</h2>
            <div>
                <Input ref={refTitle} label="Title"  />
                <Input ref={refDescription}label="Description" isTextArea/>
                <Input ref={refDueDate} label="Due Date" type="date" min={date} />
            </div>
            <menu className="flex items-center justify-end gap-4 my-4">
                <li>
                    <button className="px-6 py-2 rounded-md bg-stone-200 text-stone-800 hover:bg-stone-300 hover:text-stone-950">
                        Cancel
                    </button>
                </li>
                <li>
                    <button className="px-6 py-2 rounded-md bg-cyan-400 text-stone-900 hover:bg-cyan-600 hover:text-stone-950">
                        Save
                    </button>
                </li>
            </menu>
        </div>
    )
}
import { useRef, useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import Modal from "./Modal";

export default function AddTasks({ onAdd }) {

    const modalRef = useRef();

    const [newTask, setNewTask] = useState('')
    const generatedId = uuidv4();

    function handleAddTasks() {

        if (newTask.trim() === "") {
            modalRef.current.open()
            return
        }

        const taskToAdd = {
            task: newTask,
            id: generatedId
        }

        onAdd(taskToAdd)
        setNewTask('');
    }

    return (
        <>
            <Modal 
                ref={modalRef} 
                buttonCaption="Close" 
                modalTitle="Invalid Task" 
                modalMessage="Please make sure to provide a value before clicking to add the task."
            />
            <div className="flex items-center gap-4 pb-4 border-b-2 border-stone-300">
                <input
                    type="text"
                    className="w-2/3 px-2 py-1 rounded-sm bg-slate-200"
                    value={newTask}
                    onChange={(event) => setNewTask(event.target.value)}
                />
                <button className="px-2 py-1 rounded bg-cyan-500 text-stone-900 hover:bg-cyan-700 hover:text-stone-950" onClick={handleAddTasks}>Add Task</button>
            </div>
        </>

    )
}
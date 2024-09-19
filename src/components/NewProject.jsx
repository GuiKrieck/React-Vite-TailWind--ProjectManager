import Input from "./Input"

export default function NewProject() {
    return(
        <div className="w-[35rem] mt-16" >
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
            <div>
                <Input label="Title"  />
                <Input label="Description" isTextArea/>
                <Input label="Due Date"/>
            </div>
        </div>
    )
}
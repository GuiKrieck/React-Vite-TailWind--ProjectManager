import Button from "./Button";

export default function SideBar(){
    return(
        <aside className="w-1/3 px-8 py-16 bg-sky-900 text-stone-50 md:w-72 rounded-r-xl">
            <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">Your projects</h2>
            <div>
                
            </div>
            <ul>
                <Button>
                    + Add Project
                </Button>
            </ul>
        </aside>
    )
}
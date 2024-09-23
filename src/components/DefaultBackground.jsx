import noProjectImage from '../assets/no-projects.png'
import { useProjectContext } from '../store/project-context'
import Button from './Button'

export default function DefaultBackground(){

    const {handleSaveNewProject} = useProjectContext()
    return(
        <div className="mt-24 text-center w-2/3">
            <img src={noProjectImage} alt="empty task list" className="w-16 h-16 object-contain mx-auto" />
            <h2 className="text-xl font-bold text-stone-800 my-4">No Project Selected</h2>
            <p className="text-stone-900 mb-4">Select a project or get started with a new one</p>
            <div className='mt-8'>
                <Button onClick={handleSaveNewProject}>
                    Create New Project
                </Button>
            </div>
        </div>
    )
}
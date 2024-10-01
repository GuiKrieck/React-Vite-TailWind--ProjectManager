import { forwardRef, useImperativeHandle, useRef, useState } from "react"
import { createPortal } from "react-dom"
import Button from "./Button"

const Modal = forwardRef(function Modal({modalTitle, modalMessage, buttonCaption, isDeleting = false}, ref) {
    const dialog = useRef()
    const [resolveCallback, setResolveCallback] = useState(null)

    useImperativeHandle(ref, () =>{
        return{
            open(){
               dialog.current.showModal();
               return new Promise((resolve) => {
                setResolveCallback(() => resolve);
               }); 
            },
            close(){
                dialog.current.close();
            }
        }
    })

    function handleClick(value){
        if(resolveCallback) {
            resolveCallback(value)
        }
        dialog.current.close
    }

    return(
        createPortal(<dialog ref={dialog} className="backdrop:bg-indigo-950/80 p-4 rounded-md shadow-md bg-slate-300 border-4 border-sky-500">
            <h2 className="w-full mb-4 text-center uppercase font-bold text-stone-900 text-xl">{modalTitle}</h2>
            <p className="text-stone-900 mb-4">{modalMessage}</p>
            <form method="dialog" className="text-right">
                {!isDeleting && <Button>
                    {buttonCaption}
                </Button>}
                {isDeleting && 
                <div className="flex justify-center gap-8 mt-8" >
                    <Button
                        onClick={() => handleClick(false)}
                    >
                        Cancel
                    </Button>
                    <button 
                        className="px-6 py-2 rounded-md bg-stone-200 text-stone-800 hover:bg-red-500 hover:text-stone-950"
                        onClick={() => handleClick(true)}
                    >
                        Okay
                    </button>
                </div>}
            </form>
        </dialog>,
        document.getElementById('modal-root'))
    )
})

export default Modal
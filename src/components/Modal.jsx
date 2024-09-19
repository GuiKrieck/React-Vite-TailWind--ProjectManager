import { forwardRef, useImperativeHandle, useRef } from "react"
import { createPortal } from "react-dom"
import Button from "./Button"

const Modal = forwardRef(function Modal({modalTitle, modalMessage, buttonCaption}, ref) {
    const dialog = useRef()

    useImperativeHandle(ref, () =>{
        return{
            open(){
               dialog.current.showModal(); 
            }
        }
    })

    return(
        createPortal(<dialog ref={dialog} className="backdrop:bg-indigo-950/80 p-4 rounded-md shadow-md bg-slate-300 border-4 border-sky-500">
            <h2 className="w-full mb-4 text-center uppercase font-bold text-stone-900 text-xl">{modalTitle}</h2>
            <p className="text-stone-900 mb-4">{modalMessage}</p>
            <form method="dialog" className="text-right">
                <Button>
                    {buttonCaption}
                </Button>
            </form>
        </dialog>,
        document.getElementById('modal-root'))
    )
})

export default Modal
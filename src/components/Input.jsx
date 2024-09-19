export default function Input({label, isTextArea, ...props}){
    const inputClasses = "w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-color-600 focus:outline-none focus:border-stone-600"
    
    return(
        <div className="flex flex-col gap-1 my-4">
            <label
                className="text-sm font-bold uppercase text-stone-900" 
                htmlFor={label}
            >
                {label}
            </label>
            {isTextArea 
                ? <textarea 
                    className={inputClasses}
                    id={label} 
                    {...props}
                    /> 
                : <input
                    className={inputClasses}
                    id={label} 
                    {...props} 
                    /> 
                }
        </div>

    )
}
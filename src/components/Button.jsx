export default function Button({children, ...props}){
    return(
        <button 
            className="px-4 py-2 text-xs md:text-base rounded-md bg-cyan-400 text-stone-900 hover:bg-cyan-600 hover:text-stone-950"
            {...props}
        >
            {children}
        </button>
    )
}
interface DialogOptionProps {
    label: string,
    reference: React.RefObject<HTMLInputElement>,
    isDropdown: boolean
}

export const DialogOption = (props: DialogOptionProps) => {

    if(props.isDropdown){
        return <>
            <div className="grid grid-cols-10 items-center">
            <p className='col-span-1 font-bold text-black mt-2'>{props.label}</p>
            <input ref={props.reference} 
            className='p-2 col-span-9 mt-2 h-8 rounded-md w-full bg-gray-100 text-black border border-black' 
            type="checkbox" />
        </div>
        </>
    }

    return <> 
        <div className="grid grid-cols-10 items-center">
            <p className='col-span-1 font-bold text-black mt-2'>{props.label}</p>
            <input ref={props.reference} className='p-2 col-span-9 mt-2 h-8 rounded-md w-full bg-gray-100 text-black border border-black' type="text" />
        </div>
    </>
}
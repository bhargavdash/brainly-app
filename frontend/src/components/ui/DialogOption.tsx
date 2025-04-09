interface DialogOptionProps {
    label?: string,
    value?: string,
    reference?: React.RefObject<HTMLInputElement | HTMLSelectElement>,
    isDropdown: boolean
}

export const DialogOption = (props: DialogOptionProps) => {

    if(props.isDropdown){
        return <>
            <div className="grid grid-cols-10 items-center">
            <p className='col-span-1 font-bold text-black mt-2'>{props.label}</p>
            <select ref={props.reference as React.RefObject<HTMLSelectElement>} className='px-1 col-span-9 mt-2 h-8 rounded-md w-full bg-gray-100 text-black border border-black'>
                <option value="image">Image</option>
                <option value="video">Video</option>
                <option value="tweet">Tweet</option>
                <option value="article">Article/Document</option>
                <option value="audio">Audio</option>
            </select>
        </div>
        </>
    }

    return <> 
        <div className="grid grid-cols-10 items-center">
            {props.label && <p className='col-span-1 font-bold text-black mt-2'>{props.label}</p>}
            <input ref={props.reference as React.RefObject<HTMLInputElement>} value={props.value} className='p-2 col-span-9 mt-2 h-8 rounded-md w-full bg-gray-100 text-black border border-black' type="text" />
        </div>
    </>
}
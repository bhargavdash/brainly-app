
interface DialogOptionProps {
    label?: string,
    value?: string,
    reference?: React.RefObject<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    isDropdown: boolean
    textArea?: boolean
}

export const DialogOption = (props: DialogOptionProps) => {
    
    if(props.textArea){
        return <>
        <div className="flex mt-2 items-center gap-3">
            <div>
                <p className='col-span-1 font-bold text-black'>{props.label}</p>
            </div>
            <div>
                <textarea ref={props.reference as React.RefObject<HTMLTextAreaElement>} 
                name="description" placeholder="Write description for content or leave it for AI" 
                className="p-2 h-10 rounded-md  bg-gray-100 text-black border border-black" 
                rows={20} cols={65}></textarea>
            </div>
        </div>
        </>
    }

    if(props.isDropdown){
        return <>
            <div className="grid grid-cols-10 items-center">
            <p className='col-span-1 font-bold text-black mt-2'>{props.label}</p>
            <select ref={props.reference as React.RefObject<HTMLSelectElement>} className='px-1 col-span-9 mt-2 h-8 rounded-md w-full bg-gray-100 text-black border border-black'>
                <option value="">--Select-Type--</option>
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
            {props.label && <p className='col-span-1 font-bold text-black'>{props.label}</p>}
            <input ref={props.reference as React.RefObject<HTMLInputElement>} value={props.value} className='p-2 col-span-9 h-8 rounded-md w-full bg-gray-100 text-black border border-black' type="text" />
        </div>
    </>
}
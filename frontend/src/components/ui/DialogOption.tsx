interface DialogProps {
    label: string,
    reference: React.RefObject<HTMLInputElement>
}

export const DialogOption = (props: DialogProps) => {
    return <> 
        <div className="grid grid-cols-10 items-center">
            <p className='col-span-1 font-bold'>{props.label}</p>
            <input ref={props.reference} className='p-2 col-span-9 mt-2 h-8 rounded-md w-full bg-gray-100 text-back border border-black' type="text" />
        </div>
    </>
}
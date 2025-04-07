interface DialogLookupProps {
    label: string
}

export const DialogLookup = (props: DialogLookupProps) => {
    return <>
        <div className='flex items-center gap-2'>
            <p className='col-span-1 font-bold'>{props.label}</p>
            <input className='p-2 mt-2 h-8 rounded-md w-full bg-gray-100 text-back border border-black' type="text" />
        </div>
    </>
}
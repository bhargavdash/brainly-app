interface TagItemProps {
    title: string,
}

export const TagItem = (props: TagItemProps) => {
    return <>
        <div className='bg-purple-100 rounded-full p-1'>
            <p className="text-sm">#{props.title}</p>
        </div>
    </>
}
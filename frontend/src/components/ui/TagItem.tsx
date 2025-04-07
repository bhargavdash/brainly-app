interface TagItemProps {
    title: string,
}

export const TagItem = (props: TagItemProps) => {
    return <>
        <div className='bg-purple-100 h-6 px-2'>
            <p className="text-sm">#{props.title}</p>
        </div>
    </>
}
interface FilterOptionProps {
    type: string,
    contentType: string,
    handleCheckboxChange: (str: string) => void,
}

const LabelForType = (value: string): string => {
    switch (value) {
        case "tweet":
            return "Tweet"
        case "article":
            return "Article"
        case "video":
            return "Video"
        case "audio":
            return "Audio"
        case "image":
            return "Image"
    }
    return ""
}

export const FilterOption = (props: FilterOptionProps) => {
    return <>
        <div>
            <input name={props.type} checked={props.contentType === props.type} onChange={() => props.handleCheckboxChange(props.type)} type="checkbox" className='mr-1'/>
            <label htmlFor={props.type}>{LabelForType(props.type)}</label>
        </div>
    </>
}
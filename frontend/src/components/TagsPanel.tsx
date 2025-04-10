import axios from "axios";
import { useEffect, useState } from "react"


interface TagInterface {
    _id: string,
    title: string
}

interface TagsPanelProps {
    tagValue: string,
    setTagValue: React.Dispatch<React.SetStateAction<string>>
}

export const TagsPanel = (props: TagsPanelProps) => {

    const [suggestionTags, setSuggestionTags] = useState<TagInterface[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    
    useEffect(() => {
        const searchDB = async() => {
            if(props.tagValue.trim() === ""){
                setSuggestionTags([])
                return;
            }
            const response = await axios.get(`http://localhost:3000/api/v1/tags?search=${props.tagValue}`, {
                headers: {
                    token: localStorage.getItem("token")
                }
            })

            setSuggestionTags(response.data.tags)

            console.log("SEARCH RESULTS: ", suggestionTags)
        }

        const debounceSearch = setTimeout(() => {
            searchDB();
        },300)

        return () => clearTimeout(debounceSearch)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.tagValue])

    const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.setTagValue(e.target.value);
    }

    const handleSuggestionClick = (value: string) => {
        props.setTagValue(value);
        setShowSuggestions(false);
    }

    console.log("TAG COMPONENT INPUT VALUE: ", props.tagValue)
    console.log("Show suggestions: ", showSuggestions);

    return <>
        <div className="grid grid-cols-10 items-center">
            <p className='col-span-1 font-bold text-black mt-2'>Tags</p>
            <input onChange={handleInputValue}
            value={props.tagValue}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setShowSuggestions(false)}
            placeholder="Type to see available tags..."
            className='p-2 col-span-9 mt-2 h-8 rounded-md w-full bg-gray-100 text-black border border-black' 
            type="text" />
        </div>
        <div className="absolute left-[82px] top-[265px] w-[192px]">
            {showSuggestions && suggestionTags.length == 0 && props.tagValue.trim() != "" && 
            <div className='bg-gray-200 text-gray-900 p-2'>
                <div className='hover:cursor-pointer bg-white rounded-md p-2 w-44 mb-1'>
                    <p>{props.tagValue}</p>
                    <p>(Create new)</p>
                </div>
            </div>}
            
            {showSuggestions && suggestionTags.length != 0 && <div className='bg-gray-200 text-gray-900 p-2'>
                <ul>
                    {suggestionTags.map(tag => {
                        return <li onMouseDown={() => handleSuggestionClick(tag.title)}
                         className='hover:cursor-pointer bg-white rounded-md p-2 w-44 mb-1'
                         key={tag._id}>
                            {tag.title}
                        </li>         
                        })}
                </ul>
            </div>}
        </div>
    </>
}
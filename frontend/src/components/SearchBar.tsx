import { SearchIcon } from "../icons/SearchIcon"
import { Button } from "./ui/Button"
import { useRef, useState } from "react"
import axios from "axios"
import { Dialog } from "./ui/Dialog"
import { DialogOption } from "./ui/DialogOption"
import { PlusIcon } from "../icons/PlusIcon"
import { FilterIcon } from "../icons/FilterIcon"
import { FilterOption } from "./ui/FilterOption"
import { TagsPanel } from "./TagsPanel"

interface SearchBarProps {
    reloadPage: () => void,
    contentType: string,
    setContentType: React.Dispatch<React.SetStateAction<string>>,
    isSharingBrain: boolean,
    setIsSharingBrain: React.Dispatch<React.SetStateAction<boolean>>,
    onContentAdded: () => void,
    isDialogOpen: boolean,
    setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const SearchBar = (props: SearchBarProps) => {

    const [isFilterOpen, setIsFilterOpen] = useState(false);

    console.log("Selected Type:" , props.contentType);

    const typeRef = useRef<HTMLSelectElement>(null)
    const titleRef = useRef<HTMLInputElement>(null)
    const linkRef = useRef<HTMLInputElement>(null)
    const [tagValue, setTagValue] = useState("");
    
    console.log("Dialog", props.isDialogOpen);

    const handleAddContent = () => {
        props.setIsDialogOpen(true);
    }

    const postNewContent = async() => {
        console.log("Type: ", typeRef.current?.value);
        console.log("Link:", linkRef.current?.value);
        console.log("Title:", titleRef.current?.value);
        console.log("Tags: ", tagValue);

        const response = await axios.post('http://localhost:3000/api/v1/content', {
            type: typeRef.current?.value,
            link: linkRef.current?.value,
            title: titleRef.current?.value,
            tags: tagValue
        }, {
            headers: {
                token: localStorage.getItem('token')
            }
        })

        console.log("POST content: ", response.data);
        props.onContentAdded();
        props.setIsDialogOpen(false);
        setTagValue("")
    }

    const handleCheckboxChange = (value: string) => {
        props.setContentType((prev) => (prev === value ? "all" : value));
    }

    const openFilter = () => {
        setIsFilterOpen(true);
    }
    
    return <>
        <div className='text-white h-16 bg-gray-200 p-2 rounded-md flex justify-between pt-2'>
            <div className='flex gap-2'>
                <div className='absolute text-black mt-[10px] ml-1'>
                    <SearchIcon size="lg" />
                </div>
                <div>
                    <input placeholder="Search here..."  className="bg-gray-400 text-black placeholder-black pl-10 mt-1 h-10 w-96 rounded-lg" type="text" />
                </div>
                <div onClick={openFilter} className="text-black mt-3 hover:cursor-pointer">
                    <FilterIcon size="lg" />
                </div>
                <div className='ml-1 mt-1'>
                    <Button variant="primary" size="md" 
                        text="Search"
                        onClick={handleAddContent} 
                        hasBackground={true}
                    />
                </div>
            </div>
            <div className='mt-1'>
                <Button variant="primary" size="xl" 
                    text="Add Content"
                    startIcon={<PlusIcon size='md'/>}
                    onClick={handleAddContent} 
                    hasBackground={true}
                />
            </div>
        </div>

        {isFilterOpen && <div>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-[90]" onClick={() => setIsFilterOpen(false)}></div>
            <div className="absolute bg-gradient-to-br from-gray-400 to-gray-300 rounded-md flex flex-col text-black p-2 mt-2 w-60 ml-[400px] z-[91]">
                <div>
                    <FilterOption 
                        type="tweet"
                        handleCheckboxChange={handleCheckboxChange}
                        contentType={props.contentType}
                    />
                    <FilterOption 
                        type="audio"
                        handleCheckboxChange={handleCheckboxChange}
                        contentType={props.contentType}
                    />
                    <FilterOption 
                        type="article"
                        handleCheckboxChange={handleCheckboxChange}
                        contentType={props.contentType}
                    />
                    <FilterOption 
                        type="video"
                        handleCheckboxChange={handleCheckboxChange}
                        contentType={props.contentType}
                    />
                    <FilterOption 
                        type="image"
                        handleCheckboxChange={handleCheckboxChange}
                        contentType={props.contentType}
                    />
                </div>
                <div className="ml-auto text-white">
                    <Button 
                        text="Apply"
                        variant="secondary"
                        size="sm"
                        hasBackground={true}
                        onClick={() => {
                            setIsFilterOpen(false);
                            props.reloadPage();
                        }}
                     />
                </div>
            </div>
        </div>}
        
        {!props.isSharingBrain && <Dialog 
        title="Add new content"
        isOpen={props.isDialogOpen} 
        onAdd={postNewContent}
        onClose={() => {props.setIsDialogOpen(false)}}>
            <div className='flex flex-col gap-4'>
                <DialogOption label="Title" isDropdown={false} reference={titleRef} />
                <DialogOption label="Link" isDropdown={false} reference={linkRef} />
                <DialogOption label="Type" isDropdown={true} reference={typeRef} />
                <TagsPanel 
                    tagValue={tagValue}
                    setTagValue={setTagValue}
                 />
            </div>
        </Dialog>}

    </>
}
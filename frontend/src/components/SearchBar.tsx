import { SearchIcon } from "../icons/SearchIcon"
import { Button } from "./ui/Button"
import { useRef } from "react"
import axios from "axios"
import { Dialog } from "./ui/Dialog"
import { DialogOption } from "./ui/DialogOption"
import { PlusIcon } from "../icons/PlusIcon"

interface SearchBarProps {
    isSharingBrain: boolean,
    setIsSharingBrain: React.Dispatch<React.SetStateAction<boolean>>,
    onContentAdded: () => void,
    isDialogOpen: boolean,
    setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const SearchBar = (props: SearchBarProps) => {

    const typeRef = useRef<HTMLSelectElement>(null)
    const titleRef = useRef<HTMLInputElement>(null)
    const linkRef = useRef<HTMLInputElement>(null)
    const tagsRef = useRef<HTMLInputElement>(null)
    
    console.log("Dialog", props.isDialogOpen);

    const handleAddContent = () => {
        props.setIsDialogOpen(true);
    }

    const postNewContent = async() => {
        console.log("Type: ", typeRef.current?.value);
        console.log("Link:", linkRef.current?.value);
        console.log("Title:", titleRef.current?.value);
        console.log("Tags: ", tagsRef.current?.value);

        const response = await axios.post('http://localhost:3000/api/v1/content', {
            type: typeRef.current?.value,
            link: linkRef.current?.value,
            title: titleRef.current?.value,
            tags: ["67f0f2b48ce2b519fa13e50d", "67f0f2db8ce2b519fa13e50f"]
        }, {
            headers: {
                token: localStorage.getItem('token')
            }
        })

        console.log("POST content: ", response.data);
        props.onContentAdded();
        props.setIsDialogOpen(false);
    }

    
    return <>
        <div className='text-white h-16 bg-gray-200 p-2 rounded-md flex justify-between pt-2 mb-10'>
            <div className='flex'>
                <div className='absolute text-black mt-[10px] ml-1'>
                    <SearchIcon size="lg" />
                </div>
                <div>
                    <input placeholder="Search here..."  className="bg-gray-400 text-black placeholder-black pl-10 mt-1 h-10 w-96 rounded-lg" type="text" />
                </div>
                <div className='ml-2 mt-1'>
                    <Button variant="primary" size="md" 
                        text="Search"
                        onClick={handleAddContent} 
                        hasBackground={true}
                    />
                </div>
            </div>
            <div>
                <Button variant="primary" size="xl" 
                    text="Add Content"
                    startIcon={<PlusIcon size='md'/>}
                    onClick={handleAddContent} 
                    hasBackground={true}
                />
            </div>
        </div>
        
        {!props.isSharingBrain && <Dialog 
        title="Add new content"
        isOpen={props.isDialogOpen} 
        onAdd={postNewContent}
        onClose={() => {props.setIsDialogOpen(false)}}>
            <div className='flex flex-col gap-4'>
                <DialogOption label="Title" isDropdown={false} reference={titleRef} />
                <DialogOption label="Link" isDropdown={false} reference={linkRef} />
                <DialogOption label="Type" isDropdown={true} reference={typeRef} />
                <DialogOption label="Tags" isDropdown={false} reference={tagsRef}/>
            </div>
        </Dialog>}

    </>
}
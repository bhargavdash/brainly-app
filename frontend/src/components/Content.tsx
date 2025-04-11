import { TagInterface } from "../App"
import { AudioIcon } from "../icons/AudioIcon"
import { DeleteIcon } from "../icons/DeleteIcon"
import { DocumentIcon } from "../icons/DocumentIcon"
import { ImageIcon } from "../icons/ImageIcon"
import { ShareIcon } from "../icons/ShareIcon"
import { XIcon } from "../icons/XIcon"
import { YoutubeIcon } from "../icons/YoutubeIcon"
import { TagItem } from "./ui/TagItem"
import axios from "axios"

interface ContentProps {
    id: string,
    type: "image" | "video" | "article" | "audio" | "tweet",
    description?: string,
    link: string, 
    title: string, 
    tags: Array<TagInterface>,
    createdAt: Date | string,
    onContentDeleted: () => void
}

export const Content = (props: ContentProps) => {

    const deleteItem = async() => {
        const response = await axios.delete('http://localhost:3000/api/v1/content', {
            data: {
                contentId: props.id
            },
            headers: {
                token: localStorage.getItem('token')
            }
        })
        props.onContentDeleted();
        console.log("Delete content:", response.data);
    }

    const getIcon = () => {
        switch (props.type) {
            case "image":
                return <ImageIcon size="md" />
            case "video":
                return <YoutubeIcon size="md" />
            case "article": 
                return <DocumentIcon size="md" />
            case "audio":
                return <AudioIcon size="md" />
            case "tweet":
                return <XIcon size="md" />
            default:
                break;
        }
    }

    return <>
        <div className='w-64 p-4 h-80 bg-white shadow-md text-black rounded-lg'>
            <div className='flex justify-between'>
                <div className='flex gap-2 items-center'>
                    {getIcon()}
                    <p className='text-lg font-bold'>{props.title}</p>
                </div>
                <div className='flex gap-2'>
                    <ShareIcon size='md' />
                    <DeleteIcon onClick={deleteItem} size='md' />
                </div>
            </div>
            <div className="hover:underline">
                <a href={props.link} target="/">Link to Content</a>
            </div>
            <div className='mt-2 text-lg'>
                {props.description}
            </div>
            <div className="mt-2 flex flex-wrap gap-2 text-xl">
                {props.tags.map(tag => {
                    return <TagItem 
                        key={tag._id}
                        title={tag.title}
                    />
                })}
            </div>
            <div className='mt-2 text-md'>
                <p>Added on:</p>
                <div className='font-sans font-bold'>
                    {props.createdAt.toLocaleString("en-IN", {
                        timeZone: "Asia/Kolkata",
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true
                    })}
                    &nbsp;IST
                </div>
                
            </div>
        </div>
    </>
}
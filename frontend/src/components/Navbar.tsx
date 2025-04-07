import { useRef } from "react"
import axios from "axios"
import { ShareIcon } from "../icons/ShareIcon"
import { PlusIcon } from "../icons/PlusIcon"
import { Button } from "./ui/Button"
import { useNavigate } from "react-router-dom"
import { Dialog } from "./ui/Dialog"
import { DialogOption } from "./ui/DialogOption"
// import { DialogLookup } from "./ui/DialogLookup"

interface NavbarProps {
    isLoggedIn: boolean,
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
    isDialogOpen: boolean,
    setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
    onContentAdded: () => void
}

export const Navbar = (props: NavbarProps) => {

    const typeRef = useRef<HTMLInputElement>(null)
    const titleRef = useRef<HTMLInputElement>(null)
    const linkRef = useRef<HTMLInputElement>(null)
    const tagsRef = useRef<HTMLInputElement>(null)
    
    console.log("Dialog", props.isDialogOpen);

    const navigate = useNavigate();

    const handleAddContent = () => {
        props.setIsDialogOpen(true);
    }

    const handleShareBrain = () => {

    }

    const loginUser = async () => {
        navigate('/login')
    }

    const signupUser = async() => {
        navigate('/signup')
    }
    const logoutUser = async() => {
        localStorage.removeItem('token')
        props.setIsLoggedIn(false);
        navigate('/')
    }

    const addContent = async() => {
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
    <div className='text-white p-2 h-16 flex flex-1 justify-between bg-gray-600'>
        <div className='text-xl font-bold'>
            All notes
        </div>
        <div className="flex gap-4">
            <Button 
            variant="secondary" size="lg" 
            text={`${props.isLoggedIn ? "Share Brain" : "SignUp"}`} 
            startIcon={props.isLoggedIn ? <ShareIcon size="md" /> : null} 
            onClick={props.isLoggedIn ? handleShareBrain : signupUser} 
            />

            <Button variant="primary" size="lg" 
            text={`${props.isLoggedIn ? "Add Content" : "Login"}`} 
            startIcon={props.isLoggedIn ? <PlusIcon size="md" /> : null} 
            onClick={props.isLoggedIn ? handleAddContent : loginUser}
            />

            {props.isLoggedIn && 
                <Button variant="primary" size="lg" 
                text="Logout" 
                onClick={logoutUser}
                />
            }
        </div>
    </div>
    <div className="absolute left-[5%] top-[20%] shadow-2xl">
        <Dialog isOpen={props.isDialogOpen} 
        onAdd={addContent}
        onClose={() => {props.setIsDialogOpen(false)}}>
            <div className='flex flex-col gap-4'>
                <DialogOption label="Title" reference={titleRef} />
                <DialogOption label="Link" reference={linkRef} />
                <DialogOption label="Type" reference={typeRef} />
                <DialogOption label="Tags" reference={tagsRef}/>
                {/* <div className='flex gap-2'>
                    <div className="flex-1">
                        <DialogLookup label="Type" />
                    </div>
                    <div className='flex-1'>
                        <DialogLookup label="Tags" />
                    </div>
                </div> */}
            </div>
        </Dialog>
    </div>
    </>
}
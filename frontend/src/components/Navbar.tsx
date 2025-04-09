import { ShareIcon } from "../icons/ShareIcon"
import { Button } from "./ui/Button"
import { useNavigate } from "react-router-dom"
import { LogoIcon } from "../icons/LogoIcon"
import { Dialog } from "./ui/Dialog"
import { DialogOption } from "./ui/DialogOption"
import { useState } from "react"
import axios from "axios"
import Swal from "sweetalert2"

interface NavbarProps {
    isSharingBrain: boolean,
    setIsSharingBrain: React.Dispatch<React.SetStateAction<boolean>>,
    isDialogOpen: boolean,
    setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
    isLoggedIn: boolean,
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

export const Navbar = (props: NavbarProps) => {
    const [sharableLink, setSharableLink] = useState("")

    const navigate = useNavigate();


    const fetchLink = async() => {
        const response = await axios.post('http://localhost:3000/api/v1/brain/share', {
            share: true
        }, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
        console.log(response.data);
        setSharableLink(`http://localhost:3000/api/v1/brain/${response.data.shareLink}`)
    }

    const handleShareBrain = () => {
        props.setIsDialogOpen(true);
        props.setIsSharingBrain(true);
        fetchLink();
    }

    const copySharableLink = () => {
        if(sharableLink){
            navigator.clipboard.writeText(sharableLink)
            .then(() => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Link copied to clipboard!!",
                    showConfirmButton: false,
                    timer: 1500
                  });
            })
            .catch(() => {
                console.log("Cannot copy link to clipboard")
            })
        }
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

    const routeToHome = () => {
        navigate('/')
    }    
    
    return <>
    <div className='sticky top-0 z-50 shadow-md text-white p-2 h-16 flex flex-1 justify-between bg-gray-900'>
        <div className="flex gap-2 items-center ml-2">
            <LogoIcon size="lg"/>
            <p onClick={routeToHome} className="hover:cursor-pointer font-bold text-xl">BrainVault</p>
        </div>
        <div className="flex gap-4">
            <Button 
            variant="secondary" size="lg" 
            text={`${props.isLoggedIn ? "Share Brain" : "SignUp"}`} 
            startIcon={props.isLoggedIn ? <ShareIcon size="md" /> : null} 
            onClick={props.isLoggedIn ? handleShareBrain : signupUser} 
            hasBackground={false}
            />


            <Button variant="secondary" size="lg" 
            text={`${props.isLoggedIn ? "Logout" : "Login"}`}  
            onClick={props.isLoggedIn ? logoutUser : loginUser}
            hasBackground={false}
            />
            
        </div>
    </div>
    {props.isSharingBrain &&  <Dialog 
            title="Share your brain using this link"
            isOpen={props.isDialogOpen}
            onClose={() => {
                props.setIsDialogOpen(false);
                props.setIsSharingBrain(false);
            }}
            onAdd={copySharableLink}
        >
            <div>
                <DialogOption value={sharableLink} isDropdown={false} /> 
            </div>
    </Dialog>}
    </>
}
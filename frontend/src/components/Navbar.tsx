import { ShareIcon } from "../icons/ShareIcon"
import { PlusIcon } from "../icons/PlusIcon"
import { Button } from "./ui/Button"
import { useNavigate } from "react-router-dom"

interface NavbarProps {
    isLoggedIn: boolean,
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

export const Navbar = (props: NavbarProps) => {

    const navigate = useNavigate();

    const handleAddContent = () => {

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
            onClick={props.isLoggedIn ? handleShareBrain : signupUser} />

            <Button variant="primary" size="lg" 
            text={`${props.isLoggedIn ? "Add Content" : "Login"}`} 
            startIcon={props.isLoggedIn ? <PlusIcon size="md" /> : null} 
            onClick={props.isLoggedIn ? handleAddContent : loginUser}/>

            {props.isLoggedIn && 
                <Button variant="primary" size="lg" 
                text="Logout" 
                onClick={logoutUser}/>
            }
        </div>
    </div>
    </>
}
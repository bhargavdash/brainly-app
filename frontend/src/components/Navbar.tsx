import { ShareIcon } from "../icons/ShareIcon"
import { Button } from "./ui/Button"
import { useNavigate } from "react-router-dom"
import { LogoIcon } from "../icons/LogoIcon"


interface NavbarProps {
    isLoggedIn: boolean,
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

export const Navbar = (props: NavbarProps) => {

    const navigate = useNavigate();

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
    </>
}
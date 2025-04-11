import { useRef } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface LoginProps {
    isLoggedIn: boolean,
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

export const Login = (props: LoginProps) => {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    const routeToSignUp = () => {
        navigate('/signup')
    }

    const handleLogin = async() => {
        const response = await axios.post("https://brainly-app-7kzj.onrender.com/api/v1/signin", {
            username: usernameRef.current?.value,
            password: passwordRef.current?.value
        })

        console.log(response.data);

        localStorage.setItem('token', response.data.token)
        props.setIsLoggedIn(true)
        navigate('/dashboard');
    }
    
    return <>
    <div className="flex justify-center items-center bg-gradient-to-b from-blue-950  to-blue-900 w-full h-screen text-white">
    
        <div className='rounded-lg px-6 py-4 bg-gradient-to-tr from-gray-800 to-gray-700 text-gray-200 w-[30%] mx-auto flex flex-col'>
            <div className='mx-auto flex flex-col justify-center items-center mb-10'>
                <p className='font-bold text-2xl'>Welcome to BrainVault</p>
                <p className='text-sm'>Your digital second brain for everything</p>
            </div>
            <div>
                <p className='mb-2 font-bold'>Username:</p>
                <input ref={usernameRef} className="p-2 text-white h-8 rounded-md w-full mb-3 bg-gray-600" type="email" />
            </div>
            <div>
                <p className='mb-2 font-bold'>Password: </p>
                <input ref={passwordRef} className="p-2 text-white h-8 rounded-md w-full mb-3 bg-gray-600" type="password" />
            </div>
            <div onClick={handleLogin} className="transition-all duration-500 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 font-bold hover:cursor-pointer p-2 mt-4 text-md flex justify-center items-center rounded-lg w-full mb-3 bg-gradient-to-l from-blue-700 to-purple-700 text-white">
                <p>Login</p>
            </div>
            <div className='flex justify-center items-center'>
                <p>Don't have an account ?&nbsp;</p>
                <p onClick={routeToSignUp} className='text-blue-600 hover:underline hover:cursor-pointer'>SignUp</p>
            </div>
        </div>
    </div>
    </>
}
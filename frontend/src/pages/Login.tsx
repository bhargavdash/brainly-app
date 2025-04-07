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

    const handleLogin = async() => {
        const response = await axios.post("http://localhost:3000/api/v1/signin", {
            username: usernameRef.current?.value,
            password: passwordRef.current?.value
        })

        console.log(response.data);

        localStorage.setItem('token', response.data.token)
        props.setIsLoggedIn(true)
        navigate('/dashboard');
    }
    
    return <>
        <div className='rounded-lg px-4 py-2 mt-20 bg-black text-white w-[60%] mx-auto flex flex-col'>
            <div className='mx-auto font-bold text-2xl mb-10'>
                Login Here
            </div>
            <div>
                <p className='mb-2'>Username:</p>
                <input ref={usernameRef} className="p-2 text-black h-8 rounded-md w-full mb-3" type="email" />
            </div>
            <div>
                <p className='mb-2'>Password: </p>
                <input ref={passwordRef} className="p-2 text-black h-8 rounded-md w-full mb-3" type="password" />
            </div>
            <div onClick={handleLogin} className="hover:cursor-pointer h-8 mt-4 text-lg flex justify-center items-center rounded-lg w-full mb-3 bg-white text-black">
                Login
            </div>
        </div>
    </>
}
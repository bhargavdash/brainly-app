import { useEffect , useState } from "react"
import { Content } from "../components/Content"
import axios from "axios";

export const Dashboard = () => {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const fetchData = async() => {
            const response = await axios.get('http://localhost:3000/api/v1/content', {
                headers: {
                    token: localStorage.getItem("token")
                }
            })
            setUserData(response.data.content);
        }
        fetchData();
    },[])

    console.log(userData);
    return <>
    <div className='px-4 py-4 flex flex-wrap gap-8'>
    <Content />
    <Content />
    <Content />
    <Content />
    <Content />
    <Content />
    <Content />
    <Content />
    <Content />
    </div>
    </>
}
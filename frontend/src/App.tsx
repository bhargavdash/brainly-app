import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { Dashboard } from "./pages/Dashboard";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import axios from "axios";

export interface TagInterface {
  _id: string,
  title: string,
}

export interface ContentItem {
  _id: string, 
  title: string,
  type: "image" | "video" | "article" | "audio",
  __v?: number,
  link: string,
  tags: Array<TagInterface>
}


function App (){
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [userData, setUserData] = useState<ContentItem[]>([]);

  const fetchData = async() => {
    const response = await axios.get('http://localhost:3000/api/v1/content', {
        headers: {
            token: localStorage.getItem("token")
        }
    })
    setUserData(response.data.content);
  }

  useEffect(()=> {
    setIsLoggedIn(localStorage.getItem("token") ? true : false);
    fetchData();
  },[])

  return <>
    <div>
    
    <div className='flex min-h-screen'>
      <Sidebar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      <div className={`relative flex-1 bg-gray-100`}>
        <BrowserRouter>
          <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}
          isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen}
          onContentAdded={fetchData}
           />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/login' element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}/>
            <Route path='/signup' element={<Signup />} />
            <Route path='/dashboard' element={<Dashboard  onContentDeleted={fetchData} userData={userData}/>} />
          </Routes>
        </BrowserRouter>
      </div>
      
    </div>
    </div>
  </>
}

export default App;
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
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
  type: "image" | "video" | "article" | "audio" | "tweet",
  __v?: number,
  link: string,
  createdAt: Date | string,
  tags: Array<TagInterface>,
}


function App (){
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSharingBrain, setIsSharingBrain] = useState(false);
  const [contentType, setContentType] = useState("all");

  const [userData, setUserData] = useState<ContentItem[]>([]);

  const fetchData = async() => {
    console.log("Fetch data called")
    console.log(`URL: http://localhost:3000/api/v1/content/${contentType}`)
    const response = await axios.get(`http://localhost:3000/api/v1/content/${contentType}`, {
        headers: {
            token: localStorage.getItem("token")
        }
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const parsedContent: ContentItem[] = response.data.content.map((item: any) => ({
      ...item,
      createdAt: typeof item.createdAt === "string" ? new Date(item.createdAt) : item.createdAt,
    }));

    setUserData(parsedContent);
  }


  useEffect(()=> {
    setIsLoggedIn(localStorage.getItem("token") ? true : false);
      if(isLoggedIn){
        fetchData();
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  return <>
    <div className='font-serif min-h-screen bg-gray-100'>
      <BrowserRouter>
        <Navbar isSharingBrain={isSharingBrain} setIsSharingBrain={setIsSharingBrain}
        isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen}
        isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <main className="relative">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/login' element={<Login  isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}/>
            <Route path='/signup' element={<Signup />} />
            <Route path='/dashboard' element={<Dashboard
              contentType={contentType}
              setContentType={setContentType}  
              isSharingBrain={isSharingBrain} 
              setIsSharingBrain={setIsSharingBrain}
              onContentAdded={fetchData} 
              onContentDeleted={fetchData} 
              reloadPage={fetchData}
              userData={userData} 
              isDialogOpen={isDialogOpen} 
              setIsDialogOpen={setIsDialogOpen}
              />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  </>
}

export default App;
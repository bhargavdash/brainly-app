import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Dashboard } from "./pages/Dashboard";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import axios from "axios";
import { ProtectedRoute } from "./components/ProtectedRoute";


export interface TagInterface {
  _id: string,
  title: string,
}

export interface ContentItem {
  _id: string, 
  title: string,
  type: "image" | "video" | "article" | "audio" | "tweet",
  description?: string,
  __v?: number,
  link: string,
  createdAt: string,
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
            
            <Route path='/dashboard' element={<ProtectedRoute>
              <Dashboard
              contentType={contentType}
              setContentType={setContentType}  
              isSharingBrain={isSharingBrain} 
              setIsSharingBrain={setIsSharingBrain}
              onContentAdded={fetchData} 
              onContentDeleted={fetchData} 
              reloadPage={fetchData}
              userData={userData} 
              setUserData={setUserData}
              isDialogOpen={isDialogOpen} 
              setIsDialogOpen={setIsDialogOpen}
              /> 
              </ProtectedRoute> } />

          </Routes>
        </main>
      </BrowserRouter>
    </div>
  </>
}

export default App;
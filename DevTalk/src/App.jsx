import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from "./views/Home/Home";
import About from "./views/About/About";
import Contact from "./views/Contact/Contact";
import Footer from "./components/Footer/Footer";
import Trending from "./views/Trending/Trending";
import Login from "./views/Login/Login";
import Register from "./views/Register/Register";
import { useState } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "./config/firebase-config.js";



function App() {
   const [user] = useAuthState(auth);
   const [appState, setAppState] = useState({
    user,
    userData: false,
   })

   if(appState.user !== user) {
    setAppState({user});
   }

  return (
    <div className="bg-[rgb(36,36,36)] z-0">
      <BrowserRouter>
        <Navbar />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/trending' element={<Trending />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        </Routes>
        <Footer />
      </BrowserRouter >
    </div>
  )
}

export default App

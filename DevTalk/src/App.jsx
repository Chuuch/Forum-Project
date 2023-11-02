import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Trending from "./components/Trending";
import Login from "./components/Login";
import Register from "./components/Register";
import Search from "./components/Search";
// import { useState } from "react";



function App() {
  // const [count, setCount] = useState(0);

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
        <Route path='/search' element={<Search />}/>
        </Routes>
        <Footer />
      </BrowserRouter >
    </div>
  )
}

export default App

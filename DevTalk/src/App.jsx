import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
// import { useState } from "react";



function App() {
  // const [count, setCount] = useState(0);

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path='/contact' element={<Contact />} />
        </Routes>
        <Footer />
      </BrowserRouter >
    </div>
  )
}

export default App

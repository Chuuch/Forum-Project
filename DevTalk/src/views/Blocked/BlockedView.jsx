import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Home from "../Home/Home";
import About from "../About/About";
import Contact from "../Contact/Contact";
import Footer from "../../components/Footer/Footer";
import BlockedUser from "./Blocked";
import Login from "../Login/Login";

export default function BlockedView(){
    return  (
        <div className="bg-[rgb(36,36,36)] z-0 dark:bg-white">
					<BrowserRouter>
						<Navbar />
						<Routes>
							<Route path="/" element={ <Home /> } />
							<Route path="/about" element={ <About /> } />
							<Route path="/contact" element={ <Contact /> } />
                            <Route path="login" element={ <Login /> } />
							<Route path='*' element={ <BlockedUser /> } />
				</Routes>
						<Footer />
					</BrowserRouter>
				</div>
    )
}
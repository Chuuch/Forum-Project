import { get, ref } from "firebase/database";
import { database } from "../../config/firebase-config";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Home from "../Home/Home";
import About from "../About/About";
import Contact from "../Contact/Contact";
import Trending from "../Trending/Trending";
import Authenticated from "../../hoc/Authenticated";
import Forum from "../Forum/Forum";
import CreatePost from "../CreatePost/CreatePost";
import Login from "../Login/Login";
import Register from "../Register/Register";
import { UserProfile } from "../UserProfile/UserProfile";
import NotFound from "../NotFound/NotFound";
import Csharp from "../Categories/Csharp";
import Java from "../Categories/Java";
import JavaScript from "../Categories/JavaScript";
import Python from "../Categories/Python";
import TypeScript from "../Categories/Typescript";
import C from '../Categories/C';
import Footer from "../../components/Footer/Footer";
import AdminNavbar from "./AdminNavbar";
import Reports from "../Reports/Reports";

// eslint-disable-next-line react/prop-types
export default function AuthenticationViews({ userId }) {
    const [isAdmin, setIsAdmin] = useState(null);
  
    useEffect(() => {
      const checkIfUserIsAdmin = async () => {
        try {
          const usersSnapshot = await get(ref(database, 'users'));
          if (usersSnapshot.exists()) {
            const usersData = usersSnapshot.val();
            if (usersData && usersData[userId].isAdmin === true) {
              setIsAdmin(true);
            } else {
              setIsAdmin(false);
            }
          } else {
            console.log('No data found in the "users" entity.');
          }
        } catch (error) {
          console.error('Error checking if user is an admin:', error.message);
        }
      };
  
      checkIfUserIsAdmin();
    }, [userId]);
  
    return (
      <div>
        {isAdmin === true ? (
          <div>
			<BrowserRouter>
			<AdminNavbar />
			<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/trending" element={<Authenticated><Trending /></Authenticated>} />
					<Route path="/forum" element={<Authenticated><Forum /></Authenticated>} />
					<Route path='/createpost' element={<Authenticated><CreatePost /></Authenticated>} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path='/userprofile' element={<Authenticated><UserProfile /></Authenticated>} />
					<Route path='*' element={<NotFound/>}/>
					<Route path="/c" element={<Authenticated><C /></Authenticated>} />
					<Route path="/csharp" element={<Authenticated><Csharp /></Authenticated>} />
					<Route path="/java" element={<Authenticated><Java /></Authenticated>} />
					<Route path="/javascript" element={<Authenticated><JavaScript /></Authenticated>} />
					<Route path="/python" element={<Authenticated><Python /></Authenticated>} />
					<Route path="/typescript" element={<Authenticated><TypeScript /></Authenticated>} />
					<Route path="/reports" element={<Authenticated><Reports /></Authenticated>} />
			</Routes>
			</BrowserRouter>
		
				</div>
        ) : isAdmin === false ? (
            <div className="bg-[rgb(36,36,36)] z-0 dark:bg-white">
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/trending" element={<Authenticated><Trending /></Authenticated>} />
					<Route path="/forum" element={<Authenticated><Forum /></Authenticated>} />
					<Route path='/createpost' element={<Authenticated><CreatePost /></Authenticated>} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path='/userprofile' element={<Authenticated><UserProfile /></Authenticated>} />
					<Route path='*' element={<NotFound/>}/>
					<Route path="/c" element={<Authenticated><C /></Authenticated>} />
					<Route path="/csharp" element={<Authenticated><Csharp /></Authenticated>} />
					<Route path="/java" element={<Authenticated><Java /></Authenticated>} />
					<Route path="/javascript" element={<Authenticated><JavaScript /></Authenticated>} />
					<Route path="/python" element={<Authenticated><Python /></Authenticated>} />
					<Route path="/typescript" element={<Authenticated><TypeScript /></Authenticated>} />
				</Routes>
				<Footer />
			</BrowserRouter>
		</div>
        ) : (
            <div className="bg-[rgb(36,36,36)] z-0 dark:bg-white">
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/trending" element={<Authenticated><Trending /></Authenticated>} />
					<Route path="/forum" element={<Authenticated><Forum /></Authenticated>} />
					<Route path='/createpost' element={<Authenticated><CreatePost /></Authenticated>} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path='/userprofile' element={<Authenticated><UserProfile /></Authenticated>} />
					<Route path='*' element={<NotFound/>}/>
					<Route path="/c" element={<Authenticated><C /></Authenticated>} />
					<Route path="/csharp" element={<Authenticated><Csharp /></Authenticated>} />
					<Route path="/java" element={<Authenticated><Java /></Authenticated>} />
					<Route path="/javascript" element={<Authenticated><JavaScript /></Authenticated>} />
					<Route path="/python" element={<Authenticated><Python /></Authenticated>} />
					<Route path="/typescript" element={<Authenticated><TypeScript /></Authenticated>} />
				</Routes>
				<Footer />
			</BrowserRouter>
		</div>
        )}
      </div>
    );
  }

    

import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminNavbar from "../AuthenticationView/AdminNavbar";
import Home from "../Home/Home";
import Authenticated from "../../hoc/Authenticated";
import Trending from "../Trending/Trending";
import Forum from "../Forum/Forum";
import DetailsPost from "../DetailsPost/DetailsPost";
import CreatePost from "../CreatePost/CreatePost";
import Login from "../Login/Login";
import Register from "../Register/Register";
import { UserProfile } from "../UserProfile/UserProfile";
import NotFound from "../NotFound/NotFound";
import Csharp from "../Categories/Csharp";
import Java from "../Categories/Java";
import JavaScript from "../Categories/JavaScript";
import TypeScript from "../Categories/Typescript";
import Python from "../Categories/Python";
import Reports from "../Reports/Reports";
import SearchView from "../Search/SearchView";
import About from "../About/About";
import C from '../Categories/C';

export default function AdminView () {
    return (
        <div className="bg-[rgb(36,36,36)] z-0 dark:bg-white">
					<BrowserRouter>
						<AdminNavbar />
						<Routes>
							<Route path="/" element={ <Home /> } />
							<Route path="/trending" element={ <Authenticated><Trending /></Authenticated> } />
							<Route path="/forum" element={ <Authenticated><Forum /></Authenticated> } />
							<Route path="/forum/:postId" element={ <Authenticated><DetailsPost /></Authenticated> } />
							<Route path='/createpost' element={ <Authenticated><CreatePost /></Authenticated> } />
							<Route path="/login" element={ <Login /> } />
							<Route path="/register" element={ <Register /> } />
							<Route path='/userprofile' element={ <Authenticated><UserProfile /></Authenticated> } />
							<Route path='*' element={ <NotFound /> } />
							<Route path="/c" element={ <Authenticated><C /></Authenticated> } />
							<Route path="/csharp" element={ <Authenticated><Csharp /></Authenticated> } />
							<Route path="/java" element={ <Authenticated><Java /></Authenticated> } />
							<Route path="/javascript" element={ <Authenticated><JavaScript /></Authenticated> } />
							<Route path="/python" element={ <Authenticated><Python /></Authenticated> } />
							<Route path="/typescript" element={ <Authenticated><TypeScript /></Authenticated> } />
							<Route path="/reports" element={ <Authenticated><Reports /></Authenticated> } />
							<Route path="search/:query" element={<SearchView/>} />
							<Route path="/about" element={ <About /> } />
			</Routes>
					</BrowserRouter>

				</div>
    )
}
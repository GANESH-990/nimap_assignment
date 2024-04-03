// import logo from './logo.svg';
// import './App.css';


import { Route , BrowserRouter , Routes } from "react-router-dom";



//import components
import Home from "./components/Home";
import TopRated from "./components/TopRated";
import UpcomingMovies from "./components/UpcomingMovies";
import NavigationBar from "./components/NavigationBar";
import DetailedPage from "./components/Detailed.Page";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100 text-fontColor bg-background">

      <BrowserRouter>
      
      <NavBar/>

      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/topRated" element={<TopRated/>}></Route>
        <Route path="/upcomingMovies" element={<UpcomingMovies/>}></Route>
        <Route path="/detailedPage" element={<DetailedPage/>}></Route>
      </Routes>
      
      
      </BrowserRouter>
      
    </div>
  );
}

export default App;

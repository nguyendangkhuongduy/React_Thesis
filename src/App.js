import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Council from "./layout/Council";
import Theses from "./layout/Theses";
import Header from "./layout/Header";
import Login from "./layout/Login";
import Criteria from "./layout/Criteria";
import Navbars from "./layout/Navbars";
import Faculties from "./layout/Faculties";
import Users from "./layout/Users";
import Statistic from "./layout/Statistic";
import ThesesView from "./layout/ThesesView";
import ThesesStudent from "./layout/ThesesStudent";
import Contact from "./layout/Contact";
import CouncilView from "./layout/CouncilView";
import CouncilViewAdmin from "./layout/CouncilViewAdmin";
import ThesesViewAdmin from "./layout/ThesesViewAdmin";
import PrintPDF from "./layout/PrintPDF";
import Score from "./layout/Score";
import Homepage from "./layout/Homepage";
import { useState } from "react";
import { useEffect } from "react";



function App() {
    const [user, setUser] = useState([])
    const [print, setPrint] = useState([])
    const [token, setToken] = useState(()=> localStorage.getItem("token-data"))
    const Logout = () => {
        setToken(null) 
        localStorage.removeItem("token-data")
    }
    const Print = (table) => {
      setPrint(table)
    }
    function isAuthenticated() {
        if (token) {
            // FIXME check the token expiration too
            return true;
        }
        return false;
    }
    let routeContent;
    useEffect(()=> {
       token &&  setUser(JSON.parse(token).data)
       localStorage.removeItem("ccEdit")
        localStorage.removeItem("textxemdiem")
    },[token])
   
    if (isAuthenticated()) {
        routeContent = (
          <Routes>    
            <Route exact path='/home' element={<Homepage/>} />
            {user.roles && user.roles[0] === "ROLE_ADMIN" && (
                <>
                <Route path="/users" element={<Users />} />
            <Route path="/statistic" element={<Statistic />} />
            <Route path="/faculties" element={<Faculties />} />
            <Route path="/score" element={<Score />} />
            <Route path="/theses_admin" element={<ThesesViewAdmin />} />
            <Route path="/council_admin" element={<CouncilViewAdmin />} />

                </>
            )}
            {user.roles && user.roles[0] === "ROLE_MANAGER" && (
                <>
            <Route path="/criteria" element={<Criteria />} />
            <Route path="/theses" element={<Theses />} />
            <Route path="/council" element={<Council userNOW = {user} />} />
            <Route path="/statistic" element={<Statistic />} />
            <Route path="/contact" element={<Contact userNOW = {user} />} />

                </>
            )}
            {user.roles && user.roles[0] === "ROLE_ASSOCIATE" && (
                <>
           <Route path="/quanly/theses" element={<ThesesView userNOW = {user}  Print={Print} />} />
            <Route path="/quanly/council" element={<CouncilView userNOW = {user} Print={Print} />} />
            <Route path="/printPDF" element={<PrintPDF Data = {print} />} />
            <Route path="/contact" element={<Contact userNOW = {user} />} />
                </>
            )}
            {user.roles && user.roles[0] === "ROLE_STUDENT" && (
                <>
           <Route path="/student/theses" element={<ThesesStudent userNOW = {user} />} />
           <Route path="/contact" element={<Contact userNOW = {user} />} />
            
                </>
            )}
            <Route exact path='*' element={<Homepage rolez = {user.roles && user.roles[0]}/>} />
            
          </Routes>
        )
      } else {
        routeContent = (
          <Login/>
       )
      }

    // return (
    //     <BrowserRouter>
    //         <Header />
    //         {isAuthenticated() ? <Navbars /> : ""}
    //         <Routes>
    //             <Route path="/users" element={<Users />} />
    //             <Route path="/statistic" element={<Statistic />} />
    //             <Route path="/theses" element={<Theses />} />
    //             <Route path="/faculties" element={<Faculties />} />
    //             <Route path="/council" element={<Council />} />
    //             <Route path="/criteria" element={<Criteria />} />
    //             <Route path="/score" element={<Score />} />
    //             <Route path="/quanly/theses" element={<ThesesView />} />
    //             <Route path="/quanly/council" element={<CouncilView />} />
    //         </Routes>
    //     </BrowserRouter>
    // );

    return (
        <BrowserRouter>     
         {isAuthenticated() && <Header userNOW = {user} logOut={Logout} />}
          <div className="container-fluid p-0">
            <div className="row">
              <div className="col-2">
              {isAuthenticated() ? <Navbars role={user.roles}/> : ''}
              </div>  
              <div className="col-10">
                  {routeContent}
              </div>
            </div>
          </div> 
        </BrowserRouter>
      )
}

export default App;

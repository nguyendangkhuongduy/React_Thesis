import { Link, NavLink } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { useState } from "react";
import { SidebarData } from "./SlideBarData";
import "../scss/ComponentsStyle/Navbar.scss";
import { IconContext } from "react-icons";

const Navbars = ( {role}) => {
    let NavUI = []
   if(role && role[0]) {
    console.log(SidebarData[0].role);
    NavUI = SidebarData.filter((s)=> s.role.indexOf(role[0]) !== -1  || s.roleGV === role[0])
    console.log(NavUI);
   } else {
    console.log("LOI");
   }
    return (
        <>
            <IconContext.Provider value={{ color: "#fff" }}>
                <div>
                    <nav className={"nav-menu active"}>
                        <ul className="nav-menu-items">
                            {NavUI.map((item, index) => {
                                return (
                                    <li key={index} className={item.cName}>
                                        <NavLink
                                        exact 
                                        to={item.path}
                                            className={({ isActive }) =>
                                                isActive ? "active" : false
                                            }
                                        >
                                            <i>{item.icon}</i>
                                            <span>{item.title}</span>
                                        </NavLink>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </div>
            </IconContext.Provider>
        </>
    );
};

export default Navbars;

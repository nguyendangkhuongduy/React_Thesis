import { Link, NavLink } from "react-router-dom";
import "../scss/ComponentsStyle/Users.scss";
import React, { memo } from "react";
const Users = ({Data}) => {
   setTimeout(() => {
    console.log("goi");
    const p = document.querySelector(".print_wrapper")
    console.log(p);
    console.log(Data);
    if(Data) {
    p.innerHTML = ""
    p.appendChild(Data) 
    }
    setTimeout(() => {
    window.print()
    setTimeout(() => {
       const b = document.querySelector(".backNAV")
       b.click()
        }, 0);
    }, 0);
   }, 0);
   
    return (
        <>
            <div className="print_wrapper">
            </div>
            <Link to="/quanly/council" className="backNAV"></Link>
           
        </>
    );
};

export default React.memo(Users);

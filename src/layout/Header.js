import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Navbars from "./Navbars";
import "../scss/ComponentsStyle/Header.scss";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import $ from "jquery";
const Header = ({userNOW = "", logOut}) => {
const [avatar, setAvatar] = useState("")
const [changeAVT, setChangeAVT] = useState(false)
const [change, setChange] = useState(false)
const [user, setUser] = useState([])
useEffect(()=>{
    (async () => {
        const data = await axios.get(
          "http://localhost:8080/users"
        );
        setUser(data.data.users.filter((u)=> u.id === JSON.parse(localStorage.getItem("token-data")).data.id));
        console.log(data.data.users.filter((u)=> u.id === JSON.parse(localStorage.getItem("token-data")).data.id));
      })()
   },[])
   useEffect(()=> {
    if(user[0]) {
        setAvatar(user[0].avatar)
    }
   },[user])
    const Out = () => {
        logOut()
    }
    const handleInfo = () => {
        // const getData = async () => {
        //    try {
        //     const data = await axios.get(
        //         `https://sheet.best/api/sheets/af34d61a-4b53-40fa-9cc1-2dbd1a423b72`
        //       );
        //       const link = data.data[2].avatar.replace("https://drive.google.com/open?id=","https://drive.google.com/uc?export=view&id=")
        //                setAvatar(link)
        //    } catch {
        //     console.log("AAAAAAAAAÂs");
        //     setAvatar("https://i.ibb.co/pZhrzbn/Anh-Avatar-dai-dien-mac-dinh-nam-nen-xam.jpg")
        //    }
        // }
        //  getData();
        const info = document.querySelector(".info_modal");
        info.classList.add("active");
    };
    const handleChange = () => {
        const change = document.querySelector(".change_password_modal");
        change.classList.add("active");
    };
    const handleCancle = () => {
        const info = document.querySelector(".info_modal");
        const change = document.querySelector(".change_password_modal");
        info.classList.remove("active");
        change.classList.remove("active");

    };
    const changePass = () => {
        const ips = document.querySelectorAll(".change_password_modal input")
        console.log(ips);
        const pass = localStorage.getItem("LocalData")
        if(ips[0].value !== pass) {
            alert("Mật khẩu cũ không chính xác")
            return
        }
        if(ips[0].value === pass && ips[1].value === ips[2].value) {
            const getData = async () => {
                 await axios.put(
                  `http://localhost:8080/users/${userNOW.id}/actions/change-password`, {"newPassword": ips[2].value}
                );
              };
              getData();
              Out()
        } else {
            alert("Mật khẩu mới và xác nhận không trùng khớp")
        }
    }
    const handleUpload = () => {
        const i = document.querySelector(".up_avt")
        i.click()
    }
    useEffect(()=>{
        if(avatar) {
            const getData = async () => {
                await axios.put(
                 `http://localhost:8080/users/action/putAvt/${userNOW.id}`, {
                   "avt": avatar
                 }
               );
             };
             getData();
        }
        //  https://script.google.com/home/projects/15MlKU4ZkPgy80Ic7kjLRsL2szeLSnrDBBUgLWQJYUmtAz9kV1TvtqLCv/edit
    },[change])
    const handleUploadChange = (e) => {
        const avt = document.querySelector("avatar")
        setChangeAVT("https://i.ibb.co/87qQD1M/Spinner-1s-200px.gif")
        var file = e.target.files[0] //the file
        var reader = new FileReader() //this for convert to Base64 
        e.target.files[0].dell = avatar
        reader.readAsDataURL(e.target.files[0]) //start conversion...
        reader.onload = function (e) { //.. once finished..
          var rawLog = reader.result.split(',')[1]; //extract only thee file data part
          var dataSend = { dataReq: { data: rawLog, name: avatar || file.name, type: file.type}, fname: "uploadFilesToGoogleDrive" }; //preapre info to send to API
          fetch('https://script.google.com/macros/s/AKfycbwBX-1dm0asCO9kZQG7sUyxDUz8e-DsK6YdkwrsLbzBtMivLCGYNuq2hf64gLZOiT_6/exec', //your AppsScript URL
            { method: "POST", body: JSON.stringify(dataSend) }) //send to Api
            .then(res => res.json()).then((a) => {
              console.log(a) //See response
              setAvatar(a.id)
             if(a.id) {
                setChange(!change)
                setChangeAVT(false)
             }
            }).catch(e => console.log(e)) // Or Error in console
        }
        
    }
    return (
        <>
            <div className="header_wrapper">
                <div className="header_wrapper">
                    <div className="header_wrapper-left">
                        <img  src="https://lms.ou.edu.vn/assets/images/logo.png" />
                    </div>
                    {/* <div>Đăng nhập</div> */}
                    <div className="header_name">
                        {" "}
                        <div className="name">
                           {userNOW.fullName}
                            <div>
                                <div onClick={handleInfo}>Thông tin</div>
                                <div onClick={handleChange}>Đổi mật khẩu</div>
                            </div>
                        </div>
                        <div className="header_wrapper-right" onClick={Out}>
                            Đăng xuất{" "}
                            <i>
                                <FontAwesomeIcon icon={faPowerOff} />
                            </i>
                        </div>
                    </div>
                </div>
            </div>
           {userNOW && ( <div className="info_modal">
                <h5>THÔNG TIN NGƯỜI DÙNG</h5>
               <div>
               <div className="info_inner">
                <p>
                    Tên: <span>{userNOW.fullName}</span>
                </p>
                
                <p>
                    Email: <span>{userNOW.email}</span>
                </p>
                <p>
                    Số điện thoại: <span>{userNOW.phone}</span>
                </p>
                <div>
                    <p>
                        {" "}
                        Giới tính: <span>{userNOW.gender == 0 && "Nam" || "Nữ"}</span>{" "}
                    </p>
                    {userNOW.roles && userNOW.roles.length > 0 && (<p>
                        Vai trò: <span>{userNOW.roles[0] === "ROLE_ADMIN" && "Admin" || userNOW.roles[0] === "ROLE_MANAGER" && "Giáo vụ" || userNOW.roles[0] === "ROLE_STUDENT" && "Sinh viên"|| userNOW.roles[0] === "ROLE_ASSOCIATE" && "Giảng viên" }</span>
                    </p>)}
                </div>
                
                </div>
                <div className="ava_inner">
            <img className="avatar" src={changeAVT || `https://drive.google.com/uc?export=view&id=${avatar}` || "https://i.ibb.co/pZhrzbn/Anh-Avatar-dai-dien-mac-dinh-nam-nen-xam.jpg"}/>
            <p className="click_up_avt" onClick={handleUpload}></p>
            <input type="file" className="up_avt" accept="image/png, image/jpeg, image/jpg" onChange={handleUploadChange}/>
                </div>
               </div>
                {/* <p>
                    Khoa: <span>{userNOW.faculty}</span>
                </p> */}
                <button onClick={handleCancle}>Thoát</button>
            </div>)}
            <div className="change_password_modal">
                <h5>ĐỔI MẬT KHẨU</h5>
                <input type="password" placeholder="Mật khẩu cũ" />
                <input type="password" placeholder="Mật khẩu mới" />
                <input type="password" placeholder="Xác nhận lại" />
                <div className="box_btn">
                    <button onClick={handleCancle}>Hủy</button>
                    <button onClick={changePass}>Xác nhận</button>
                </div>
            </div>
        </>
    );
};

export default React.memo(Header);

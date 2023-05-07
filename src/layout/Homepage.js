import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {
    faCirclePlus,
    faCircleXmark,
    faPenToSquare,
    faSearch,
    faSquare,
    faCircleInfo,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../scss/ComponentsStyle/Users.scss";
import { useEffect, useState } from "react";
import { useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Homepage = () => {
   const rolez = JSON.parse(localStorage.getItem("token-data")).data.roles[0]
   console.log(rolez);
    const [render, setRender] = useState(false);
    const [ts, setTs] = useState(false);
    const [cc, setCc] = useState(false);
    const [users,setUsers] = useState([])
    const [fac,setFac] = useState([])
    const [tsadmin,setTsAdmin] = useState([])
    const [ccadmin,setCcAdmin] = useState([])
    const [tc,setTc] = useState([])
    const [cx,setCx] = useState([])
    const [kl,setKl] = useState([])
    const [kln,setKln] = useState([])
    const [hd,setHd] = useState([])
    const [facNow,setFacNow] = useState([])
    // get Data
    useEffect(()=>{
     const getData = async () => {
            const data = await axios.get(
              "http://localhost:8080/users"
            );
            setUsers(data.data.users);
            const datas = await axios.get(
                "http://localhost:8080/faculty"            );
             setFac(datas.data.faculties);
             
           setFacNow(datas.data.faculties.filter((item)=> item.id === JSON.parse(localStorage.getItem("token-data")).data.facultyId))
             const datass = await axios.get(
                "http://localhost:8080/thesis"
              );
              setTsAdmin(datass.data.theses)
              const datasss = await axios.get(
                "http://localhost:8080/council"
              );
              setCcAdmin(datasss.data.councils)
              console.log(datasss.data.councils);
              const datastc = await axios.get(
                "http://localhost:8080/criteria"            );
                setTc(datastc.data.criteria);
                const datac = await axios.get(
                    `http://localhost:8080/council/action/getByUserId/${JSON.parse(localStorage.getItem("token-data")).data.id}`            );
                    setCx(datac.data.councils);
                    const b = datac.data.councils.filter((item)=> item.active === true)
                    setHd(b)
                    const datakl = await axios.get(
                        `http://localhost:8080/thesis/thesisByUserId/${JSON.parse(localStorage.getItem("token-data")).data.id}`);
                        setKl(datakl.data.theses);
                       const a =  datakl.data.theses.filter((item,index)=> {
                        return item.topic === null
                       })
                       setKln(a.length);
                      
          };
          getData();
    },[])
const loadRef = useRef()
const fameRef = useRef()
fameRef.onload = () => {
    console.log(123);
}
    useEffect(() => {
        const giangvien = document.querySelectorAll(".so_giangvien li");
        const giangvienBtn = document.querySelector(".giangvien_addbtn");
        giangvien.length === 2
            ? (giangvienBtn.style = "display:none") && setRender(true)
            : console.log(123);
    }, []);
    const handleAdd = () => {
        const addModal = document.querySelector(".add_users_modal");
        addModal.classList.add("active");
    };
    const handleDelete = () => {
        const deleteModal = document.querySelector(".delete_users_modal");
        deleteModal.classList.add("active");
    };
    const handleEdit = () => {
        const eidtModal = document.querySelector(".edit_users_modal");
        eidtModal.classList.add("active");
    };
    const handleCancle = () => {
        const addModal = document.querySelector(".add_users_modal");
        const deleteModal = document.querySelector(".delete_users_modal");
        const eidtModal = document.querySelector(".edit_users_modal");

        addModal.classList.remove("active");
        eidtModal.classList.remove("active");
        deleteModal.classList.remove("active");
    };
    const handleBack = () => {
        const listSV = document.querySelector(".list_sinhvien");
        listSV.classList.remove("active");
        const listGV = document.querySelector(".list_giangvien");
        listGV.classList.remove("active");
    };
    const handleAddSinhvien = () => {
        const listSV = document.querySelector(".list_sinhvien");
        listSV.classList.add("active");
    };
    const handleAddGiangvien = () => {
        const listSV = document.querySelector(".list_giangvien");
        listSV.classList.add("active");
    };
    useEffect(() => {
        const getData = async () => {
            const data = await axios.get(
                    `http://localhost:8080/thesis/thesisByUserId/${JSON.parse(localStorage.getItem("token-data")).data.id}`);
                    setTs(data.data.theses);
            const datas = await axios.get(
                    `http://localhost:8080/council/action/getByUserId/${JSON.parse(localStorage.getItem("token-data")).data.id}`);
                    setCc(datas.data.councils);
          };
          getData();
    },[])
    return (
        <>
            <div className="users_wrapper">
            {rolez === "ROLE_ADMIN" && <> <div>
            <h1>THÔNG BÁO</h1>
            <div className="admin_home">
                <Link to={"/users"}><span>Sinh viên</span><span>{(users.filter((user)=> user.roles[0] == "ROLE_STUDENT")).length}</span></Link>
                <Link to={"/users"}><span>Giảng viên</span><span>{(users.filter((user)=> user.roles[0] == "ROLE_ASSOCIATE")).length}</span></Link>
                <Link to={"/users"}><span>Giáo vụ</span><span>{(users.filter((user)=> user.roles[0] == "ROLE_MANAGER")).length}</span></Link>
                <Link to={"/faculties"}><span>Khoa</span><span> {fac.length}</span></Link>
                <Link to={"/theses_admin"}><span>Khoá Luận</span><span> {tsadmin.length}</span></Link>
                <Link to={"/council_admin"}><span>Hội đồng</span><span>{ccadmin.length}</span></Link>
            </div>
              </div></>}
         {rolez === "ROLE_MANAGER" && <> <div>
            <h1>THÔNG BÁO</h1>
            <div className="admin_home">
            <Link to={"/criteria"}><span>Tiêu chí</span><span> {tc.length}</span></Link>
            <Link to={"/theses"}><span>Khoá Luận</span><span> {tsadmin.length}</span></Link>
            <Link to={"/council"}><span>Hội đồng</span><span>{(ccadmin.filter((item)=> item.faculty == facNow[0].name)).length}</span></Link>
            </div>
          </div></>}
         {rolez === "ROLE_ASSOCIATE" && <> <div>
            <h1>THÔNG BÁO</h1>
            <div className="admin_home">
                <Link to={"/"}><span>{hd.length > 0 && `${hd.length} Hội đồng đang mở`}<br/>{kln > 0 && `${kln} Khoá luận chưa có TOPIC` || `Không có thông báo` }</span><span> </span></Link>
                <Link to={"/quanly/theses"}><span>Khoá Luận</span><span> {kl.length}</span></Link>
                <Link to={"/quanly/councilil"}><span>Hội đồng</span><span>{cx.length}</span></Link>
            </div>
          </div></>}
          {rolez === "ROLE_STUDENT" && <div>aaaaaaaaaaaâ</div>}
              </div>
        </>
    );
};

export default Homepage;

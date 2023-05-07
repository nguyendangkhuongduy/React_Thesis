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
    faFileArrowUp,
    faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../scss/ComponentsStyle/Users.scss";
import { useEffect, useState } from "react";
import axios from "axios";
const Users = ({userNOW}) => {
    const [render, setRender] = useState(false);
    const [UI, setUI] = useState(false);
    const [newUI, setNewUI] = useState(false);
    const [change, setChange] = useState(false);
    const [gv, setGV] = useState([]);
    const [sv, setSV] = useState([]);
    const [tsID, setTsID] = useState([]);
    const [ind, setInd] = useState([]);
    const [file, setFile] = useState([]);
    const [tsNOW, setTsNow] = useState([]);
    const [same, setSame] = useState(false);
    // const [gvUI, setGVUI] = useState(false);
    // const [sv, setSV] = useState(false);
    const [users, setUsers] = useState(false);
    useEffect(() => {
        setNewUI(UI)
    }, [UI])
    useEffect(() => {
        const getData = async () => {
            const data = await axios.get(
                    `http://localhost:8080/thesis/thesisByUserId/${userNOW.id}`);
                    setUI(data.data.theses);
            const datsa = await axios.get(
                        "http://localhost:8080/users"
                      );
                      setUsers(datsa.data.users);
          };
          getData();
        localStorage.removeItem("ccEdit")
        localStorage.removeItem("textxemdiem")
        const giangvien = document.querySelectorAll(".so_giangvien li");
        const giangvienBtn = document.querySelector(".giangvien_addbtn");
        giangvien.length === 2
            ? (giangvienBtn.style = "display:none") && setRender(true)
            : console.log(123);

    }, []);
    useEffect(()=>{
        

       },[gv,sv])
    const handleEdit = (u) => {
      setTsNow(u)
        const getData = async () => {
            const data = await axios.get(
                    `http://localhost:8080/thesisPosition/Action/getByUser/${u.id}`);
                  const listGV = data.data.thesisPosition.filter((u)=> u.name === "Giang Vien")
                  const listSV = data.data.thesisPosition.filter((u)=> u.name === "Sinh vien")
                  let GVID = []
                  let SVID = []
                  listGV.forEach((x)=> GVID = [...GVID,x.userId]);
                  listSV.forEach((x)=> SVID = [...SVID,x.userId]);
                  setGV(users.filter((u)=> GVID.indexOf(u.id) !== -1));
                  setSV(users.filter((u)=> SVID.indexOf(u.id) !== -1))
                  console.log(users.filter((u)=> GVID.indexOf(u.id) !== -1));
          };
          getData();
        const eidtModal = document.querySelector(".edit_users_modal");
         document.querySelector(".tenkl").innerText = u.name;
         document.querySelector(".fackl").innerText = u.faculty;
         document.querySelector(".cckl").innerText = u.council;
        eidtModal.classList.add("active");

    };
    const handleCancle = () => {
        const eidtModal = document.querySelector(".edit_users_modal");

        eidtModal.classList.remove("active");
        const i = document.querySelector(".hoi_modal")
        i.classList.remove("active")
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
    const handleNop = (u,index) => {
        const i = document.querySelector(".up_file")
        setTsID(u.id)
        setFile(u.file)
        if(index) {
        setInd(index)
        }
            i.click()
        if(tsNOW.id === tsID) {
            setSame(true)
        } else {
            setSame(false)
        }
            
    }
    const handleHoi = (u,index) => {
        setInd(index)
        setTsNow(u)
        setTsID(u.id)
        
        const i = document.querySelector(".hoi_modal")
        i.classList.add("active")
        if(u.id === tsID) {
            setSame(true)
            setFile(u.file)
        } else {
            setTsID(u.id)
            setSame(false)
        }
    }
    useEffect(()=>{
        const getData = async () => {
            console.log(tsID);
            await axios.put(
             `http://localhost:8080/thesis/action/putFile/${tsID}`, {
               "file": file
             }
           );
        //    console.log(avatar,"aaaaaaaâs");
         };
         getData();
    },[change])
    const handleUploadChange = (e) => {
        handleCancle()
        var filex = e.target.files[0] //the file
        const dang = document.querySelectorAll(".dangnopbai")
        const nop = document.querySelector(".dangnopbaii")
        dang[0] && (dang[0].innerHTML = "Đang nộp...")
        var reader = new FileReader() //this for convert to Base64 
        reader.readAsDataURL(e.target.files[0]) //start conversion...
        reader.onload = function (e) { //.. once finished..
          var rawLog = reader.result.split(',')[1]; //extract only thee file data part
          var dataSend = { dataReq: { data: rawLog, name: tsNOW.file && file || filex.name, type: filex.type }, fname: "uploadFilesToGoogleDrive" }; //preapre info to send to API
          fetch('https://script.google.com/macros/s/AKfycbwBX-1dm0asCO9kZQG7sUyxDUz8e-DsK6YdkwrsLbzBtMivLCGYNuq2hf64gLZOiT_6/exec', //your AppsScript URL
            { method: "POST", body: JSON.stringify(dataSend) }) //send to Api
            .then(res => res.json()).then((a) => {
             console.log(a);
             setFile(a.id)
            dang[0] && (dang[0].innerHTML = "Xem bài / Nộp lại")
            nop && (nop.innerHTML = "Nộp lại")
              setChange(!change)
              const getData = async () => {
                const data = await axios.get(
                        `http://localhost:8080/thesis/thesisByUserId/${userNOW.id}`);
                        setUI(data.data.theses);
                        setUI(data.data.theses);
              };
              getData();
            }).catch(e => console.log(e)) // Or Error in console
        }
    }
    return (
        <>
            <div className="users_wrapper">
                <h1>QUẢN LÝ KHÓA LUẬN</h1>
                <table className="theses_table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Ngày tạo</th>
                            <th>Hạn đóng</th>
                            <th>Tên khóa luận</th>
                            <th>Khoa</th>
                            <th>Hội đồng</th>
                            <th>Bài nộp</th>
                            <th>Tổng điểm</th>
                            <th>
                                <button></button>
                            </th>
                        </tr>{" "}
                    </thead>{" "}
                    <tbody>
                        {newUI && newUI.map((u, index)=> {
                             const dateString = u.createdDate;
                             const date = new Date(dateString);
                             date.setDate(date.getDate() + 70);
                          return (  <tr key={u.id}>
                            <th>{u.id}</th>
                            <th>{([...u.createdDate].splice(8,2) +"/" + [...u.createdDate].splice(5,2) +"/"+[...u.createdDate].splice(0,4)).replaceAll(",","")}</th>
                            <th>{([...date.toISOString()].splice(8,2) +"/" + [...date.toISOString()].splice(5,2) +"/"+[...date.toISOString()].splice(0,4)).replaceAll(",","")}</th>
                            <th>{u.name}</th>
                            <th>{u.faculty}</th>
                            <th>{u.council || "Chưa có"}</th>
                            <th>{u.file && u.topic && u.totalScore === 0 &&  (<button onClick={()=>handleHoi(u,index)} >
                                    {" "}
                                    <span className="dangnopbai  show">Xem bài / Nộp lại</span>
                                    <i className="nopbai check">
                                       <FontAwesomeIcon icon={faCircleCheck} />
                                    </i>
                                </button>)}
                                {u.file && u.topic &&  u.totalScore != 0 &&  (<button >
                                    {" "}
                                    <span className="dangnopbai  show"><a href={`https://drive.google.com/file/d/${tsNOW.file}`} target="_blank">Xem bài</a></span>
                                    <i className="nopbai check">
                                       <FontAwesomeIcon icon={faCircleCheck} />
                                    </i>
                                </button>)}
                                {!u.topic &&  (<span >
                                   Chưa có đề tài
                                </span>)}
                               
                            {!u.file && u.topic && (<button onClick={()=>{
                                const currentDate = new Date().toISOString();
                                const date1 = new Date(u.createdDate);
                                const date2 = new Date(currentDate);
                                const diffTime = Math.abs(date2 - date1 - 1);
                                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
                                if(diffDays > 70) {
                                    alert("Đã quá hạn nộp bài")
                                } else {
                                    handleNop(u, index)
                                }
                               }} >
                                    {" "}
                                    <span className="dangnopbai dangnopbaii ">Nộp bài</span>
                                    <i className="nopbai">
                                       <FontAwesomeIcon icon={faFileArrowUp} />
                                    </i>
                                </button>)}
                                
                                <input type="file" className="up_file" accept="application/pdf" onChange={handleUploadChange}/>
                                </th>
                            <th>{u.totalScore || "Chưa chấm"}</th>
                            <th>
                                <button>
                                    {" "}
                                    <i onClick={()=>handleEdit(u)}>
                                        <FontAwesomeIcon icon={faCircleInfo} />
                                    </i>
                                </button>
                            </th>
                        </tr>)
})}
                        
                    </tbody>{" "}
                </table>
                <div className="delete_users_modal">
                    <div className="delete_users_box">
                        <p> Xóa người dùng </p>
                        <div>
                            <button onClick={handleCancle}>Không xóa</button>
                            <button> Xóa</button>
                        </div>
                    </div>
                </div>
                <div className="delete_users_modal hoi_modal">
                    <div className="delete_users_box">
                        <p>Bạn hoặc người trong khóa luận đã nộp bài <span onClick={handleCancle}>X</span></p> 
                        <div>
                            <button onClick={()=>handleNop(tsNOW)}>Nộp lại</button>
                            <button><a href={`https://drive.google.com/file/d/${tsNOW.file}`} target="_blank">Xem bài</a></button>
                        </div>
                    </div>
                </div>
                <div className="add_users_modal">
                    <form>
                        <h5>Thêm khóa luận</h5>
                        <input
                            required
                            placeholder="Tên khóa luận"
                            id="thesis_name"
                        />
                        <div>
                            <select required id="khoa">
                                <option value="" disabled selected hidden>
                                    Khoa
                                </option>
                                <option value="giaovu">
                                    Công nghệ thông tin
                                </option>
                                <option value="giangvien">Giảng viên</option>
                                <option value="sinhvien">Sinh viên</option>
                            </select>
                        </div>
                        <div>
                            <p onClick={handleCancle} className="cancleadd">
                                Hủy thêm
                            </p>
                            <button type="submit">Xác nhận thêm</button>
                        </div>
                    </form>
                </div>
                <div className="edit_users_modal thesis_info">
                    <form>
                        <h5>THÔNG TIN KHÓA LUẬN</h5>
                        <p>
                            Tên khóa luận:{" "}
                            <span className="tenkl">
                                {" "}
                              {tsNOW.name}
                            </span>
                        </p>
                        <p>
                            Khoa: <span className="fackl">{tsNOW.faculty}</span>
                        </p>
                        <p>
                            Đề tài: <span className="">{tsNOW.topic}</span>
                        </p>
                        <p>
                            Hội đồng: <span className="cckl">{tsNOW.council}</span>
                        </p>
                        <p>
                            Giảng viên{" "}
                        </p>
                        <ol className="so_giangvien flex">
                            {gv.map((g)=> ( <li key={g.id}>
                                {`${g.fullName} | ${g.email}`} <span>{g.id === userNOW.id && "Tôi"}</span>
                            </li>))}
                        </ol>
                        <p>
                            Sinh viên{" "}
                        </p>{" "}
                        <ol className="so_sinhvien flex">
                        {sv.map((g)=> ( <li key={g.id}>
                                {g.fullName}{" "}  <span>{g.id === userNOW.id && "Tôi"}</span>
                            </li>))}
                        </ol>
                        <div className="out_box">
                            <p onClick={handleCancle} className="cancleadd out">
                                Thoát
                            </p>
                        </div>
                    </form>
                    <div className="list_sinhvien">
                        <h5>Danh sách sinh viên</h5>
                        <div className="list_sinhvien-item">
                            <div>
                                <label>
                                    {" "}
                                    Huỳnh Trọng Phúc
                                    <input
                                        type="radio"
                                        name="sinhvien_selected"
                                    />
                                </label>{" "}
                            </div>
                        </div>
                        <div className="list_sinhvien_btnbox">
                            <button onClick={handleBack}>Quay lại</button>
                            <button>Thêm</button>
                        </div>
                    </div>
                    <div className="list_giangvien">
                        <h5>Danh sách giảng viên</h5>
                        <div className="list_sinhvien-item">
                            <div>
                                <label>
                                    {" "}
                                    Huỳnh Trọng Phúc
                                    <input
                                        type="radio"
                                        name="sinhvien_selected"
                                    />
                                </label>{" "}
                            </div>
                        </div>
                        <div className="list_sinhvien_btnbox">
                            <button onClick={handleBack}>Quay lại</button>
                            <button>Thêm</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Users;

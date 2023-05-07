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
    faV,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../scss/ComponentsStyle/Users.scss";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
const Users = () => {
    let gvName = []
    let svName = []
    const danhsachGV = document.querySelector(".list_giangvien") 
  
       // ___________________________STATE______________________
       const [these,setThese] = useState([])
       const [theseUI,setTheseUI] = useState([])
       const [detail,setDetail] = useState([])
       const [gv,setGv] = useState([])
       const [gvtrung,setGvtrung] = useState([])
       const [sv,setSv] = useState([])
       const [fac,setFac] = useState([])
       const [list,setList] = useState([])
       const [users,setUsers] = useState([])
       const [thesisUsers,setThesisUsers] = useState([])
        const [thesisChoose,setThesisChoose] = useState(0)
       const [svNotAdd, setSvNotAdd] = useState([])
       const [svNotAddNEW, setSvNotAddNEW] = useState([])
       const [gvNotAddNEW, setGvNotAddNEW] = useState([])
       const [gvNotAdd, setGvNotAdd] = useState([])
       const [idAddGV, setIdAddGV] = useState("")
       const [idAddSV, setIdAddSV] = useState("")
       const [allSVIN, setAllSVIN] = useState("")

       const [idDelSV, setIdDelSV] = useState("")
       const [idDelGV, setIdDelGV] = useState("")
       const [s, setS] = useState([])
       const [scorecheck, setScorecheck] = useState([])
    //    Get Khoa
    useEffect(()=>{
        const getData = async () => {
               const data = await axios.get(
                       "http://localhost:8080/faculty"            );
              setFac(data.data.faculties);
               const dasta = await axios.get(
                       "http://localhost:8080/thesisPosition"            );
              setAllSVIN(dasta.data.thesisPosition);
               const dastas = await axios.get(
                       "http://localhost:8080/score"      );
                       setS(dastas.data.score);
             };
             getData();
       },[])
    useEffect(()=>{
        setScorecheck(s.filter((s)=> s.thesisId === detail.id))
       },[detail])
    useEffect(()=>{
        let IDs = []
        allSVIN && allSVIN.forEach((sv)=> IDs = [...IDs,sv.userId])
        const cfac = svNotAdd.filter((a)=> IDs.indexOf(a.id) === -1)
        setSvNotAddNEW( cfac.filter((f)=> f.faculty === detail.faculty));
       },[svNotAdd])
    useEffect(()=>{
        let IDs = []
        gv && gv.forEach((sv)=> IDs = [...IDs,sv.userId])
        const cfac = gvNotAdd.filter((a)=> IDs.indexOf(a.id) === -1)
        setGvNotAddNEW(cfac.filter((f)=> f.faculty === detail.faculty));
       },[gvNotAdd])

    useEffect(() => {
        const giangvien = document.querySelectorAll(".so_giangvien li");
        const giangvienBtn = document.querySelector(".giangvien_addbtn");
            if(giangvien.length === 2) {
                const listGV = document.querySelector(".list_giangvien");
                listGV.classList.remove("active");
                giangvienBtn.style = "display:none"
            } else {
                giangvienBtn.style = "display:inline-block"
            }
    });
    const handleAdd = () => {
        const addModal = document.querySelector(".add_users_modal");
        addModal.classList.add("active");
        const ipName = document.querySelector("#thesis_name")
        ipName.value = ""
    };
    const handleDelete = (thesis) => {
        const deleteModal = document.querySelector(".delete_users_modal");
        deleteModal.classList.add("active");
        const p = document.querySelector(".delete_users_box p")
        p.innerHTML = `Xóa khóa luận ${thesis.name}`
        setThesisChoose(thesis)

    };
    const handleEdit = (thesis) => {
        console.log(thesis);
                const eidtModal = document.querySelector(".edit_users_modal");
        eidtModal.classList.add("active");
        setDetail(thesis)
        const getData = async () => {
            const datas = await axios.get(
                  "http://localhost:8080/users"
                );
            const data = await axios.get(
              `http://localhost:8080/thesisPosition/Action/getByUser/${thesis.id}`
            );

            setList(data.data.thesisPosition)
            setUsers(datas.data.users);
          };
          getData();
    };
    const handleCancle = () => {
        const addModal = document.querySelector(".add_users_modal");
        const deleteModal = document.querySelector(".delete_users_modal");
        const eidtModal = document.querySelector(".edit_users_modal");
        document.querySelector(".addtopic").classList.remove("active")

        addModal.classList.remove("active");
        eidtModal.classList.remove("active");
        deleteModal.classList.remove("active");
        handleBack()
    };
    const handleBack = (a) => {
        const listSV = document.querySelector(".list_sinhvien");
        listSV.classList.remove("active");
        const listGV = document.querySelector(".list_giangvien");
        listGV.classList.remove("active");
        const thesisForm = document.querySelector(".thesis_info form");
        thesisForm.style = "left: 50%"
    };
    const renderRef = useRef()
    const renderRefGV = useRef()
    const handleAddSinhvien = () => {
        const listSV = document.querySelector(".list_sinhvien");
        listSV.classList.add("active");;
        const listGV = document.querySelector(".list_giangvien");
        listGV.classList.remove("active");
        const thesisForm = document.querySelector(".thesis_info form");
          
  thesisForm.style = "left: 35% !important"
        const getData = async () => {
            const data = await axios.get(
              "http://localhost:8080/users/actions/getStudents"
             
            );
            setSv(data.data.users)
    };
          getData();
         
    };
    useEffect(()=>{
        let as = []
        svName.forEach((svi)=>{
         return  as = [...as,svi.id]
        })
    const x = sv.filter((svi)=> as.indexOf(svi.id) === -1)
    setSvNotAdd(x) 
    },[sv])
    useEffect(()=>{
        const getData = async () => {
            const data = await axios.get(
              "http://localhost:8080/users/actions/getAssociate"
             
            );
            setGv(data.data.users)
             const dasta = await axios.get(
                "http://localhost:8080/thesisPosition"            );
       setAllSVIN(dasta.data.thesisPosition);  
       let chuatrung = [] 
       let trung = [] 
       dasta.data.thesisPosition.map((item, index)=> {
        if(chuatrung.indexOf(item.userId) == -1) {
            chuatrung = [...chuatrung, item.userId]
        } else {
             trung = [...trung,item.userId]
        }
      
       })
       setGvtrung(trung)
};
          getData();
        let as = []
        gvName.forEach((gvi)=>{
         return  as = [...as,gvi.id]
        })
    const x = gv.filter((gvi)=> as.indexOf(gvi.id) === -1)
    const gvkoTrung = x.filter((gv)=> gvtrung.indexOf(gv.id) === -1)
    console.log(gvtrung);
    setGvNotAdd(gvkoTrung) 
   
    },[detail])
    const handleAddGiangvien = () => {
        const listGV = document.querySelector(".list_giangvien");
        listGV.classList.add("active");
        const listSV = document.querySelector(".list_sinhvien");
        listSV.classList.remove("active");;
        const thesisForm = document.querySelector(".thesis_info form");
        thesisForm.style = "left: 35%"
            const getData = async () => {
                   const data = await axios.get(
                     "http://localhost:8080/users/actions/getAssociate"
                    
                   );
                   setGv(data.data.users)
                    const dasta = await axios.get(
                       "http://localhost:8080/thesisPosition"            );
              setAllSVIN(dasta.data.thesisPosition);  
              let chuatrung = [] 
              let trung = [] 
              dasta.data.thesisPosition.map((item, index)=> {
               if(chuatrung.indexOf(item.userId) == -1) {
                   chuatrung = [...chuatrung, item.userId]
               } else {
                    trung = [...trung,item.userId]
               }
             
              })
              console.log(trung);
              setGvtrung(trung)
       };
                 getData();
         
    };
 
  
//    Get data

    useEffect(()=>{
        const getData = async () => {
               const data = await axios.get(
                 "http://localhost:8080/thesis"
               );
               setThese(data.data.theses)
             };
             getData();
       },[])
       useEffect(()=> {
        setTheseUI(these)
        console.log(these);
      },[these])

    // Get GV
    useEffect(()=>{
        const getData = async () => {
               const data = await axios.get(
                 "http://localhost:8080/thesis"
               );
               setThese(data.data.theses)
             };
             getData();
       },[])
    //    Get All Users 
   
 {
    // list
    let listUsersID = []
    let GVID = []
    let SVID = []
    users.forEach((userID)=>{
return listUsersID = [...listUsersID,userID.id]
    })
    // const userFullName = list.filter((user)=> listUsersID.indexOf(user.userId) !== -1)
    const gvUI = list.filter((u)=> u.name === "Giang Vien")
    gvUI.forEach((userID)=>{
        return GVID = [...GVID,userID.userId]
    })
    const svUI = list.filter((u)=> u.name === "Sinh vien")
    svUI.forEach((userID)=>{
        return SVID = [...SVID,userID.userId]
    })
    gvName =  users.filter((u)=> GVID.indexOf(u.id) > -1)
    svName =  users.filter((u)=> SVID.indexOf(u.id) > -1)
 }
// _________________________________ADD FAC___________________________________
const handleAddFac = (e) => {
   e.preventDefault()
    const ipName = document.querySelector("#thesis_name").value
    
    const newThesis = {
        "name":ipName,
        "facultyId": JSON.parse(localStorage.getItem("token-data")).data.facultyId
    }
    const isName = these.filter((thesis)=> thesis.name === ipName) 
    const span = document.querySelector(".add_fac_modal form span")
    if(isName.length > 0) {
        span.classList.add("active")
    }
    if(ipName && isName.length === 0) {
        const getDasta = async () => {
            await axios.post(
              `http://localhost:8080/thesis`,newThesis
            );
          let newData 
            const data = await axios.get(
                "http://localhost:8080/thesis"
              );
              await (newData = data.data.theses)
          
              handleCancle()
              setThese(newData)
              setTimeout(()=>{
                const editbtn = document.querySelectorAll(".edit_thesis_btn")
                // editbtn[editbtn.length - 1].click()
                e.preventDefault();
                const alert = document.querySelector(".alert_wrap.them")
                const addKL = document.querySelector(".add_khoaluan")
                addKL.innerText = `Bạn vừa tạo khóa luận ${ipName}`
                        alert.classList.add("active")
                        setTimeout(() => {
                            alert.classList.remove("active")
                            const editbtn = document.querySelectorAll(".edit_thesis_btn")
                            editbtn[editbtn.length-1].click()
                        }, 2500);
            },10)
             
          };
          getDasta();
       
         
    }
   
   

}
const handleAddTopic = (e) => {
    e.preventDefault()
     const ipName = document.querySelector("#topic_name").value
     document.querySelector("#detai_span").innerText = ipName
         const getDasta = async () => {
             await axios.put(
               `http://localhost:8080/thesis/action/putTopic/${detail.id}`, {"topic": ipName}
             );
             const data = await axios.get(
                "http://localhost:8080/thesis"
              );
              setThese(data.data.theses)
           };
           getDasta();
           document.querySelector(".addtopic").classList.remove("active")
 
 }
const handleNameChange = () =>{
    const span = document.querySelector(".add_fac_modal form span")
    span.classList.remove("active")
}
const handleAddSV = (e) => {
    const soluongSV = document.querySelectorAll(".so_sinhvien li");
        if(soluongSV.length < 5) {
            e.preventDefault()
    const ID = idAddSV
    setIdAddSV("")
    let newData={};
     newData = {
        "name": "Sinh vien",
        "userId": ID,
        "thesisId": detail.id,
    }
    if(ID !== "" && newData !== {}) {
        const getDasta = async () => {
            await axios.post(
              `http://localhost:8080/thesisPosition`,newData
            );
            const svKoAdd = svNotAdd.filter((sv)=> sv.id !== newData.userId)
            setSvNotAdd(svKoAdd)
        
                const data = await axios.get(
                  `http://localhost:8080/thesisPosition/Action/getByUser/${detail.id}`
                );
                setList(data.data.thesisPosition) 
                const dasta = await axios.get(
                    "http://localhost:8080/thesisPosition"            );
           setAllSVIN(dasta.data.thesisPosition);  
           let chuatrung = [] 
           let trung = [] 
           dasta.data.thesisPosition.map((item, index)=> {
            if(chuatrung.indexOf(item.userId) == -1) {
                chuatrung = [...chuatrung, item.userId]
            } else {
                trung = [...trung,item.userId]
            }
           })
              };
          getDasta();
          };
          const svitem = document.querySelectorAll(".sinhvien_item")
          svitem.forEach((sv)=> {
            sv.checked = true
          })
        } else {
            {
                alert("Số lượng sinh viên tối đa là 5")
             }   
        }
    }
const handleAddGV = (e) => {
    e.preventDefault()
    const ID = idAddGV
    setIdAddGV("")
    const newData = {
        "name": "Giang Vien",
        "userId": ID,
        "thesisId": detail.id,
    }
    if(ID !== "") {
        const getDasta = async () => {
            await axios.post(
              `http://localhost:8080/thesisPosition`,newData
            );
            const dasta = await axios.get(
                "http://localhost:8080/thesisPosition"            );
       setAllSVIN(dasta.data.thesisPosition);  
       let chuatrung = [] 
       let trung = [] 
       dasta.data.thesisPosition.map((item, index)=> {
        if(chuatrung.indexOf(item.userId) == -1) {
            chuatrung = [...chuatrung, item.userId]
        } else {
             trung = [...trung,item.userId]
        }
       })
       setGvtrung(trung)
            const gvkoTrung = gvNotAdd.filter((gv)=> trung.indexOf(gv.id) === -1)
            const gvKoAdd = gvkoTrung.filter((gv)=> gv.id !== newData.userId)
            setGvNotAdd(gvKoAdd)
                const data = await axios.get(
                  `http://localhost:8080/thesisPosition/Action/getByUser/${detail.id}`
                );
                setList(data.data.thesisPosition)       
                         
              };

              
          getDasta();
          };
          const svitem = document.querySelectorAll(".giangvien_item")
          svitem.forEach((sv)=> {
            sv.checked = true
          })
            
    }
    const handleDeleteAPI = () =>{
        const alert = document.querySelector(".alert_wrap.xoa")
        const xoaUser = document.querySelector(".xoa_user")
        xoaUser.innerText = `Đã xóa khóa luận ${thesisChoose.name}`
                alert.classList.add("active")
                setTimeout(() => {
                    alert.classList.remove("active")
                }, 1500);

        const getDasta = async () => {
            await axios.delete(
              `http://localhost:8080/thesis/${thesisChoose.id}`
            );
        const data = await axios.get(
                  "http://localhost:8080/thesis"
                );
                setThese(data.data.theses)
              };
              getDasta();
          handleCancle()
    }
    const handleSearch = () =>{
        const searchIp = document.querySelector(".search").value.toLowerCase().trim()
        const searchBTN = document.querySelector(".search_btn")
        const findName = theseUI.filter((i)=> i.name.toLowerCase().indexOf(searchIp) > -1)
        let dataRender = []
        findName.forEach((user) => {
            dataRender.indexOf(user) === -1  && (dataRender = [...dataRender,user])
            return dataRender.sort((a, b)=>  a.id - b.id);
        })
        setTheseUI(dataRender)
    }
    const handleSearchChange = () => {
        const searchIp = document.querySelector(".search").value
        searchIp.length === 0 &&  setTheseUI(these)
    }
    const HdDeleteGV = (gv) => {
        const alert = document.querySelector(".delete_users_list")
        alert.classList.add("active")
        const p = document.querySelector(".delete_users_list-box")
        p.innerHTML = `Xóa ${gv.fullName} ra khỏi khóa luận`
        const gvDelete = list.filter((l)=> l.userId === gv.id)
        setIdDelGV(gvDelete[0])
    }
    const HdDeleteSV = (sv) => {
        const alert = document.querySelector(".delete_users_list")
        alert.classList.add("active")
        const p = document.querySelector(".delete_users_list-box")
        p.innerHTML = `Xóa ${sv.fullName} ra khỏi khóa luận`
        const gvDelete = list.filter((l)=> l.userId === sv.id)
        setIdDelGV(gvDelete[0])
       
    }
    const handleCancleDelete = () =>{
        const alert = document.querySelector(".delete_users_list")
        alert.classList.remove("active")
    }
    const handleAcceptDel = () =>{
        if(scorecheck.length > 0) {
            alert("Bạn không thể xóa người ra khỏi khóa luận khi hội đồng đã bắt đầu chấm điểm")
            handleCancleDelete()
        } else {
            const getDasta = async () => {
                await axios.delete(
                  `http://localhost:8080/thesisPosition/${idDelGV.id}`
                );
                const dasta = await axios.get(
                    "http://localhost:8080/thesisPosition"            );
           setAllSVIN(dasta.data.thesisPosition);  
         
            };
                  getDasta()
            handleCancleDelete()
            const gvKoAdd = users.filter((gv)=> gv.id === idDelGV.userId)
            if(idDelGV.name === "Giang Vien") {
            setGvNotAdd((prev)=> [...prev,gvKoAdd[0]])
            renderRefGV.current.click()
            renderRefGV.current.click()
            handleAddGiangvien()

            }
            if(idDelGV.name === "Sinh vien") {
            setSvNotAdd((prev)=> [...prev,gvKoAdd[0]])
            renderRef.current.click()
            renderRef.current.click()
            handleAddSinhvien()

            }
        }
       
    }
    useEffect(()=> {
        if(detail.id) {
            const getDasta = async () => {
                const data = await axios.get(
                    `http://localhost:8080/thesisPosition/Action/getByUser/${detail.id}`
                  );
                  setList(data.data.thesisPosition)       
            };
                  getDasta()
                  getDasta()
        }
    },[gvNotAdd, svNotAdd])
    const handleChangeSL = (e)=> {
    const add = document.querySelector(".addGVbtn")
    console.log(add);
    add.classList.add("have_selected")
}
    return (
        <>
            <div className="users_wrapper">
                <h1>QUẢN LÝ KHÓA LUẬN</h1>
                <table className="theses_table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Năm học</th>
                            <th>Ngày tạo</th>
                            <th>Hạn đóng</th>
                            <th>Tên khóa luận</th>
                            <th>Khoa</th>
                            <th>Hội đồng</th>
                            <th>Tổng điểm</th>
                            <th>
                                <button></button>
                            </th>
                        </tr>{" "}
                    </thead>{" "}
                    <tbody>
                        {theseUI.map((thesis, index)=> {
                            const dateString = thesis.createdDate;
                            const date = new Date(dateString);
                            date.setDate(date.getDate() + 70);
                            const ngaytao = ([...thesis.createdDate].splice(8,2) +"/" + [...thesis.createdDate].splice(5,2) +"/"+[...thesis.createdDate].splice(0,4)).replaceAll(",","")
                            const thang = (ngaytao[3]+ngaytao[4])*1
                            const nam = (ngaytao[6]+ngaytao[7] + ngaytao[8]+ngaytao[9])*1
                             let hocki = ""
                            if(thang <= 5 && thang > 1) {
                                hocki = `HK2 ${nam}-${nam+1}`
                            } else if (thang <= 9 && thang > 6) {
                                hocki = `HK3 ${nam}-${nam+1}`
                            } else {
                                hocki = `HK1 ${nam-1}-${nam}`
                            }
                            return (<tr key={index}>
                                <th>{thesis.id}</th>
                                <th>{hocki}</th>
                                <th>{([...thesis.createdDate].splice(8,2) +"/" + [...thesis.createdDate].splice(5,2) +"/"+[...thesis.createdDate].splice(0,4)).replaceAll(",","")}</th>
                                <th>{([...date.toISOString()].splice(8,2) +"/" + [...date.toISOString()].splice(5,2) +"/"+[...date.toISOString()].splice(0,4)).replaceAll(",","")}</th>
                                <th>{thesis.name}</th>
                                <th>{thesis.faculty}</th>
                                <th>{thesis.council || "Chưa có"}</th>
                                <th>{thesis.totalScore || "Chưa có"}</th>
                                <th>
                                    <button>
                                        {" "}
                                        <i 
                                        className="edit_thesis_btn"
                                        onClick={()=>handleEdit(thesis)}>
                                            <FontAwesomeIcon icon={faCircleInfo} />
                                        </i>
                                        <i onClick={()=>handleDelete(thesis)}  className="delete_thesis_btn">
                                            {" "}
                                            <FontAwesomeIcon icon={faCircleXmark} />
                                        </i>
                                    </button>
                                </th>
                            </tr>)
                        })}
                        
                    </tbody>{" "}
                </table>
                <div className="add_users">
                    <div>
                        <input
                        onChange={handleSearchChange}
                            className="search"
                            placeholder="Nhập tên tìm kiếm"
                        ></input>
                        <i onClick={handleSearch}>
                            <FontAwesomeIcon icon={faSearch} />
                        </i>
                    </div>
                    <div>
                        {" "}
                        <button onClick={handleAdd}>
                            Thêm{" "}
                            <i>
                                <FontAwesomeIcon icon={faCirclePlus} />
                            </i>{" "}
                        </button>
                    </div>
                </div>
                <div className="delete_users_modal">
                    <div className="delete_users_box">
                        <p> Xóa khóa luận</p>
                        <div>
                            <button onClick={handleCancle}>Không xóa</button>
                            <button onClick={handleDeleteAPI}> Xóa</button>
                        </div>
                    </div>
                </div>
                <div className="delete_users_modal delete_users_list">
                    <div className="delete_users_box">
                        <p className="delete_users_list-box"> Xóa ... ra khỏi khóa luận</p>
                        <div>
                            <button onClick={handleCancleDelete}>Không xóa</button>
                            <button onClick={handleAcceptDel}> Xóa</button>
                        </div>
                    </div>
                </div>
                <div className="add_users_modal add_fac_modal">
                    <form>
                        <h5>Thêm khóa luận</h5>
                        <div className="name_wrap">
                            <input
                            onChange={handleNameChange}
                            required
                            placeholder="Tên khóa luận"
                                id="thesis_name"
                         />
                             <span>Tên khóa luận đã tồn tại</span>
                        </div>
                        <div>
                            <p onClick={handleCancle} className="cancleadd">
                                Hủy thêm
                            </p>
                            <button type="submit" onClick={handleAddFac}>Xác nhận thêm</button>
                        </div>
                    </form>
                </div>
                <div className="add_users_modal add_fac_modal addtopic">
                    <form>
                        <h5>Thêm đề tài</h5>
                        <div className="name_wrap">
                            <input
                            required
                            placeholder="Đề tài"
                                id="topic_name"
                         />
                        </div>
                        <div>
                            <p onClick={handleCancle} className="cancleadd">
                                Hủy thêm
                            </p>
                            <button type="submit" onClick={handleAddTopic}>Xác nhận thêm</button>
                        </div>
                    </form>
                </div>
                <div className="edit_users_modal thesis_info">
                    <form>
                        <h5>THÔNG TIN KHÓA LUẬN</h5>
                        <p>
                            Tên khóa luận:{" "}
                            <span>
                                {" "}
                                {detail.name}
                            </span>
                        </p>
                        <p>
                            Đề tài:{" "}
                            <span id="detai_span">
                                {" "}
                                {detail.topic}
                            </span>
                        </p>
                        <p>
                            Khoa: <span> {detail.faculty}</span>
                        </p>
                        <p>
                            Hội đồng: <span>{detail.council || "Chưa có"}</span>
                        </p>
                        <p>
                            Giảng viên{" "}
                            <i
                                onClick={handleAddGiangvien}
                                ref={renderRefGV}
                                className="giangvien_addbtn green"
                            >
                                <FontAwesomeIcon icon={faCirclePlus} />
                            </i>
                        </p>
                        <ol className="so_giangvien flex">
            {gvName.map((gv,id)=>{
                return ( <li key={id}>
                  <span > <span className="IDUS">{`[Mã GV:${gv.id}]`}  </span> {gv.fullName}</span> 
                    <span onClick={()=> HdDeleteGV(gv)} className="removeUser">
                        {" "}
                        <FontAwesomeIcon icon={faXmark} />
                    </span>
                </li>)
            })}
                           
                        </ol>
                        <p>
                            Sinh viên{" "}
                            <i onClick={handleAddSinhvien} ref={renderRef}className="green">
                                <FontAwesomeIcon icon={faCirclePlus} />
                            </i>
                        </p>{" "}
                        <ol className="so_sinhvien flex">
                           {svName.map((sv,id)=>{
                            return ( <li key={id}>
                             <span > <span className="IDUS">{`[Mã SV:${sv.id}]`}  </span> {sv.fullName}</span> 
                                <span onClick={()=> HdDeleteSV(sv)} className="removeUser">
                                    {" "}
                                    <FontAwesomeIcon icon={faXmark} />
                                </span>
                            </li>)
                           })}
                           
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
                            {svNotAddNEW.map((item,index)=>{
                                return <div key={index}>
                                <label onClick={()=> setIdAddSV(item.id)}>
                                    {" "}
                                    <span > <span className="IDUS">{`[Mã SV:${item.id}]`}  </span> {item.fullName}</span> 
                                    <input
                                    className="sinhvien_item"
                                        type="radio"
                                        name="sinhvien_selected"
                                    />
                                </label>{" "}
                            </div>
                            })}
                        </div>
                        <div className="list_sinhvien_btnbox">
                            <button onClick={handleBack}>Quay lại</button>
                            <button onClick={handleAddSV}>Thêm</button>
                        </div>
                    </div>
                    <div className={"list_giangvien"}>
                        <h5>Danh sách giảng viên</h5>
                        <div className="list_sinhvien-item">
                            {gvNotAddNEW.map((item,index)=>{
                                return ( <div key={index}>
                            
                                    <label onClick={()=> setIdAddGV(item.id)}>
                                   <span > <span className="IDUS">{`[Mã GV:${item.id}]`}  </span> {item.fullName}</span> 
                                        <input
                                        className="giangvien_item"
                                            type="radio"
                                            name="sinhvien_selected"
                                        />
                                    </label>
                                 
                         
                            </div>)
                            })}
                       
                        
                        </div>
                       
                        <div className="list_sinhvien_btnbox">
                            <button onClick={handleBack}>Quay lại</button>
                            <button onClick={handleAddGV}>Thêm</button>
                        </div>
                    </div>
                </div>
                <div className="alert_wrap them">
                    <div className="add_khoaluan">Thêm thành công</div>
                </div>
                <div className="alert_wrap xoa">
                    <div className="xoa_user"></div>
                </div>
            </div>
        </>
    );
};

export default Users;

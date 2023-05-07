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
    faSchoolLock,
    faLock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../scss/ComponentsStyle/Users.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import $ from "jquery";
import { ajax } from "jquery";
const Users = ({userNOW}) => {
    const [fac,setFac] = useState([])
    const [cc,setCc] = useState([])
    const [ccNow,setCcNow] = useState([])
    const [ccUsers,setCcUsers] = useState([])
    const [users,setUsers] = useState([])
    const [ccID,setCcID] = useState("")
    const [names,setNames] = useState([])
    const [render,setRender] = useState(true)
    const [delID,setDelID] = useState("")
    const [gvAdd,setGvAdd] = useState("")



    const [listGV,setlistGV] = useState([])
    const [listGVNot,setlistGVNot] = useState([])
    const [listGVNotNEW,setlistGVNotNEW] = useState([])
    const [pssID, setPssID] = useState("")
    const [these, setThese] = useState([])
    const [theseUI, setTheseUI] = useState([])
    const [theseIN, setTheseIN] = useState([])
    const [klAdd, setKlAdd] = useState([])
    const [allccp, setAllccp] = useState([])
    const [allSVIN, setAllSVIN] = useState([])
// _____________________ALL USERS______________________
useEffect(()=>{
    const getData = async () => {
           const data = await axios.get(
             "http://localhost:8080/users"
           );
           setUsers(data.data.users);

           const datas = await axios.get(
            "http://localhost:8080/councilPosition"
          );
          setAllccp(datas.data.councilPosition);
          
          const dasta = await axios.get(
            "http://localhost:8080/thesisPosition"            );
   setAllSVIN(dasta.data.thesisPosition);  
         };
        
         getData();
   },[])
useEffect(()=>{
    setlistGVNotNEW(listGVNot.filter((g)=> g.faculty === ccNow.faculty))
   },[listGVNot])
useEffect(()=>{
    let ID = []
    ccUsers.filter((c)=> ID = [...ID, c.userId])
    // getScoreChutich
    let chutich =  ccUsers.filter((c)=> c.positionId === 1)
    let thuky =  ccUsers.filter((c)=> c.positionId === 2)
    let phabien =  ccUsers.filter((c)=> c.positionId === 3)
    let GV =  ccUsers.filter((c)=> c.positionId === 4)
    const delBtns = document.querySelectorAll(".delUser")
    const getData = async (ID, pss, GV) => {
        if(ID) {
           
            const data = await axios.get(
                "http://localhost:8080/score"
              );
           const cpID = allccp.filter((a)=> {
            
            
            return  a.userId === ID.userId && a.councilId === ccNow.id
           })
        //    console.log(cpID);
              const ArrayScore = data.data.score.filter((d)=> d.councilPositionId === cpID[0].id)
                 if(ArrayScore.length){
                    if(pss === 1) {
                        delBtns[0].style = "display:none"
                        } else if (pss === 2) {
                            delBtns[1].style = "display:none"
                    
                        } else if (pss ===3) {
                            delBtns[2].style = "display:none"
                        } else if (pss === 4 && GV === 1) {
                            delBtns[3].style = "display:none"
                        } else if (pss === 4 && GV ===2) {
                            delBtns[4].style = "display:none"
                        }
                 } 
               
              }
        }
    getData(chutich[0], 1)
    getData(thuky[0], 2)
    getData(phabien[0], 3)
    getData(GV[0], 4, 1)
    getData(GV[1], 4, 2)
})
useEffect(()=>{
    const checkKhoa = these.filter((kl)=> kl.faculty === ccNow.faculty)
    const checkNull = checkKhoa.filter((k)=> k.council === null )
    setTheseUI(checkNull)
},[these])
useEffect(()=>{
    const getData = async () => {
        const data = await axios.get(
          "http://localhost:8080/thesis"
        );
        const checkKhoa = data.data.theses.filter((kl)=> kl.council === ccNow.name)
        setTheseIN(checkKhoa)
      };
      getData();
      getData();
},[ccNow, theseUI])

useEffect(()=>{
    if(theseIN.length > 4) {
        const plus = document.querySelector(".thanhvien_addbtn") 
        plus.classList.add("full")
      } else {
        const plusFull = document.querySelector(".thanhvien_addbtn full") 
        plusFull && plusFull.classList.remove("full")
      }

},[theseIN])
    const check = document.querySelector(".check_council")
    useEffect(()=>{
        const getData = async () => {
               const data = await axios.get(
                       "http://localhost:8080/faculty"            );
              setFac(data.data.faculties);
             };
             getData();
       },[])
    useEffect(()=>{
        const getData = async () => {
               const data = await axios.get(
                       "http://localhost:8080/council"            );
                       setCc(data.data.councils);
             };
             getData();
       },[])

       const handleChange =  () => {
        check.classList.remove("active")
    
    }
const handleAddCC = (e) => {
    e.preventDefault()
    const name = document.querySelector("#council_name")
    const khoa = document.querySelector("#khoa")
    const newData = {
        "name": name.value,
        "facultyId": userNOW.facultyId
    }
  const haveName = cc.filter((c)=> c.name.toLowerCase() === name.value.trim().toLowerCase())
  if(haveName.length > 0) {
    check.classList.add("active")
  } else {
    const getData = async () => {
      await axios.post(
                "http://localhost:8080/council" , newData);
                const data = await axios.get(
                    "http://localhost:8080/council"            );
                    setCc(data.data.councils);
          }
      getData();
      handleCancle()
      const them = document.querySelector(".alert_wrap.them") 
      const alert = document.querySelector(".alert_wrap.them div") 
      alert.innerHTML = `Hội đồng mới: ${name.value}`
      them.classList.add("active")
      setTimeout(() => {
        them.classList.remove("active")
       
      }, 2000);
      setTimeout(() => {
        const editbtn = document.querySelectorAll(".closecc")
        editbtn[editbtn.length-1].click()
      }, 100);
  }
 
}

const handleDelCC = ()=> {
    
    theseIN.forEach((t)=> {
       const data =  allSVIN.filter((a)=> a.thesisId === t.id && a.name === "Sinh vien")
       let IDS = []
       data.forEach((d)=> IDS = [...IDS, d.userId])
        const sv = users.filter((u)=> IDS.indexOf(u.id) !== -1)
        let dssv = ``
        sv.forEach((s)=> dssv = dssv += `- ${s.fullName} \n` )
        sv.forEach((s, index)=> {
           setTimeout(() => {
            if(t.totalScore) {
                function postToGoogle() {
                    $.ajax({
               
                        url: "https://docs.google.com/forms/d/e/1FAIpQLSdPTijudrF8wrYbYl_HH6OxG9U3uuQwQCv0kBIDWQ-O8btjvQ/formResponse?",
                       
                        data: {
                            "entry.1234883525": t.name,
                            "entry.1943933900": t.totalScore,
                            "entry.2061112852": dssv,
                            "entry.1416863352": s.email,
                        },
                        type: "POST",
                        dataType: "jsonp", 
                        success: function(d)
                    {},
                        error: function(x, y, z) {
                            
                        }
                    });
                    return false
                }
                postToGoogle()
            }
           }, index*5000);
        } )
        
        
      
    })
    
    const getData = async () => {
        await axios.delete(
                  `http://localhost:8080/council/${ccID.id}`);
        //           const newUI = cc.filter((c)=> c.id !== ccID.id)
        const data = await axios.get(
            "http://localhost:8080/council"            );
            setCc(data.data.councils);
        // setCc(newUI)
            }
        getData();
        handleCancle()
        const xoa = document.querySelector(".alert_wrap.xoa")
        const alert = document.querySelector(".alert_wrap .xoa_hoidong")
        alert.innerHTML = `Đã đóng hội đồng ${ccID.name}`
        xoa.classList.add("active")
        setTimeout(() => {
            xoa.classList.remove("active")
          }, 2000);
}















































    const handleAdd = () => {
        const addModal = document.querySelector(".add_users_modal");
        addModal.classList.add("active");
    };
    const handleDelete = (c) => {
        const deleteModal = document.querySelector(".delete_users_modal");
        deleteModal.classList.add("active");
        setCcID(c)
        setCcNow(c)
    };
    const handleEdit = (c) => {
        const eidtModal = document.querySelector(".edit_users_modal");
        eidtModal.classList.add("active");
        setCcNow(c)
        const getData = async () => {
            const data =  await axios.get(
                      `http://localhost:8080/councilPosition/${c.id}`);
                      setCcUsers(data.data.councilPosition)
                }
            getData();
    };
    useEffect(()=> {
        const chutichDiv = document.querySelector(".chutich p")
        const chutichID = document.querySelector(".chutichID")
        const plusBtns = document.querySelectorAll(".giangvien_addbtn")
        const chutich = ccUsers.filter((u)=> u.positionId === 1);
        const chutichName = names.filter((n)=> chutich[0] && n.id === chutich[0].userId )

        if(chutichName.length > 0) {
           chutichDiv.parentElement.classList.add("co")
           plusBtns[0].classList.add("co")
           chutichDiv.innerHTML = ` <span > <span className="IDUS">\[Mã GV:${chutich[0].userId}\]  </span> ${chutichName[0].fullName}</span> ` 
           chutichID.innerHTML =  chutich[0].userId
        } else {
            chutichDiv.parentElement.classList.remove("co")
            plusBtns[0].classList.remove("co")
        }
    // ______________THU KY____________________---
        const thukyDiv = document.querySelector(".thuky p")
        const thukyID = document.querySelector(".thukyID")
        const thuky = ccUsers.filter((u)=> u.positionId === 2);
        const thukyName = names.filter((n)=> thuky[0] && n.id === thuky[0].userId )
        if(thukyName.length > 0) {
           thukyDiv.parentElement.classList.add("co")
           plusBtns[1].classList.add("co")
           thukyDiv.innerHTML = ` <span > <span className="IDUS">\[Mã GV:${thuky[0].userId}\]  </span> ${thukyName[0].fullName}</span> `
           thukyID.innerHTML =  thuky[0].userId

        } else {
            thukyDiv.parentElement.classList.remove("co")
            plusBtns[1].classList.remove("co")
        }
        // ____________________ PHAN BIEN_______________________
        const phanbienDiv = document.querySelector(".phanbien p")
        const phanbienID = document.querySelector(".phanbienID")
        const phanbien = ccUsers.filter((u)=> u.positionId === 3);
        const phanbienName = names.filter((n)=> phanbien[0] && n.id === phanbien[0].userId )
        if(phanbienName.length > 0) {
           phanbienDiv.parentElement.classList.add("co")
           plusBtns[2].classList.add("co")
           phanbienDiv.innerHTML =  ` <span > <span className="IDUS">\[Mã GV:${phanbien[0].userId}\]  </span> ${phanbienName[0].fullName}</span> `
           phanbienID.innerHTML =  phanbien[0].userId
        }    else {
            phanbienDiv.parentElement.classList.remove("co")
            plusBtns[2].classList.remove("co")
        }

    // _____________________________THANH VIEN______________________--
        const thanhvienDiv = document.querySelectorAll(".thanhvien p")
        const thanhvienID = document.querySelectorAll(".thanhvienID")
        const thanhvien = ccUsers.filter((u)=> u.positionId === 4);
        if(thanhvien.length === 1) {
            const thanhvienName1 = names.filter((n)=> n.id === thanhvien[0].userId )
            plusBtns[3].classList.remove("co")
            if(thanhvienName1.length > 0) {
                thanhvienDiv[0].parentElement.classList.add("co")
                thanhvienDiv[3].parentElement.classList.remove("co")
                thanhvienDiv[0].innerHTML =    ` <span > <span className="IDUS">\[Mã GV:${ thanhvien[0].userId}\]  </span> ${thanhvienName1[0].fullName}</span> `
                thanhvienID[0].innerHTML =  thanhvien[0].userId
             }  else {
                thanhvienDiv[0].parentElement.classList.remove("co")
            }
        }
        if (thanhvien.length === 2) {
            const thanhvienName1 = names.filter((n)=> n.id === thanhvien[0].userId )
            const thanhvienName2 = names.filter((n)=> n.id === thanhvien[1].userId )
            plusBtns[3].classList.add("co")
            if(thanhvienName1.length > 0 && thanhvienName2.length > 0  ) {
                thanhvienDiv[0].parentElement.classList.add("co")
                thanhvienDiv[0].innerHTML = ` <span > <span className="IDUS">\[Mã GV:${ thanhvien[0].userId}\]  </span> ${thanhvienName1[0].fullName}</span> `
                thanhvienID[0].innerHTML =  thanhvien[0].userId

                thanhvienDiv[3].parentElement.classList.add("co")
                thanhvienDiv[2].innerHTML =  ` <span > <span className="IDUS">\[Mã GV:${ thanhvien[1].userId}\]  </span> ${thanhvienName2[0].fullName}</span> `
                thanhvienID[1].innerHTML =  thanhvien[1].userId
             }   
        }
        if(thanhvien.length < 1) {
            plusBtns[3].classList.remove("co")
            thanhvienDiv[0].parentElement.classList.remove("co")
                thanhvienDiv[3].parentElement.classList.remove("co")
        }
    })
    useEffect(()=> {
        let nameID = []
        ccUsers && ccUsers.forEach((user)=> {
            return nameID = [...nameID, user.userId]
         })
         const x = users.filter((user)=> nameID.indexOf(user.id) > -1)
         setNames(x)
        
         
    }, [ccNow, ccUsers])




const handleDeleteUser = (e) => {
   const checks = theseIN.filter((t)=> t.totalScore)
if(checks.length > 0) {
    alert("Hội đồng này đã bắt đầu chấm điểm bạn không thể thay đổi thành viên")
}else {
   setDelID(e.target.nextSibling)
    const alert = document.querySelector(".delete_users_modals")
    alert.classList.add("active")
    const p = document.querySelector(".delete_users_list-box")
    p.innerHTML = `Xóa ${e.target.parentElement.firstChild.innerHTML} ra khỏi hội đồng`
}
}

const handleAccepDel = () =>{
    const getData = async () => {
       const del = allccp.filter((item,index)=>item.userId === (delID.innerHTML)*1  && item.councilId === ccNow.id)
      console.log(del);
       await axios.delete(
                 `http://localhost:8080/councilPosition/${del[0].id}`);
                 const data =  await axios.get(
                    `http://localhost:8080/councilPosition/${ccNow.id}`);
                    setCcUsers(data.data.councilPosition)
                    console.log(data.data.councilPosition);
                }
       getData();
    delID.parentElement.classList.remove("co")
    const xoa = document.querySelector(".alert_wrap.xoa")
    const alert = document.querySelector(".alert_wrap .xoa_hoidong")
    alert.innerHTML = `Đã xóa ${delID.parentElement.firstChild.innerHTML} ra khỏi hội đồng ${ccNow.name}`
    xoa.classList.add("active")
    setTimeout(() => {
        xoa.classList.remove("active")
      }, 3000);
       handleCancleDelete()
}



    const handleCancle = () => {
        const addModal = document.querySelector(".add_users_modal");
        const deleteModal = document.querySelector(".delete_users_modal");
        const eidtModal = document.querySelector(".edit_users_modal");

        addModal.classList.remove("active");
        eidtModal.classList.remove("active");
        deleteModal.classList.remove("active");
    };
    const handleBack = () => {
        const listGV = document.querySelector(".list_giangvien");
        listGV.classList.remove("active");
        const listKL = document.querySelector(".list_khoaluan");
        listKL.classList.remove("active");
    };
    
    const handleAddGiangvien = (e) => {
        let trung = []
        let chuatrung = []
        allccp.map((gv)=> {
            if(trung.indexOf(gv.userId) == -1) {
                trung = [...trung, gv.userId]
            } else {
                chuatrung = [...chuatrung, gv.userId]
            }
            
        })

        const add = document.querySelector(".addGVbtn")
        add.classList.remove("have_selected")
        setPssID(e.target.attributes.pss.value)
        const listGVDIV = document.querySelector(".list_giangvien");
        listGVDIV.classList.add("active");
        const getData = async () => {
            const data = await axios.get(
              "http://localhost:8080/users/actions/getAssociate"
             
            );
            let listcheck = []
            data.data.users.map((gv)=> {
                if(chuatrung.indexOf(gv.id) === -1) {
                    return listcheck = [...listcheck, gv]
                }
            })
            setlistGV(listcheck)
          };
          getData();
    };
    useEffect(()=> {
        let nameID = []
        ccUsers && ccUsers.forEach((user)=> {
            return nameID = [...nameID, user.userId]
         })
         const x = listGV.filter((user)=> nameID.indexOf(user.id) === -1)
         
        setlistGVNot(x)
    },[listGV, ccUsers])
    const handleAddKhoaluan = () => {
        const listKL = document.querySelector(".list_khoaluan");
        listKL.classList.add("active");
        const add = document.querySelector(".addGVbtn")
        add.classList.remove("have_selected")
        const getData = async () => {
            const data = await axios.get(
              "http://localhost:8080/thesis"
            );
            setThese(data.data.theses)
          };
          getData();
    };
    const handleCancleDelete = () =>{
        const alert = document.querySelector(".delete_users_list")
        alert.classList.remove("active")
    }

const handleAddListGV = () =>{
    const NewData = {
        "councilId": ccNow.id*1,
        "positionId": pssID*1,
        "userId": gvAdd.id*1
    }
   
    const getData = async () => {
        await axios.post(
                 `http://localhost:8080/councilPosition/`, NewData);
                 const data =  await axios.get(
                    `http://localhost:8080/councilPosition/${ccNow.id}`);
                    setCcUsers(data.data.councilPosition)
                    const datas = await axios.get(
                        "http://localhost:8080/councilPosition"
                      );
               setAllccp(datas.data.councilPosition);
                }
       getData();
        handleBack()
        if(pssID == 3) {
            ( ()=> {
                //Xử lý lấy dữ liệu các input vào biến tương ứng thông qua ID của input
                let name = gvAdd.fullName
                let mail = gvAdd.email
                let cc = ccNow.name
                //Đoạn giữa này có thể sử dụng để validate dữ liệu 1 lần nữa hoăc... bỏ qua nhé :D
            
                //Xử lý gửi dữ liệu lên form
                $.ajax({
                    //Chỉ định đích gửi dữ liệu đến: là form response đã tạo ở trên
                    url: "https://docs.google.com/forms/d/e/1FAIpQLScl0KWlPHTKjvc9pb7zmGSDkn_1f1YoSEBjt-Zqy1NkKMMpug/formResponse?",
                    //URL lấy từ link đã note ở trên nhé
                    data: { //gán các giá trị tương ứng vào các Input name tương ứng đã lấy ở trên
                        "entry.1192298811": name,
                        "entry.1224335169": mail,
                        "entry.1301288516": cc,
                    },
                    type: "POST",
                    dataType: "jsonp",                     success: function(d)
                {}, //do đã bảo ở trên là nó ko cho cross đâu, nên khi gửi data xong ko trả về success được, ko cần điền cái này nhé
                    error: function(x, y, z) {
                        $('#success-msg').show(); //hiện ra cái mess báo thành công khi gửi xong
                    }
                });
            
                return false;
            })()
           
        }
}
useEffect(()=>{
    const newList = listGVNot.filter((u)=> u.id !== gvAdd.id)
    setlistGVNot(newList)
},[])
const handleUpdateCC = () => {
   if(klAdd.tickCheck) {
    const newData = {"councilId": ccNow.id}
    const getData = async () => {
    await axios.put(
        `http://localhost:8080/thesis/addCouncil/${klAdd.id}`, newData);
}
getData();
const New = these.filter((t)=> t.id !== klAdd.id)
setThese(New)
setThese(New)
   } else {
    alert("Khoá luận chưa được giáo viên hướng dẫn phê duyệt")
   }
}
const handleDelThesis = (thesis) => {
    const getData = async () => {
        await axios.put(
            `http://localhost:8080/thesis/${thesis.id}/removeCouncil`, {});
            const data = await axios.get(
                "http://localhost:8080/thesis"
              );
              setThese(data.data.theses)
    }
    getData();
}

const handleChangeSL = (e)=> {
    const add = document.querySelector(".addGVbtn")
    add.classList.add("have_selected")
}
    return (
        <>
            <div className="users_wrapper">
                <h1>QUẢN LÝ HỘI ĐỒNG</h1>

                <table className="council_table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Ngày tạo</th>
                            <th>Tên hội đồng</th>
                            <th>Khoa</th>
                            <th>
                                <button></button>
                            </th>
                        </tr>{" "}
                    </thead>{" "}
                    <tbody>
                        {cc.map((c,i)=> {
                            
                            
                          if(c.faculty === fac[userNOW.facultyId - 1].name) 
                          return ( <tr key={i}>
                            <th>{c.id}</th>
                            <th> {([...c.createdDate].splice(8,2) +"/" + [...c.createdDate].splice(5,2) +"/"+[...c.createdDate].splice(0,4)).replaceAll(",","")}</th>
                            <th>{c.name}</th>
                            <th>{c.faculty}</th>
                            <th>
                                    {c.active === false && (<button onClick={()=> handleEdit(c)}>
                                   Đã đóng
                                    {" "}
                                    <i onClick={()=> handleEdit(c)} className="closecc">
                                        <FontAwesomeIcon icon={faLock} />
                                    </i>
                                </button>)}
                                {c.active && (
                                    <button >
                                    {" "}
                                    <i onClick={()=> handleEdit(c)} className="closecc">
                                        <FontAwesomeIcon icon={faCircleInfo} />
                                    </i>
                                    
                                    {c.active  && (
                                      <i onClick={()=> handleDelete(c)}>
                                      {" "}
                                      <FontAwesomeIcon icon={faCircleXmark} />
                                  </i> 
                                    )}
                                    
                                </button>
                                )}
                            </th>
                        </tr>)
                            
                          
                        }
                          
                        )}
                        
                    </tbody>{" "}
                </table>
                <div className="add_users">
                    <div>
                       
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
                <div className="delete_users_modal delete_users_modal2">
                    <div className="delete_users_box">
                        <p> Đóng hội đồng {ccID.name}</p>
                        <div>
                            <button onClick={handleCancle}>Không</button>
                            <button onClick={handleDelCC}> Đóng</button>
                        </div>
                    </div>
                </div>
                <div className="add_users_modal">
                    <form>
                        <h5>Thêm hội đồng</h5>
                        <input onChange={handleChange}
                            required
                            placeholder="Tên hội đồng"
                            id="council_name"
                        />
                        <p className="check_council">Đã có hội đồng này</p>
                        {/* <div>
                            <select required id="khoa">
                                <option value="" selected hidden>
                                    Chọn khoa
                                </option>
                                {fac.map((f,i)=>( <option key={i} value={f.id}>
                                         {f.name}
                                     </option>))}
                            </select>
                        </div> */}
                        <div>
                            <p onClick={handleCancle} className="cancleadd">
                                Hủy thêm
                            </p>
                            <button onClick={handleAddCC} type="submit">Xác nhận thêm</button>
                        </div>
                    </form>
                </div>
                <div className="edit_users_modal concil_info">
                    <form>
                        <h5>THÔNG TIN HỘI ĐỒNG<b onClick={handleCancle}>X</b></h5>
                        <p>
                            Tên hội đồng: {ccNow.name}
                            <span>
                                {" "}
                              
                            </span>
                        </p>
                        <p>
                            Khoa: <span>{ccNow.faculty}</span>
                        </p>
                        <p>
                            Chủ tịch{" "}
                            <i pss="1" 
                                onClick={handleAddGiangvien}
                                className={ccNow.active === false && "giangvien_addbtn none" ||"giangvien_addbtn green"}
                            >
                                <FontAwesomeIcon icon={faCirclePlus} />
                            </i>
                        </p>
                        <ol className="so_giangvien">
                            <li className="chutich">
                                <p >Chưa có chủ tịch</p>
                                <span onClick={handleDeleteUser} className="delUser removeUser co">
                                    {" "}
                                    <FontAwesomeIcon icon={faXmark} />
                                </span>
                                <p className="chutichID ID"></p>
                            </li>
                        </ol>
                        <p>
                            Thư ký{" "}
                            <i pss="2"
                                onClick={handleAddGiangvien}
                                className={ccNow.active === false && "giangvien_addbtn none" ||"giangvien_addbtn green"}
                            >
                                <FontAwesomeIcon icon={faCirclePlus} />
                            </i>
                        </p>{" "}
                        <ol className="so_giangvien">
                        <li className="thuky user_council">
                                <p >Chưa có chủ tịch</p>
                                
                                <span onClick={handleDeleteUser} className="delUser removeUser co">
                                    {" "}
                                    <FontAwesomeIcon icon={faXmark} />
                                </span>
                                <p className="thukyID ID" ></p>
                            </li>
                        </ol>
                        <p>
                            Giáo viên phản biện{" "}
                            <i pss="3"
                                onClick={handleAddGiangvien}
                                className={ccNow.active === false && "giangvien_addbtn none" ||"giangvien_addbtn green"}
                            >
                                <FontAwesomeIcon icon={faCirclePlus} />
                            </i>
                        </p>{" "}
                        <ol className="so_giangvien">
                        <li className="phanbien user_council">
                                <p >Chưa có chủ tịch</p>
                                <span onClick={handleDeleteUser} className="delUser removeUser co">
                                    {" "}
                                    <FontAwesomeIcon icon={faXmark} />
                                </span>
                                <p className="phanbienID ID"></p>
                            </li>
                        </ol>
                        <p>
                            Thành viên{" "}
                            <i pss="4"
                                onClick={handleAddGiangvien}
                                className={ccNow.active === false && "giangvien_addbtn none" ||"giangvien_addbtn green"}
                            >
                                <FontAwesomeIcon icon={faCirclePlus} />
                            </i>
                        </p>{" "}
                        <ol className="so_thanhvien">
                        <li className="thanhvien user_council">
                                <p >Chưa có chủ tịch</p>
                              
                                <span onClick={handleDeleteUser} className="delUser removeUser co">
                                    {" "}
                                    <FontAwesomeIcon icon={faXmark} />
                                </span>
                                  <p className="thanhvienID ID" ></p>
                            </li>
                            <li className="thanhvien user_council">
                                <p >Chưa có chủ tịch</p>
                              
                                <span onClick={handleDeleteUser} className="delUser removeUser co">
                                    {" "}
                                    <FontAwesomeIcon icon={faXmark} />
                                </span>
                                  <p className="thanhvienID ID" ></p>
                            </li>
                        </ol>
                        
                    </form>
                    <form>
                        <p className="quanli_khoaluan">
                            Khóa luận quản lý{" "}
                            <i
                                onClick={handleAddKhoaluan}
                                className={ccNow.active === false && "thanhvien_addbtn none" ||"thanhvien_addbtn green"}
                            >
                                <FontAwesomeIcon icon={faCirclePlus} />
                            </i>
                        </p>{" "}
                    {theseIN.map((i)=> (<div className="qlktcc" key={i.id}>{i.name} {i.totalScore && (<span>Tổng điểm: {i.totalScore}</span>) || (<span className="tsdelete" onClick={()=>handleDelThesis(i)}>
                                    <FontAwesomeIcon icon={faXmark} />
                                </span>)}</div>))}


                        
                    </form>
        
                    <div className="list_giangvien">
                        <h5>Danh sách giảng viên</h5>
                        <div className="list_sinhvien-item">
                            <div>
                                {listGVNotNEW.map((gv)=>(<label key={gv.id} onClick={()=> setGvAdd(gv)}>
                                    {" "}
                                    <span > <span className="IDUS">{`[Mã GV:${gv.id}]`}  </span> {gv.fullName}</span> 
                                    <input
                                      onChange={handleChangeSL}
                                        type="radio"
                                        name="sinhvien_selected"
                                    />
                                </label>))}
                            </div>
                        </div>
                        <div className="list_sinhvien_btnbox">
                            <button onClick={handleBack}>Quay lại</button>
                            <button onClick={handleAddListGV} className="addGVbtn">Thêm</button>
                        </div>
                    </div>
                    
                    <div className="list_khoaluan">
                        <h5>Danh sách khóa luận</h5>
                        <div className="list_sinhvien-item">
                            <div>
                            {theseUI.map((t)=> (
                                           <label key={t.id} onClick={()=> setKlAdd(t)}>
                                           {t.name}
                                           <input
                                            onChange={handleChangeSL}
                                               type="radio"
                                               name="sinhvien_selected"
                                           />
                                       </label>
                                ))}
                            </div>
                        </div>
                        <div className="list_sinhvien_btnbox">
                            <button onClick={handleBack}>Quay lại</button>
                            <button onClick={handleUpdateCC}>Thêm</button>
                        </div>
                    </div>
                </div>
                
                <div className="alert_wrap them">
                    <div>Thêm thành công</div>
                </div>
                <div className="alert_wrap xoa">
                    <div className="xoa_user xoa_hoidong"></div>
                </div>
                <div className="delete_users_modal delete_users_list delete_users_modals">
                    <div className="delete_users_box">
                        <p className="delete_users_list-box"> Xóa ... ra khỏi khóa luận</p>
                        <div>
                            <button onClick={handleCancleDelete}>Không xóa</button>
                            <button onClick={handleAccepDel}> Xóa</button>
                        </div>
                    </div>
                </div>
            </div>
           
        </>
    );
};

export default Users;

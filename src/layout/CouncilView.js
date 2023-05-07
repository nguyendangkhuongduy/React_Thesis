import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {
    faCirclePlus,
    faCircleXmark,
    faSearch,
    faSquare,
    faCircleInfo,
    faXmark,
    faUserPen,
    faFileExport,
    faMarker,
    faFileLines,
    faLock
} from "@fortawesome/free-solid-svg-icons";
import {
    faPenToSquare
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../scss/ComponentsStyle/Users.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
const Users = ({userNOW, Print}) => {
    const [kldc, setKldc] = useState([])
    const [allccp, setAllccp] = useState([])
    const [tc, setTc] = useState([])
    const [indexClick, setIndexClick] = useState([])
    const [tsNOW, setTsNOW] = useState([])
    const [sChuTich, setSChuTich] = useState([])
    const [sThuKy, setSThuKy] = useState([])
    const [sPhanBien, setSPhanBien] = useState([])
    const [sGV1, setSGV1] = useState([])
    const [sGV2, setSGV2] = useState([])
    const [full, setFull] = useState(false)
    const cd = document.querySelector(".chamdiem")
    
    const [fac,setFac] = useState([])
    const [cc,setCc] = useState([])
    const [ccNow,setCcNow] = useState("")
    const [ccUsers,setCcUsers] = useState([])
    const [users,setUsers] = useState([])
    const [ccID,setCcID] = useState("")
    const [names,setNames] = useState([])
    const [render,setRender] = useState(true)
    const [delID,setDelID] = useState("")
    const [gvAdd,setGvAdd] = useState("")



    const [listGV,setlistGV] = useState([])
    const [listGVNot,setlistGVNot] = useState([])
    const [pssID, setPssID] = useState("")
    const [these, setThese] = useState([])
    const [theseUI, setTheseUI] = useState([])
    const [theseIN, setTheseIN] = useState([])
    const [klAdd, setKlAdd] = useState([])
useEffect(()=>{
   
    const getData = async () => {
        const data = await axios.get(
          "http://localhost:8080/councilPosition"
        );
        setAllccp(data.data.councilPosition);
        const datas = await axios.get(
          "http://localhost:8080/criteria"
        );
        setTc(datas.data.criteria);
      };
      
      getData();
      return () => {
        const editBtnID = localStorage.getItem("ccEdit")
        const xemdiemBtnID = localStorage.getItem("textxemdiem")
        if(editBtnID && xemdiemBtnID) {
            setTimeout(() => {
                const editBtn = document.querySelectorAll(".ccEdit")
                editBtn[editBtnID*1].click()
                }, 200);
                setTimeout(() => {
                    const xemdiemBtn = document.querySelectorAll(".textxemdiem")
                    xemdiemBtn[xemdiemBtnID*1].click()
                    localStorage.removeItem("ccEdit")
                    localStorage.removeItem("textxemdiem")
                }, 400);
                
        }
      }
},[])
const AccepSuaDiem = (i,index) => {
    setIndexClick(index)
    const a = document.querySelector(".alert_chamdiem_item")
    const al = document.querySelector(".alert_chamdiem")
    a.innerHTML = `Xác nhận chấm điểm khóa luận ${i.name}`
    al.classList.add("active")
    setKldc(i)
    console.log(tc);
    
    
}
const AccepXemDiem = (i, index) => {
    setFull(false)    
    localStorage.setItem("textxemdiem", JSON.stringify(index))
    setTsNOW(i)
    let ID = []
    ccUsers.filter((c)=> ID = [...ID, c.userId])
    console.log(ID);
    const cd = document.querySelector(".chamdiem")
    const toi = document.querySelectorAll(".toi")
    const tb = document.querySelectorAll(".tb")
    tb.forEach((t)=> t.innerHTML = "-")
    cd.classList.add("active")
    // getScoreChutich
    setSChuTich([]);
    setSThuKy([])
    setSPhanBien([])
    setSGV1([])
    setSGV2([])
    let chutich =  ccUsers.filter((c)=> c.positionId === 1)
    let thuky =  ccUsers.filter((c)=> c.positionId === 2)
    let phabien =  ccUsers.filter((c)=> c.positionId === 3)
    if(chutich.length && thuky.length && phabien.length) {
        console.log(full);
        setFull(true)
    }
    let GV =  ccUsers.filter((c)=> c.positionId === 4)
    const getData = async (ID, pss, GV) => {
        if(ID) {
           
            const data = await axios.get(
                "http://localhost:8080/score"
              );
           const cpID = allccp.filter((a)=> a.userId === ID.userId && a.councilId === ccNow.id)
              const ArrayScore = data.data.score.filter((d)=> d.thesisId === i.id && d.councilPositionId === cpID[0].id)
              const cpIDCheck = allccp.filter((a)=> a.userId === userNOW.id && a.councilId === ccNow.id)
             const ArrayScoreCheck = data.data.score.filter((d)=> d.thesisId === i.id && d.councilPositionId === cpIDCheck[0].id)
             console.log(ArrayScoreCheck);
              const last = await axios.get(
                  "http://localhost:8080/scoreDetail"
                );
                 if(ArrayScore.length){
                    const score = last.data.scoreDetails.filter((i)=> i.score_id === ArrayScore[ArrayScore.length-1].id)
                    if(pss === 1) {
                        setSChuTich(score);
                        
                      const a = score.reduce((khoitao, i) => khoitao += i.mark, 0)
                      if(ccNow.active === false) {
                        const len = tc
                      if(len.length - score.length > 0) {
                        len.length = score.length
                        setTc(len);
                      }
                      }
                      a/score.length && (tb[0].innerHTML = a/score.length) || (tb[0].innerHTML = "-")
                        } else if (pss === 2) {
                          setSThuKy(score)
                          const a = score.reduce((khoitao, i) => khoitao += i.mark, 0)
                          if(ccNow.active === false) {
                            const len = tc
                          if(len.length - score.length > 0) {
                            len.length = score.length
                            setTc(len);
                          }
                          }
                      a/score.length && (tb[1].innerHTML = a/score.length) || (tb[1].innerHTML = "-")
                        } else if (pss ===3) {
                          setSPhanBien(score)
                          const a = score.reduce((khoitao, i) => khoitao += i.mark, 0)
                          if(ccNow.active === false) {
                            const len = tc
                          if(len.length - score.length > 0) {
                            len.length = score.length
                            setTc(len);
                          }
                          }
                      a/score.length && (tb[2].innerHTML = a/score.length) || (tb[2].innerHTML = "-")
                        } else if (pss === 4 && GV === 1) {
                          setSGV1(score)
                          const a = score.reduce((khoitao, i) => khoitao += i.mark, 0)
                          if(ccNow.active === false) {
                            const len = tc
                          if(len.length - score.length > 0) {
                            len.length = score.length
                            setTc(len);
                          }
                          }
                      a/score.length && (tb[3].innerHTML = a/score.length) || (tb[3].innerHTML = "-")
                        } else if (pss === 4 && GV ===2) {
                          setSGV2(score)
                          const a = score.reduce((khoitao, i) => khoitao += i.mark, 0)
                          if(ccNow.active === false) {
                            const len = tc
                          if(len.length - score.length > 0) {
                            len.length = score.length
                            setTc(len);
                          }
                          }
                      a/score.length && (tb[4].innerHTML = a/score.length) || (tb[4].innerHTML = "-")
                        }
                 } 
               
              }
        }
    getData(chutich[0], 1)
    getData(thuky[0], 2)
    getData(phabien[0], 3)
    getData(GV[0], 4, 1)
    getData(GV[1], 4, 2)
    if(chutich[0].userId === userNOW.id) {
        console.log(ID.userId);
        toi[0].innerHTML = "Chủ tịch <span>(Tôi)</span>"
    }
   else if(thuky[0].userId === userNOW.id) {
    console.log(userNOW.id);
        toi[1].innerHTML = "Thư ký <span>(Tôi)</span>"
    }
    else if(phabien[0].userId === userNOW.id) {
        toi[2].innerHTML = "Phản biện <span>(Tôi)</span>"
    }
    else if(GV[0].userId === userNOW.id) {
        console.log(ID);
        toi[3].innerHTML = "Thành viên <span>(Tôi)</span>"
    }
    else  if(GV[1].userId === userNOW.id) {
        toi[4].innerHTML = "Thành viên <span>(Tôi)</span>"
    } else {
         return false
    }
    const getDatas = async () => {
        const data = await axios.get(
            "http://localhost:8080/score"
          );
          const cpIDCheck = allccp.filter((a)=> a.userId === userNOW.id && a.councilId === ccNow.id)
        const ArrayScoreCheck = data.data.score.filter((d)=> d.thesisId === i.id && d.councilPositionId === cpIDCheck[0].id)
         console.log(ArrayScoreCheck,"UIIIIIIIIII");
         const cd = document.querySelector(".suadiemBTN")
         if(ArrayScoreCheck.length) {
            cd.classList.add("roi")
         } else {
            cd.classList.remove("roi")
         }
    }
    getDatas()
       setTimeout(() => {
        const tbs = document.querySelectorAll(".tb")
        const dtb = document.querySelector(".DTBUI")
        let TB = []
        let myArrays = Array.from(tbs)
        myArrays.map((t)=> {
            if(t.innerHTML !== "-") {
                return TB = [...TB,t.innerHTML*1]
            }
        })
        
        const sum = TB.reduce((khoitao, i)=> 
                khoitao += i*1, 0)
                if((sum/TB.length).toFixed(2) !== "NaN") {
                    dtb.innerHTML = (sum/TB.length).toFixed(2)
                } else {
                    dtb.innerHTML = "-"
                }
       
        const getData = async () => {
             await axios.put(
              `http://localhost:8080/thesis/addTotalScore/${tsNOW.id}`, {
                "totalScore": (sum/TB.length).toFixed(2)
              }
            );
          };
          if(TB.length === ccUsers.length) {
          getData();
          }
    }, 700);
}
const handleAcceped = () => {
    const chamdiem = document.querySelector(".bangchamdiem")
    chamdiem.classList.add("active")
    const cpID = allccp.filter((a)=> a.userId === userNOW.id && a.councilId === ccNow.id)
    const newData = {
    "thesisId": tsNOW.id,
    "councilPositionId": cpID[0].id
    }
    const getData = async () => {
       await axios.post(
          `http://localhost:8080/score` , newData
        );
      };
      getData();
      const sd = document.querySelector(".alert_chamdiem")
    sd.classList.remove("active")
}
const handleOutCD = () =>{
    const cd = document.querySelector(".chamdiem")
    cd.classList.remove("active")
}
const handleSuaDiem = (a) => {
    
    const sd = document.querySelector(".alert_chamdiem")
    const ip = document.querySelector(".checksuadiem")
    const span = document.querySelector(".span_xacnhan")
    const btn = document.querySelector(".btn_xacnhan")
    const h5 = document.querySelector(".alert_chamdiem_item")
    sd.classList.add("active")
    ip.checked = false
    if(a==="CD") {
        span.innerHTML = `Đi đến bảng chấm điểm - bằng việc chọn đồng ý chấm điểm bạn sẽ chịu hoàn toàn trách nhiệm sau khi thực hiện`
        btn.innerHTML =`Chấm điểm`
        h5.innerHTML =`Xác nhận chấm điểm`
    } else {
        span.innerHTML = `Điểm đã chấm - bằng việc chọn đồng ý sữa điểm bạn sẽ chịu hoàn toàn trách nhiệm sau khi thực hiện`
        btn.innerHTML =`Sửa điểm`
        h5.innerHTML =`Xác nhận sửa điểm`
    }
   
}
const handleOutBCD = ()=>{
    const chamdiem = document.querySelector(".bangchamdiem")
    chamdiem.classList.remove("active")
}
const handleChamDiem = () =>{
    const ips = document.querySelectorAll(".bangchamdiem_div2 div input")
    let myArray = Array.from(ips)

    const getData = async () => {
        const data = await axios.get(
          "http://localhost:8080/score"
        );
        const check =  myArray.every((ip)=> {
            return ip.value.length > 0
         })
         const ArrayScore = data.data.score
         if(check) {
            tc.forEach((t,index)=> {
                const newData = {
                    "criteria_id": t.id,
                    "score_id": ArrayScore[ArrayScore.length-1].id,
                    "mark":ips[index].value
                }
                console.log(newData);
                const getData = async () => {
                    await axios.post(
                       `http://localhost:8080/scoreDetail` , newData
                     );
                   };
                   getData();
    
            })
            // handleOutCD()
            handleCancleDelete()
        } else {
            alert("Nhập đầy đủ điểm các tiêu chí")
        }
      };
    getData();
    handleOutBCD()
    AccepXemDiem(tsNOW)
    AccepXemDiem(tsNOW)
   
}

























 


























    
   
// _____________________ALL USERS______________________
useEffect(()=>{
    const getData = async () => {
           const data = await axios.get(
             "http://localhost:8080/users"
           );
           setUsers(data.data.users);
         };
         getData();
   },[])

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
                       `http://localhost:8080/council/action/getByUserId/${userNOW.id}`            );
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
    console.log(name.value, khoa.value);
    const newData = {
        "name": name.value,
        "facultyId": (khoa.value)*1
    }
  const haveName = cc.filter((c)=> c.name.toLowerCase() === name.value.trim().toLowerCase())
  console.log(haveName);
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
  }
 
}

const handleDelCC = ()=> {
    const getData = async () => {
        await axios.delete(
                  `http://localhost:8080/council/${ccID.id}`);
                  const newUI = cc.filter((c)=> c.id !== ccID.id)
        setCc(newUI)
            }
        getData();
        handleCancle()
        const xoa = document.querySelector(".alert_wrap.xoa")
        const alert = document.querySelector(".alert_wrap .xoa_hoidong")
        alert.innerHTML = `Đã xóa hội đồng ${ccID.name}`
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
    };
    const handleEdit = (c,i) => {
        localStorage.setItem("ccEdit", JSON.stringify(i))
        const eidtModal = document.querySelector(".edit_users_modal");
        eidtModal.classList.add("active");
        setCcNow(c)
       
    };
    useEffect(()=> {
        if(ccNow) {
            const getData = async () => {
                const data =  await axios.get(
                          `http://localhost:8080/councilPosition/${ccNow.id}`);
                          setCcUsers(data.data.councilPosition)
                const datas = await axios.get(
                            "http://localhost:8080/score"
                          );
                          console.log(datas.data.score);
                          let ID = []
                            theseIN.forEach((t)=> ID = [...ID, t.id])
                             ID.forEach((i,index)=> {
                               const check = datas.data.score.filter((d)=> d.thesisId == i)
                              if(check.length > 0) {
                                  const cham = document.querySelectorAll(".textchamdiem")
                                //  return cham[index].classList.remove("chua")
                              }
                            })
                    }
                getData();
        }
        
    }, [ccNow, theseIN])
    useEffect(()=> {
        const chutichDiv = document.querySelector(".chutich p")
        const chutichID = document.querySelector(".chutichID")
        const plusBtns = document.querySelectorAll(".giangvien_addbtn")
        const chutich = ccUsers.filter((u)=> u.positionId === 1);
        const chutichName = names.filter((n)=> chutich[0] && n.id === chutich[0].userId )
        console.log(ccUsers);
        if(chutichName.length > 0) {
           chutichDiv.parentElement.classList.add("co")
           plusBtns[0].classList.add("co")
           chutichDiv.innerHTML =  chutich[0].userId === userNOW.id && `${chutichName[0].fullName} (Tôi)` || chutichName[0].fullName
           chutichID.innerHTML =  chutich[0].id
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
           thukyDiv.innerHTML =  thuky[0].userId === userNOW.id && `${thukyName[0].fullName} (Tôi)` || thukyName[0].fullName
           thukyID.innerHTML =  thuky[0].id

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
           phanbienDiv.innerHTML =  phanbien[0].userId === userNOW.id && `${phanbienName[0].fullName} (Tôi)` || phanbienName[0].fullName
           phanbienID.innerHTML =  phanbien[0].id
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
                thanhvienDiv[0].innerHTML =  thanhvienName1[0].fullName
                thanhvienID[0].innerHTML =  thanhvien[0].id
             }  else {
                thanhvienDiv[0].parentElement.classList.remove("co")
            }
        }
        if (thanhvien.length >= 2) {
            const thanhvienName1 = names.filter((n)=> n.id === thanhvien[0].userId )
            const thanhvienName2 = names.filter((n)=> n.id === thanhvien[1].userId )
            console.log(thanhvienName2);
            plusBtns[3].classList.add("co")
            if(thanhvienName1.length > 0 && thanhvienName2.length > 0 ) {
                thanhvienDiv[0].parentElement.classList.add("co")
                thanhvienDiv[0].innerHTML =  thanhvienName1[0].fullName
                thanhvienID[0].innerHTML =  thanhvien[0].id

                thanhvienDiv[3].parentElement.classList.add("co")
                thanhvienDiv[2].innerHTML =  thanhvienName2[0].fullName
                thanhvienID[1].innerHTML =  thanhvien[1].id
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
    const del = (e.target.nextSibling)
   setDelID(del)
    const alert = document.querySelector(".delete_users_modals")
    alert.classList.add("active")
    const p = document.querySelector(".delete_users_list-box")
    p.innerHTML = `Xóa ${e.target.parentElement.firstChild.innerHTML} ra khỏi hội đồng`
}

const handleAccepDel = () =>{
    const getData = async () => {
        await axios.delete(
                 `http://localhost:8080/councilPosition/${delID.innerHTML}`);
                 const data =  await axios.get(
                    `http://localhost:8080/councilPosition/${ccNow.id}`);
                    setCcUsers(data.data.councilPosition)
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
        setPssID(e.target.attributes.pss.value)
        const listGVDIV = document.querySelector(".list_giangvien");
        listGVDIV.classList.add("active");
        const getData = async () => {
            const data = await axios.get(
              "http://localhost:8080/users/actions/getAssociate"
             
            );
            setlistGV(data.data.users)
          };
          getData();
        //   console.log(listGV);
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
    console.log(gvAdd);
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

                }
       getData();
                handleBack()
}
useEffect(()=>{
    const newList = listGVNot.filter((u)=> u.id !== gvAdd.id)
    setlistGVNot(newList)
},[])
const handleUpdateCC = () => {
    console.log(ccNow.id);
    const newData = {"councilId": ccNow.id}
    console.log(klAdd.id, newData);
    const getData = async () => {
    await axios.put(
        `http://localhost:8080/thesis/addCouncil/${klAdd.id}`, newData);
}
getData();
const New = these.filter((t)=> t.id !== klAdd.id)
console.log(New,"NEW");
setThese(New)
setRender(!render)
}
const handleDelThesis = (thesis) => {
    console.log(thesis.id);
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
const handleLimit = (e) => {
    if(e.target.value >= 10) {
        e.target.value = 10
    }
    if(e.target.value <= 0) {
        e.target.value = 0
    }
}
const HandlePrintPDF = () => {
    const tables = document.querySelector(".chamdiem")
    Print(tables)
    console.log(tables);
}
console.log(cc);
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
                        {cc.map((c,i)=> (
                            <tr key={i}>
                            <th>{c.id}</th>
                            <th> {([...c.createdDate].splice(8,2) +"/" + [...c.createdDate].splice(5,2) +"/"+[...c.createdDate].splice(0,4)).replaceAll(",","")}</th>
                            <th>{c.name}</th>
                            <th>{c.faculty}</th>
                            <th>
                                <button>
                                    {" "}
                                    <i className="ccEdit"onClick={()=> handleEdit(c,i)}>
                                        <FontAwesomeIcon icon={faCircleInfo} />
                                    </i>
                                </button>
                                {c.active === false && (<span>
                                    {" "}
                                    <i className="ccEdit1">
                                       Đã đóng
                                    </i>
                                </span>)}
                                {c.active && (<span>
                                    {" "}
                                    <i className="ccEdit2">
                                       Đang mở
                                    </i>
                                </span>)}
                            </th>
                        </tr>
                        ))}
                        
                    </tbody>{" "}
                </table>
                <div className="add_users">
                    <div>
                        <input
                            className="search"
                            placeholder="Nhập tên tìm kiếm"
                        ></input>
                        <i>
                            <FontAwesomeIcon icon={faSearch} />
                        </i>
                    </div>
                    {/* <div>
                        {" "}
                        <button onClick={handleAdd}>
                            Thêm{" "}
                            
                        </button>
                    </div> */}
                </div>
                <div className="delete_users_modal delete_users_modal2">
                    <div className="delete_users_box">
                        <p> Xóa hội đồng {ccID.name}</p>
                        <div>
                            <button onClick={handleCancle}>Không xóa</button>
                            <button onClick={handleDelCC}> Xóa</button>
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
                        <div>
                            <select required id="khoa">
                                <option value="" selected hidden>
                                    Chọn khoa
                                </option>
                                {fac.map((f,i)=>( <option key={i} value={f.id}>
                                         {f.name}
                                     </option>))}
                            </select>
                        </div>
                        <div>
                            <p onClick={handleCancle} className="cancleadd">
                                Hủy thêm
                            </p>
                            <button onClick={handleAddCC} type="submit">Xác nhận thêm</button>
                        </div>
                    </form>
                </div>
                <div className="edit_users_modal concil_info concil_view_info">
                    <form>
                        <h5>THÔNG TIN HỘI ĐỒNG  <b onClick={handleCancle}>X</b></h5>
                        <p>
                            <span className="box_heading">Tên hội đồng</span> 
                            <span>
                            {ccNow.name}
                            </span>
                        </p>
                        <p>
                            <span className="box_heading">Khoa</span> <span>{ccNow.faculty}</span>
                        </p>
                        <p>
                        <span className="box_heading">Chủ tịch</span>
                            <i pss="1"
                                onClick={handleAddGiangvien}
                                className="giangvien_addbtn"
                            >
                            </i>
                        </p>
                        <ol className="so_giangvien">
                            <li className="chutich">
                                <p >Chưa có chủ tịch</p>
                                <p className="chutichID ID"></p>
                            </li>
                        </ol>
                        <p>
                        <span className="box_heading">Thư ký</span>
                            <i pss="2"
                                onClick={handleAddGiangvien}
                                className="giangvien_addbtn"
                            >
                            </i>
                        </p>{" "}
                        <ol className="so_giangvien">
                        <li className="thuky user_council">
                                <p >Chưa có chủ tịch</p>
                                
                                <p className="thukyID ID" ></p>
                            </li>
                        </ol>
                        <p>
                        <span className="box_heading">Phản biện</span>
                            <i pss="3"
                                onClick={handleAddGiangvien}
                                className="giangvien_addbtn"
                            >
                            </i>
                        </p>{" "}
                        <ol className="so_giangvien">
                        <li className="phanbien user_council">
                                <p >Chưa có chủ tịch</p>
                                <p className="phanbienID ID"></p>
                            </li>
                        </ol>
                        <p>
                        <span className="box_heading">Thành viên</span>
                            <i pss="4"
                                onClick={handleAddGiangvien}
                                className="giangvien_addbtn"
                            >
                            </i>
                        </p>{" "}
                        <ol className="so_thanhvien">
                        <li className="thanhvien user_council">
                                <p >Chưa có chủ tịch</p>
                              
                                  <p className="thanhvienID ID" ></p>
                            </li>
                            <li className="thanhvien user_council">
                                <p >Chưa có chủ tịch</p>
                              
                                  <p className="thanhvienID ID" ></p>
                            </li>
                        </ol>
                       
                    </form>
                    <form>
                        <p className="quanli_khoaluan">
                            Khóa luận quản lý{" "}
                            <i
                                onClick={handleAddKhoaluan}
                                className="thanhvien_addbtn"
                            >
                            </i>
                        </p>{" "}
                    {theseIN.map((i,index)=> (<div key={i.id}><span className="textxemdiem" >{i.name}</span> <span className="textxemdiem diem" onClick={()=>AccepXemDiem(i, index)}>Điểm <FontAwesomeIcon icon={faMarker}/></span> </div>))}
                        
                    </form>
        
                </div>
                
                <div className="chamdiem">
                    <div className="chamdiem_top"><h5>Bảng chấm điểm tiêu chí</h5><b onClick={handleOutCD}>X</b></div>
                    <div className="chamdiem_info">
                        <span>Hội đồng chấm điểm: {ccNow.name}</span> <br/>
                        <span>Tên khóa luận: {tsNOW.name}</span> <br/>
                        <span>Khoa: {tsNOW.faculty}</span>
                    </div>
                  
                    <div className="chamdiem_bottom">
                    {full === false && <span  className="fullcheck" >Hội đồng chưa đủ thành viên chưa thể chấm điểm</span>}
                   {tsNOW.file && ( <p className="chamdiem_xembai"><a     href={`https://drive.google.com/file/d/${tsNOW.file}`} target="_blank">Xem bài <span><FontAwesomeIcon icon={faFileLines}/></span></a></p>)}
                   {!tsNOW.file && ( <p  className="chuaco" >Chưa có bài nộp <span><FontAwesomeIcon icon={faFileLines}/></span></p>)}
                       {ccNow.active && tsNOW.file && full && <>
                        <button className="suadiemBTN" onClick={()=>handleSuaDiem("SD")}><i><FontAwesomeIcon icon={faPenToSquare}/></i><span>Sửa điểm</span></button>
                        <button className="chamdiemBTN" onClick={()=>handleSuaDiem("CD")}><i><FontAwesomeIcon icon={faPenToSquare}/></i><span>Chấm điểm</span></button></>}
                       {ccNow.active === false && <>
                        <button className="dongBTN"><i><FontAwesomeIcon icon={faPenToSquare}/></i><span>Đã đóng hội đồng</span></button>
                       </>}
                        <p>Điểm trung bình: <span className="DTBUI"></span></p>
                        
                        {ccNow.active === false && <>
                        <NavLink to={"/printPDF"} className="exBTN"><i onClick={HandlePrintPDF}><FontAwesomeIcon icon={faFileExport}/></i><span></span></NavLink >
                       </>}
                    </div>
                   

                    <div className="chamdiem_mid">
                    <table className="chamdiem_table">
                    <thead>
                        <tr>
                            <th>Tiêu chí</th>
                            <th className="toi">Chủ tịch</th>
                            <th className="toi">Thư ký</th>
                            <th className="toi">
                               Phản biện
                            </th>
                            <th className="toi">
                               Thành viên                            </th>
                            <th className="toi">
                               Thành viên                            </th>
                        </tr>{" "}
                    </thead>{" "}
                    <tbody>
                        {tc.map((t,index)=> (
                            <tr key={index}>
                            <th>{t.name}</th>
                            <th>{sChuTich[index] && sChuTich[index].mark.toString() || "-"}</th>
                            <th>{sThuKy[index] && sThuKy[index].mark.toString() || "-"}</th>
                            <th>{sPhanBien[index] && sPhanBien[index].mark.toString() || "-"}</th>
                            <th>{sGV1[index] && sGV1[index].mark.toString() ||"-"}</th>
                            <th>{sGV2[index] && sGV2[index].mark.toString() || "-"}</th>
                        </tr>
                        ))}
                         <tr className="trungbinh">
                            <th>Trung bình</th>
                            <th className="tb">-</th>
                            <th className="tb">-</th>
                            <th className="tb">-</th>
                            <th className="tb">-</th>
                            <th className="tb">-</th>
                        </tr>
                    </tbody>{" "}
                    
                </table>
                       
                        <div className="chamdiem4">
                        </div>
                    </div>
                    <div className="chamdiem_info bottom">
                        <span>Trường Đại học Mở, Ngày&ensp;&ensp;Tháng&ensp;&ensp;Năm&ensp;&ensp;&ensp;</span> <br/>
                        <span className="chuky">Chữ ký ban lãnh đạo</span> <br/>
                    </div>




                </div>
                <div className="bangchamdiem chamdiem">
                   <div className="bangchamdiem_div1"> <h5>Bảng tiêu chí chấm điểm</h5></div>
                                  <div className="bangchamdiem_div2">{tc.map((t,index)=> (<div key={t.id}><span>{index+1}. {t.name} :</span><input onChange={handleLimit} min="0" max="10"  step="0.1" data={t.id}  type="number"/>
                        </div>))}</div>
                        <div><button onClick={handleChamDiem}>Xác nhận</button></div>
                </div>
                <div className="alert_wrap them">
                    <div>Thêm thành công</div>
                </div>
                <div className="alert_wrap xoa">
                    <div className="xoa_user xoa_hoidong"></div>
                </div>
                <div className="delete_users_modal delete_users_list delete_users_modals alert_chamdiem">
                    <div className="delete_users_box alert_chamdiem_box active">
                        <p className="delete_users_list-box alert_chamdiem_item">Xác nhận sửa điểm</p>
                        <input className="checksuadiem"type="checkbox"/> 
                        <span className="span_xacnhan">Điểm đã chấm - bằng việc chọn đồng ý sữa điểm bạn sẽ chịu hoàn toàn trách nhiệm sau khi thực hiện</span>
                        <div className="checked_check">
                           
                            <button onClick={handleCancleDelete}>Không</button>
                            <button className="btn_xacnhan" onClick={handleAcceped}>Sửa điểm </button>
                        </div>
                    </div>
                </div>
            </div>
           
        </>
    );
};

export default Users;

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
    faEye,
    faFileExport
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../scss/ComponentsStyle/Users.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
const Users = ({userNOW , Print}) => {
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
    const [TS, setTS] = useState([])

    const [kldc, setKldc] = useState([])
    const [allccp, setAllccp] = useState([])
    const [tc, setTc] = useState([])
    const [indexClick, setIndexClick] = useState([])
    const [sChuTich, setSChuTich] = useState([])
    const [sThuKy, setSThuKy] = useState([])
    const [sPhanBien, setSPhanBien] = useState([])
    const [sGV1, setSGV1] = useState([])
    const [sGV2, setSGV2] = useState([])
    const cd = document.querySelector(".chamdiem")
    const [fac,setFac] = useState([])
    const [cc,setCc] = useState([])
    const [ccUsers,setCcUsers] = useState([])
    const [users,setUsers] = useState([])
    const [ccID,setCcID] = useState("")
    const [names,setNames] = useState([])
    const [c,setC] = useState([])
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
     const aa = cc.filter((c)=> c.name === i.council)
     console.log(aa);
     setC(aa)
    const getDatass = async () => {
        const data =  await axios.get(
                  `http://localhost:8080/councilPosition/${aa[0].id}`);
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
        getDatass();
    localStorage.setItem("textxemdiem", JSON.stringify(index))
    setTsNow(i)
    let ID = []
    console.log(ccUsers);
    ccUsers.filter((c)=> ID = [...ID, c.userId])
    console.log(ID);
    const cd = document.querySelector(".chamdiem")
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
    console.log(chutich);
    let thuky =  ccUsers.filter((c)=> c.positionId === 2)
    let phabien =  ccUsers.filter((c)=> c.positionId === 3)
    let GV =  ccUsers.filter((c)=> c.positionId === 4)
    const getData = async (ID, pss, GV) => {
        if(ID) {
           
            const data = await axios.get(
                "http://localhost:8080/score"
              );
           const cpID = allccp.filter((a)=> a.userId === ID.userId && a.councilId === aa[0].id)
              const ArrayScore = data.data.score.filter((d)=> d.thesisId === i.id && d.councilPositionId === cpID[0].id)
              const cpIDCheck = allccp.filter((a)=>  a.councilId === aa[0].id)
              console.log(cpIDCheck);
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
                      if(c.active === false) {
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
                          if(c.active === false) {
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
                          if(c.active === false) {
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
                          if(c.active === false) {
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
                          if(c.active === false) {
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
    const getDatas = async () => {
        const data = await axios.get(
            "http://localhost:8080/score"
          );
          const cpIDCheck = allccp.filter((a)=> a.userId === userNOW.id && a.councilId === aa[0].id)
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
        //   getData();
    }, 700);
}
const handleAcceped = () => {
    const chamdiem = document.querySelector(".bangchamdiem")
    chamdiem.classList.add("active")
    const cpID = allccp.filter((a)=> a.userId === userNOW.id && a.councilId === c[0].id)
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
    const getData = async () => {
        const data = await axios.get(
          "http://localhost:8080/thesis"
        );
        const checkKhoa = data.data.theses.filter((kl)=> kl.council === c.name)
        setTheseIN(checkKhoa)
      };
      getData();
      getData();
},[c, theseUI])
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
                       `http://localhost:8080/council`            );
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
    useEffect(()=> {
        let nameID = []
        ccUsers && ccUsers.forEach((user)=> {
            return nameID = [...nameID, user.userId]
         })
         const x = users.filter((user)=> nameID.indexOf(user.id) > -1)
         setNames(x)
        
         
    }, [c, ccUsers])




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
                    `http://localhost:8080/councilPosition/${c[0].id}`);
                    setCcUsers(data.data.councilPosition)
                }
       getData();
    delID.parentElement.classList.remove("co")
    const xoa = document.querySelector(".alert_wrap.xoa")
    const alert = document.querySelector(".alert_wrap .xoa_hoidong")
    alert.innerHTML = `Đã xóa ${delID.parentElement.firstChild.innerHTML} ra khỏi hội đồng ${c.name}`
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
        "councilId": c[0].id*1,
        "positionId": pssID*1,
        "userId": gvAdd.id*1
    }
    const getData = async () => {
        await axios.post(
                 `http://localhost:8080/councilPosition/`, NewData);
                 const data =  await axios.get(
                    `http://localhost:8080/councilPosition/${c[0].id}`);
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
    console.log(c[0].id);
    const newData = {"councilId": c[0].id}
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

    
    
    
    
    useEffect(() => {
        setNewUI(UI)
    }, [UI])
    useEffect(() => {
        const getData = async () => {
            const data = await axios.get(
                    `http://localhost:8080/thesis`);
                    setUI(data.data.theses);
                    console.log(UI);
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
        setTS(u);
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
        eidtModal.classList.add("active");
    };
    const handleAddSinhvien = () => {
        const listSV = document.querySelector(".list_sinhvien");
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
    const handleUploadChange = (e) => {
        handleCancle()
        var filex = e.target.files[0] //the file
        const dang = document.querySelectorAll(".dangnopbai")
        dang[ind] && (dang[ind].innerHTML = "Đang nộp...")
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
            dang[ind] && (dang[ind].innerHTML = "Xem bài / Nộp lại")
             dang[ind] && (dang[ind].classList.add("none"))
              setChange(!change)
              const getData = async () => {
                const data = await axios.get(
                        `http://localhost:8080/thesis/thesisByUserId/${userNOW.id}`);
                        setUI(data.data.theses);
                         setNewUI(data.data.theses)
              };
              getData();
              getData();
            }).catch(e => console.log(e)) // Or Error in console
        }
    }
    return (
        <>
            <div className="users_wrapper">
                <h1>QUẢN LÝ KHÓA LUẬN</h1>
                <table className="theses_table thesesview_table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Học kì</th>
                            <th>Ngày tạo</th>
                            <th>Hạn đóng</th>
                            <th>Tên khóa luận</th>
                            <th>Khoa</th>
                            <th>Hội đồng</th>
                          
                          
                            <th>Tổng điểm</th>
                           
                        </tr>{" "}
                    </thead>{" "}
                    <tbody>
                        {newUI && newUI.map((u, index)=> {
                             const ngaytao = ([...u.createdDate].splice(8,2) +"/" + [...u.createdDate].splice(5,2) +"/"+[...u.createdDate].splice(0,4)).replaceAll(",","")
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
                            return (<tr key={u.id}>
                                <th>{u.id}</th>
                                <th>{hocki}</th>
                                <th>{([...u.createdDate].splice(8,2) +"/" + [...u.createdDate].splice(5,2) +"/"+[...u.createdDate].splice(0,4)).replaceAll(",","")}</th>
                                <th>{([...u.createdDate].splice(8,2) +"/" + [...u.createdDate].splice(5,2) +"/"+[...u.createdDate].splice(0,4)).replaceAll(",","")}</th>
                                <th>{u.name}</th>
                                <th>{u.faculty}</th>
                                <th>{u.council || "Chưa có"}</th>
                               
                                  
                                <th className="seenscore">{<><span>{u.totalScore && u.totalScore || "Chưa chấm"}</span> <i onClick={()=>AccepXemDiem(u, index)}><FontAwesomeIcon icon={faEye}/></i> </>|| "Chưa chấm"}</th>
                                
                            </tr>)
})}
                        
                    </tbody>{" "}

                </table>
                <div className="pheduyet" >
                    <h5>Chấp nhận duyệt bài sang hội đồng</h5>
                    <p>Giáo viên duyệt bài, bài sẽ được đưa đến hội đồng và không thể thu hồi lại</p>
                    <div>
                        <button onClick={()=> {
                                    document.querySelector(".pheduyet").classList.remove("active")
                                }} >Không duyệt</button>
                        <button onClick={()=> {
                          const getData = async () => {
                            await axios.put(
                             `http://localhost:8080/thesis/action/putCheck/${TS.id}`, {
                                 "tickCheck": "Check"
                             } 
                            );
                          };
                          getData();
                          document.querySelector(".pheduyet").classList.remove("active")
                          document.querySelector(".daduyet").innerHTML = "Đã duyệt"
                          document.querySelector(".daduyet").classList.add("duyet")
                        }}>Duyệt</button>
                        </div>
                </div>
                <div className="chamdiem">
                    <div className="chamdiem_top"><h5>Bảng chấm điểm tiêu chí</h5><b onClick={handleOutCD}>X</b></div>
                    <div className="chamdiem_info">
                        <span>Hội đồng chấm điểm: {c.name}</span> <br/>
                        <span>Tên khóa luận: {tsNOW.name}</span> <br/>
                        <span>Khoa: {tsNOW.faculty}</span>
                    </div>
                  
                    <div className="chamdiem_bottom">
                       {c.active && <>
                        <button className="suadiemBTN" onClick={()=>handleSuaDiem("SD")}><i><FontAwesomeIcon icon={faPenToSquare}/></i><span>Sửa điểm</span></button>
                        <button className="chamdiemBTN" onClick={()=>handleSuaDiem("CD")}><i><FontAwesomeIcon icon={faPenToSquare}/></i><span>Chấm điểm</span></button></>}
                       {c.active === false && <>
                        <button className="dongBTN"><i><FontAwesomeIcon icon={faPenToSquare}/></i><span>Đã đóng hội đồng</span></button>
                       </>}
                        <p>Điểm trung bình: <span className="DTBUI"></span></p>
                        {c.active === false && <>
                        <NavLink to={"/printPDF"} className="exBTN"><i onClick={""}><FontAwesomeIcon icon={faFileExport}/></i><span></span></NavLink >
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
                <div className="delete_users_modal">
                    <div className="delete_users_box">
                        <p> Xóa người dùng Huỳnh Trọng Phúc</p>
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
                            <span>
                                {" "}
                               {TS.name}
                            </span>
                        </p>
                        <p>
                            Khoa: <span>  {TS.faculty}</span>
                        </p>
                        <p>
                            Hội đồng: <span>{TS.council || "Chưa có"}</span>
                        </p>
                        <p>
                            Giảng viên{" "}
                        </p>
                        <ol className="so_giangvien flex">
                            {gv.map((g)=> ( <li key={g.id}>
                                {g.fullName } <span>{g.id === userNOW.id && "Tôi"}</span>
                            </li>))}
                        </ol>
                        <p>
                            Sinh viên{" "}
                        </p>{" "}
                        <ol className="so_sinhvien flex">
                        {sv.map((g)=> ( <li key={g.id}>
                                {`${g.fullName} | ${g.email}`}{" "}  <span>{g.id === userNOW.id && "Tôi"}</span>
                            </li>))}
                        </ol>
                        <div className="out_box">
                            <p onClick={handleCancle} className="cancleadd out">
                                Thoát
                            </p>
                            {TS.file && TS.tickCheck && (<p  className="dapheduyetbtn">
                                <span className="dangnopbai">Đã duyệt</span>
                                    {" "}   <FontAwesomeIcon icon={faCircleCheck} />
                                </p>)} {TS.file && !TS.tickCheck && (<button  className="daduyet" onClick={(e)=> {
                                    e.preventDefault()
                                    document.querySelector(".pheduyet").classList.add("active")
                        
                                }}>
                                    {" "}
                                    <span className="dangnopbai dapheduyet">Phê duyệt</span>
                                    <i className="pheduyeticon" >
                                    <FontAwesomeIcon icon={faCircleCheck} />
                                    </i>
                                </button>)}
                                {!TS.file  && (<p >
                                    <span className="chuanopbaicheck">Chưa nộp bài</span>
                                </p>)}
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

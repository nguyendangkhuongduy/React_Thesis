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
import Chart from '@toast-ui/chart';
import { ColumnLineChart ,NestedPieChart  } from "@toast-ui/chart";
import "@toast-ui/chart/dist/toastui-chart.min.css";
import axios from "axios";
import { useRef } from "react";
const Users = () => {
    const [render, setRender] = useState(false);
    const [fac, setFac] = useState([]);
    const [theses, setTheses] = useState([]);
    const [tsKhoa, setTsKhoa] = useState([]);
    const [dataName, setDataName] = useState([]);
    const [dataScore, setDataScore] = useState([]);
    const [tsps, setTsps] = useState([]);
    const [users, setUsers] = useState([]);
    const [circleData, setCircleData] = useState([]);
    const [circleAll, setCircleAll] = useState([]);
    const allRef = useRef()
    useEffect(()=>{
      (async () => {
          const data = await axios.get(
            "http://localhost:8080/users/actions/getStudents"
          );
          setUsers(data.data.users);
          console.log(data.data.users);
            const datas = await axios.get(
                    "http://localhost:8080/faculty"            );
           setFac(datas.data.faculties);
           const datass = await axios.get(
             "http://localhost:8080/thesis"
           );
           setTheses(datass.data.theses)
           const datasss = await axios.get(
             "http://localhost:8080/thesisPosition"
           );
           setTsps(datasss.data.thesisPosition)
        })()
     },[])
    useEffect(() => {
        const giangvien = document.querySelectorAll(".so_giangvien li");
        const giangvienBtn = document.querySelector(".giangvien_addbtn");
        const s = document.querySelector("select");
        giangvien.length === 2
            ? (giangvienBtn.style = "display:none") && setRender(true)
            : console.log(123);
            setTimeout(() => {
             allRef.current.click()
            }, 200);
    }, []);
   
    useEffect(()=>{
        const getData = async () => {
               const data = await axios.get(
                       "http://localhost:8080/faculty"            );
              setFac(data.data.faculties);
              const datas = await axios.get(
                "http://localhost:8080/thesis"
              );
              setTheses(datas.data.theses)
            };
             getData();
             
             const data = {
                categories: [],
                series: {
                  column: [
                    {
                      name: "Khóa luận",
                      data: dataScore
                    },
                  ],
                  line: [
                    {
                      name: "Trung bình",
                      data: dataScore
                    }
                  ]
                }
              };
              setTimeout(() => {
                const el = document.getElementById("chartWrap");
                const check = document.querySelectorAll(".toastui-chart-wrapper");
                console.log(check);
                let myArray = Array.from(check)
                myArray.forEach((a,i)=> {
                   if(i < myArray.length) {
                    a.remove()
                   }
                })
                const options = {
                    chart: {
                      title: "",
                      height: 300,
                      width: 450
                    }
                  };
                  const chart = new ColumnLineChart({ el, data, options });
             
                });
           
       },[dataName])
    useEffect(()=>{
        const getData = async () => {
               const data = await axios.get(
                       "http://localhost:8080/faculty"            );
              setFac(data.data.faculties);
              const datas = await axios.get(
                "http://localhost:8080/thesis"
              );
              setTheses(datas.data.theses)
            };
             getData();
             const data = {
              series: [
                {
                  name: 'versions',
                  data: [
                    {
                      name: 'Chưa có khóa luận',
                      data: (circleAll - circleData),
                    },
                    {
                      name: 'Đang trong khóa luận',
                      data: circleData,
                    }
                  ],
                },
              ]
            }
              setTimeout(() => {
                const el = document.getElementById("chartWrapCircle");
                // const check = document.querySelectorAll(".toastui-chart-wrapper");
                // console.log(check);
                // let myArray = Array.from(check)
                // myArray.forEach((a,i)=> {
                //    if(i < myArray.length) {
                //     a.remove()
                //    }
                // })
                
                const options = {
                    chart: {
                      title: "",
                      height: 300,
                      width: 450
                    },
                    theme: {
                      series: {
                        colors: ['#ccc', '#002551'],
                        lineWidth: 0,
                        strokeStyle: '#cccccc',
                      }
                    }
                  };
                  const chart = new NestedPieChart({el, data, options});
                 
                });
           
       },[dataName, circleData, circleAll])
const handleChangeKhoa = (e) => {
    if(e === "ALL") {
      const klIN = theses
      let NAME = []
      let SCORE = []
      klIN.forEach((kl)=> NAME = [...NAME, kl.name])
      klIN.forEach((kl)=> SCORE = [...SCORE, kl.totalScore])
      setDataName(NAME)
      setDataScore(SCORE)
      console.log(SCORE);
      let AID = []
  let TID = []
  const uIN = users
  uIN.forEach((u)=> AID = [...AID, u.id])
  const tsINKHOA = theses
  tsINKHOA.forEach((t)=> TID = [...TID, t.id])
  console.log(TID);
  const tspsKhoa = tsps.filter((t)=> TID.indexOf(t.thesisId) !== -1)
 const uINTS = tspsKhoa.filter((i)=> i.name !== "Giang Vien")
 setCircleData(uINTS.length);
 setCircleAll(uIN.length);
    }else {
        if(e.target.value === "ALL") {
            const klIN = theses
            let NAME = []
            let SCORE = []
            klIN.forEach((kl)=> NAME = [...NAME, kl.name])
            klIN.forEach((kl)=> SCORE = [...SCORE, kl.totalScore])
            setDataName(NAME)
            setDataScore(SCORE)
            console.log(SCORE);
            let AID = []
        let TID = []
        const uIN = users
        uIN.forEach((u)=> AID = [...AID, u.id])
        const tsINKHOA = theses
        tsINKHOA.forEach((t)=> TID = [...TID, t.id])
        console.log(TID);
        const tspsKhoa = tsps.filter((t)=> TID.indexOf(t.thesisId) !== -1)
       const uINTS = tspsKhoa.filter((i)=> i.name !== "Giang Vien")
       setCircleData(uINTS.length);
       setCircleAll(uIN.length);
        } else {
        const klIN = theses.filter((t)=> t.faculty === e.target.value)
        let NAME = []
        let SCORE = []
        klIN.forEach((kl)=> NAME = [...NAME, kl.name])
        klIN.forEach((kl)=> SCORE = [...SCORE, kl.totalScore])
        setDataName(NAME)
        setDataScore(SCORE)
        let AID = []
        let TID = []
        const uIN = users.filter((t)=> t.faculty === e.target.value)
        uIN.forEach((u)=> AID = [...AID, u.id])
        const tsINKHOA = theses.filter((t)=> t.faculty === e.target.value)
        tsINKHOA.forEach((t)=> TID = [...TID, t.id])
        console.log(TID);
        const tspsKhoa = tsps.filter((t)=> TID.indexOf(t.thesisId) !== -1)
       const uINTS = tspsKhoa.filter((i)=> i.name !== "Giang Vien")
       setCircleData(uINTS.length);
       setCircleAll(uIN.length);
        // 
        }
    }
    
    
}
    return (
        <>
            <div className="users_wrapper thongke" >
            <h1 className="title_thongke">BIỂU ĐỒ THỐNG KÊ ĐIỂM KHÓA LUẬN
            <select onChange={handleChangeKhoa}>
                <option  value="" hidden selected>Tất cả</option>
                <option  value="ALL" ref={allRef} onClick={()=> handleChangeKhoa("ALL")}>Tất cả</option>
                {fac.map((f)=> (<option key={f.name} value={f.name}>{f.name}</option>))}
               </select>
            </h1>
            
               <div>
               <div id="chartWrap" >
               </div>
               <i className="chart_name1">Biểu đồ điểm khóa luận theo các khoa</i>
               </div>
              <div> <div id="chartWrapCircle">
               </div>
               <i className="chart_name2">Biểu đồ sinh viên đang tham gia khóa luận theo các khoa</i></div>

            </div>
        </>
    );
};

export default Users;

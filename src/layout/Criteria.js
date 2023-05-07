import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {
    faCirclePlus,
    faCircleXmark,
    faPenToSquare,
    faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../scss/ComponentsStyle/Users.scss";
import { useState, useEffect } from "react";
import axios from "axios";
const Users = () => {
const [fac,setFac]= useState([])
const [id,setId]= useState("")
useEffect(()=>{
        const getData = async () => {
               const data = await axios.get(
            "http://localhost:8080/criteria"    
               );
              setFac(data.data.criteria);
             };
             getData();
       },[])
const check = document.querySelector(".check_khoa")
const name = document.querySelector("#fullname")
const them = document.querySelector(".alert_wrap.them")
const xoa = document.querySelector(".alert_wrap.xoa")
const themDiv = document.querySelector(".alert_wrap.them div")
const xoaDiv = document.querySelector(".alert_wrap.xoa div")
const handleChange =  () => {
    check.classList.remove("active")

}
const handleAddFac = (e) => {
    e.preventDefault()
  
    const newData = {
        "name": name.value
    }
    themDiv.innerHTML = `Thêm tiêu chí ${name.value} thành công`
    const haveName = fac.filter((f)=> f.name.toLowerCase() === name.value.trim().toLowerCase())
    if(haveName.length > 0) {
       
        check.classList.add("active")
    } else {
        const getData = async () => {
            await axios.post(
                   "http://localhost:8080/criteria" , newData);
                   const datas = await axios.get(
                       "http://localhost:8080/criteria"            );
               setFac(datas.data.criteria);
         };
         getData();
         handleCancle()
         them.classList.add("active")
         setTimeout(()=> {
            them.classList.remove("active")
         },1500)
    }
   
}

const handleDeleteAPI = () => {
    xoaDiv.innerHTML = `Đã xóa tiêu chí ${id.name}`
    console.log(id);
    (async () => {
     await axios.delete(
               `http://localhost:8080/criteria/${id.id}`);
     })()
    const newFacs = fac.filter((i)=> i.id !== id.id)
    setFac(newFacs)
    handleCancle()
    xoa.classList.add("active")
    setTimeout(()=> {
       xoa.classList.remove("active")
    },1500)
}




























    const handleAdd = () => {
        const addModal = document.querySelector(".add_users_modal");
        addModal.classList.add("active");
    };
    const handleDelete = (f) => {
        const deleteModal = document.querySelector(".delete_users_modal");
        deleteModal.classList.add("active");
        setId(f)
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
    return (
        <>
            <div className="users_wrapper">
                <h1>QUẢN LÝ TIÊU CHÍ</h1>
                <table className="faculties_table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>TÊN TIÊU CHÍ</th>
                            <th>
                                <button></button>
                            </th>
                        </tr>{" "}
                    </thead>{" "}
                    <tbody>
                        {fac.map((f,i)=>{
                           return <tr key={i}>
                            <th>{f.id}</th>
                            <th>{f.name}</th>
                            <th>
                                <button>
                                    <span></span>
                                    <i onClick={()=>handleDelete(f)}>
                                        {" "}
                                        <FontAwesomeIcon icon={faCircleXmark} />
                                    </i>
                                </button>
                            </th>
                        </tr>
                        })}
                        {" "}
                    </tbody>{" "}
                </table>
                <div className="add_users">
                    <div></div>
                    <div>
                        {" "}
                        <button>
                            Tổng:<span>{fac.length}</span>
                        </button>{" "}
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
                        <p>
                            Xóa tiêu chí <span>{id.name}</span>
                        </p>
                        <div>
                            <button onClick={handleCancle}>Không xóa</button>
                            <button onClick={handleDeleteAPI}>Xóa</button>
                        </div>
                    </div>
                </div>
                <div className="add_users_modal">
                    <form>
                        <h5>Thêm tiêu chí</h5>
                        <input 
                        onChange={handleChange}
                        required placeholder="Tên Tiêu Chí" id="fullname" />
                        <p className="check_khoa">Tên tiêu chí bị trùng</p>
                        <div>
                            <p onClick={handleCancle} className="cancleadd">
                                Hủy thêm
                            </p>
                            <button onClick={handleAddFac} type="submit">Xác nhận thêm</button>
                        </div>
                    </form>
                </div>
                <div className="edit_users_modal">
                    <form>
                        <h5>CHỈNH SỬA NGƯỜI DÙNG</h5>
                        <input required placeholder="Họ và tên" id="fullnames" />
                        <input required placeholder="Tài khoản" id="username" />
                        <input required placeholder="Email" id="email" />
                        <input
                            required
                            placeholder="Số điện thoại"
                            id="phone"
                            type="number"
                        />
                        <input required placeholder="Khoa" id="khoa" />
                        <div>
                            <p onClick={handleCancle} className="cancleadd">
                                Hủy
                            </p>
                            <button type="submit">Xác nhận sửa</button>
                        </div>
                    </form>
                </div>
                <div className="alert_wrap them">
                    <div>Thêm thành công</div>
                </div>
                <div className="alert_wrap xoa">
                    <div className="xoa_user"></div>
                </div>
            </div>
        </>
    );
};

export default Users;

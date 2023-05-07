import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Moment from 'moment';
import {
    faCirclePlus,
    faCircleXmark,
    faPenToSquare,
    faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../scss/ComponentsStyle/Users.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import * as xlsx from 'xlsx';
const Users = () => {
    const [users,setUsers] = useState([])
    const [userTable,setUserTable] = useState([])
    const [fac,setFac] = useState([])
    const [isSubmit,setIsSubmit] = useState(false)
    const [userEdit,setUserEdit] = useState(users[0] || "")
    // get Data
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
        setUserTable(users)
    },[users])
    useEffect(()=>{
     const getData = async () => {
            const data = await axios.get(
                    "http://localhost:8080/faculty"            );
           setFac(data.data.faculties);
          };
          getData();
    },[])
    useEffect(()=>{
        const sexEdits = document.querySelectorAll("input[name='sexEdit']")
        userEdit.xyz === "Nam" && (sexEdits[0].checked = true)
        userEdit.xyz === "Nữ" && (sexEdits[1].checked = true)
    },[userEdit]);
    let fullnameIp = userEdit.fullName
    let emailIp = userEdit.email
    let phoneIp = userEdit.phone
    let genderIp = userEdit.xyz
    let rolesIp = ""
    let userNameIp = userEdit.username
    let rolesNotIp = userEdit.roles
    const handleNameC = (e) => {
        return fullnameIp =  e.target.value;
      }
    const handleEmailC = (e) => {
        return emailIp =  e.target.value;
      }
    const handlePhoneC = (e) => {
        return phoneIp =  e.target.value.toString();
      }
    const handleGenderC = (e) => {
        return genderIp =  e.target.value;
      }
    const handleRolesC = (e) => {
        console.log(e.target.value);
        return rolesIp =  e.target.value;
        
      }
    const handleUserNameC = (e) => {
        return userNameIp =  e.target.value;
      }
    const handleSubmitEdit = (e) => {
        e.preventDefault()
        const sexEdits = document.querySelectorAll("input[name='sexEdit']")
        sexEdits[0].checked === true ?  (genderIp = "Nam") :  (genderIp = "Nữ");
        const selected = document.querySelector("#rolesID").value
        console.log(selected);
        if(!selected) {
            console.log("vo day");
            rolesIp = userEdit.roles[0]
            console.log(rolesIp);
        } 
        const updateUser = {
            "email": emailIp ,
            "username": userNameIp ,
            "fullName": fullnameIp,
            "phone": phoneIp,
            "gender": genderIp,
            "roles": [rolesIp]
        }
        const usernameEdit = document.querySelector("#usernameEdit").value.trim()
        const emailEdit = document.querySelector("#emailEdit").value.trim()
        const phoneEdit = document.querySelector("#phoneEdit").value.trim() 
        const checkUserName = users.find((item) => item.username === usernameEdit )
        const checkEmail = users.find((item) => item.email === emailEdit )
        const checkPhone = users.find((item) => item.phone === phoneEdit )
        if(checkUserName) alert("Tài khoản đã có người sử dụng")
        if(checkEmail) alert("Email đã có người sử dụng")
        if(checkPhone) alert("Số điện thoại đã có người sử dụng")
        if(!checkUserName &&  !checkEmail && !checkPhone ) {
            const getDasta = async () => {
                await axios.put(
                  `http://localhost:8080/users/${userEdit.id}`,updateUser
                );
                let newData 
                const data = await axios.get(
                    "http://localhost:8080/users"
                  );
                  await (newData = data.data.users)
                  handleCancle()
                  const alert = document.querySelector(".alert_wrap.capnhat")
             alert.classList.add("active")
             setTimeout(() => {
                 alert.classList.remove("active")
             }, 1500);
                  return setUsers(newData)
              };
              getDasta();
                 handleCancle()
              

        }
            
    }
 
    const handleCancle = () => {
        const addModal = document.querySelector(".add_users_modal");
        const deleteModal = document.querySelector(".delete_users_modal");
        const eidtModal = document.querySelector(".edit_users_modal");
        addModal.classList.remove("active");
        eidtModal.classList.remove("active");
        deleteModal.classList.remove("active");
        const spans = document.querySelectorAll(
            ".add_users_modal form > span > span"
        );
        console.log(spans);
        spans.forEach((span) => {
            span.style = "display:none";
        });
    };
    const handleAdd = () => {
        const addModal = document.querySelector(".add_users_modal");
        addModal.classList.add("active");
    };
    const handleDelete = (user) => {
        const deleteModal = document.querySelector(".delete_users_modal");
        deleteModal.classList.add("active");
        const userEditID = users.filter((item)=> item.id === user.id )
        console.log(userEditID[0]);
       setUserEdit(userEditID[0])
        // setUserEdit(users[ID-1])
        // console.log(users.filter((user)=> user.id !== userEdit.id),"aaa");
    };
    const handleEdit = (user) => {
        const eidtModal = document.querySelector(".edit_users_modal");
        eidtModal.classList.add("active");
            console.log(user.id);
           const userEditID = users.filter((item)=> item.id === user.id )
           console.log(userEditID[0]);
          setUserEdit(userEditID[0])
          console.log(userEdit.xyz =="Nam");
    };
    const handleChoose  = (e) =>{
        const This = e.target
        This.nextSibling.style = "display: none !important"
    }
    const handleSubmitAdd = (e) => {
        e.preventDefault();
        const inputs = document.querySelectorAll(
            ".add_users_modal form > span > input"
        );
        const span = document.querySelectorAll(
            ".add_users_modal form > span > input + span"
        );
        inputs.forEach((input, index) => {
            if (!input.value) {
                span[index].style = "display:block";
            } else {
                return false;
            }
        });
        const fullnameAdd = document.querySelector("#fullnameAdd").value
        const usernameAdd = document.querySelector("#usernameAdd").value
        const passwordAdd = document.querySelector("#passwordAdd").value 
        const emailAdd = document.querySelector("#emailAdd").value
        const vaitroAdd = document.querySelector("#vaitroAdd").value
        const phoneAdd = document.querySelector("#phoneAdd").value 
        const khoaAdd = document.querySelector("#khoaAdd").value
        const optionChecked = document.querySelectorAll("#khoaAdd option")
        const sexAddIps = document.querySelectorAll("input[name='genderAdd']")
        const pRequired = document.querySelectorAll(".required_wrap p");
        vaitroAdd.length < 1 && (pRequired[0].style = "display:block !important");
        phoneAdd.length < 1 && (pRequired[1].style = "display:block !important");
        khoaAdd.length < 1 && (pRequired[2].style = "display:block !important");
        let sex = "Nam"
        if(!sexAddIps[0].checked) {
              sex = "Nữ"
        }
        const checkUserName = users.find((item) => item.username === usernameAdd )
        const checkEmail = users.find((item) => item.email === emailAdd )
        const checkPhone = users.find((item) => item.phone === phoneAdd )
        if(checkUserName) alert("Tài khoản đã có người sử dụng")
        if(checkEmail) alert("Email đã có người sử dụng")
        if(checkPhone) alert("Số điện thoại đã có người sử dụng")
        const addUser = {
            "email": emailAdd ,
            "username": usernameAdd ,
            "fullName": fullnameAdd,
            "phone": phoneAdd,
            "password":passwordAdd,
            "xyz": sex,
            "roles": [vaitroAdd],
            "facultyId": khoaAdd*1,
        }
       
        if(!checkUserName && !checkEmail && !checkPhone && fullnameAdd.length && usernameAdd.length && passwordAdd.length && emailAdd.length && vaitroAdd.length && phoneAdd.length && khoaAdd.length && sexAddIps.length) {
           console.log("vo day");
            const getDasta = async () => {
                await axios.post(
                  `http://localhost:8080/users`,addUser
                );
              let newID 
                const data = await axios.get(
                    "http://localhost:8080/users"
                  );
                  await (newID = data.data.users)
                  console.log(newID[newID.length - 1]);
                  handleCancle()
                  return setUsers((prev) => [...prev, newID[newID.length-1]])
              };
              getDasta();
             
                const alert = document.querySelector(".alert_wrap.them")
                alert.classList.add("active")
                setTimeout(() => {
                    alert.classList.remove("active")
                }, 1500);
                document.querySelector(".add_users_modal form").reset()
              
        }
    };
    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
      }
      
      function formatDate(date) {
        return [
          padTo2Digits(date.getDate()),
          padTo2Digits(date.getMonth() + 1),
          date.getFullYear(),
        ].join('/');
      }
      
      // 👇️ 24/10/2021 (mm/dd/yyyy)
    const handleDeleteUser = () => {
        console.log(userEdit.id);
        const getDasta = async () => {
            await axios.delete(
              `http://localhost:8080/users/${userEdit.id}`
            );
          };
          getDasta();
          const deleteModal = document.querySelector(".delete_users_modal");
        deleteModal.classList.remove("active");
        const alert = document.querySelector(".alert_wrap.xoa")
        const xoaUser = document.querySelector(".xoa_user")
        xoaUser.innerText = `Đã xóa người dùng ${userEdit.fullName}`
                alert.classList.add("active")
                setTimeout(() => {
                    alert.classList.remove("active")
                }, 1500);

       return setUsers(users.filter((user)=> user.id !== userEdit.id))
       
    }
    const handleSearchChange = () => {
        const searchIp = document.querySelector(".search").value
        searchIp.length === 0 &&  setUserTable(users)
    }

    const handleSearch = () =>{
        const searchIp = document.querySelector(".search").value.toLowerCase().trim()
        const searchBTN = document.querySelector(".search_btn")
        const findUserName = users.filter((user)=> user.username.toLowerCase().indexOf(searchIp) > -1)
        const findEmail = users.filter((user)=> user.email.toLowerCase().indexOf(searchIp) > -1)
        const findName = users.filter((user)=> user.fullName.toLowerCase().indexOf(searchIp) > -1)
        const dataFilter = [...findUserName,...findEmail,...findName]
        let dataRender = []
        dataFilter.forEach((user) => {
            dataRender.indexOf(user) === -1  && (dataRender = [...dataRender,user])
            return dataRender.sort((a, b)=>  a.id - b.id);
        })
        console.log(dataRender);
        setUserTable(dataRender)

    }
    const notFilter = (e) => {
        const btnActive = document.querySelector(".filter_btn.active")
        const btns = document.querySelectorAll(".filter_btn")
        btnActive.classList.remove("active")
        btns[0].classList.add("active")
        setUserTable(users)
    }
    const filterGiaovu = (e) => {
        const btnActive = document.querySelector(".filter_btn.active")
        const btns = document.querySelectorAll(".filter_btn")
        btnActive.classList.remove("active")
        btns[1].classList.add("active")
       setUserTable(users.filter((user)=> user.roles[0] == "ROLE_MANAGER"))
    }
    const filterGiangvien = (e) => {
         const btnActive = document.querySelector(".filter_btn.active")
         const btns = document.querySelectorAll(".filter_btn")
        btnActive.classList.remove("active")
        btns[2].classList.add("active")
        setUserTable(users.filter((user)=> user.roles[0] == "ROLE_ASSOCIATE"))
    }
    const filterSinhvien = (e) => {
         const btnActive = document.querySelector(".filter_btn.active")
         const btns = document.querySelectorAll(".filter_btn")
        btnActive.classList.remove("active")
        btns[3].classList.add("active")
        setUserTable(users.filter((user)=> user.roles[0] == "ROLE_STUDENT"))

    }
    const handleEnter = (e) => {
        const searchBTN = document.querySelector(".search_btn")
       if(e.which === 13) {
        searchBTN.click()
       }
    }
    const readUploadFile = (e) => {
        e.preventDefault();
      
        if (e.target.files) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target.result;
                const workbook = xlsx.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = xlsx.utils.sheet_to_json(worksheet);
            
                json.map((item,index)=> {
                   
                    if(item.KLTN === "Co" && item.DIEM_DAN >= 8 && item.NO_MON <=1 && item.DIEM_TBTN
 >= 2.5 && item.DONG_Y_TU_GVHD =="Co"                    ) {
    const addUser = {
        "email": item.EMAIL ,
        "username": item.MSSV ,
        "fullName": item.HO_TEN,
        "phone": item.SDT,
        "password":item.MSSV,
        "xyz": item.GIOI_TINH,
        "roles": ["ROLE_STUDENT"],
        "facultyId": (item.MA_KHOA)*1,
    }
    const getDasta = async () => {
        await axios.post(
          `http://localhost:8080/users`,addUser
        );
        
      };
    getDasta();
   
                  } 
                 
                   
                })
            };
            reader.readAsArrayBuffer(e.target.files[0]);
            setTimeout(()=>{
                alert("Đã cập nhật người dùng")
                window.location.reload()
         },2000)
        }
    }
    return (
        <>
            <div className="users_wrapper">
                <h1>QUẢN LÝ NGƯỜI DÙNG</h1>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Họ và tên</th>
                            <th>Tài khoản</th>
                            <th>Giới tính</th>
                            <th>Số điện thoại</th>
                            <th>Email</th>
                            <th>Ngày tạo</th>
                            <th>Vai trò</th>
                            <th>Khoa</th>
                            <th>
                                <button></button>
                            </th>
                        </tr>{" "}
                    </thead>{" "}
                    <tbody>
                       
                        {userTable.map((user,index)=>{
                            return (
                                <tr key = {user.id}>
                                <th>{user.id}</th>
                                <th>{user.fullName}</th>
                                <th>{user.username}</th>
                                <th>{user.xyz}</th>
                                <th>{user.phone}</th>
                                <th>{user.email}</th>
                                <th> {user.createdDate === "NOW" ? (formatDate(new Date())) :([...user.createdDate].splice(8,2) +"/" + [...user.createdDate].splice(5,2) +"/"+[...user.createdDate].splice(0,4)).replaceAll(",","")}</th>
                                <th>{user.roles[0] === "ROLE_ADMIN" && "Admin" || user.roles[0] === "ROLE_MANAGER" && "Giáo vụ" || user.roles[0] === "ROLE_STUDENT" && "Sinh viên"||user.roles[0] === "ROLE_ASSOCIATE" && "Giảng viên" }</th>
                                <th>{user.roles[0] === "ROLE_ADMIN" && " " || user.faculty}</th>
                                <th>
                                    <button>
                                        {" "}
                                        {user.roles[0] !== "ROLE_ADMIN" && (  <><i onClick={()=>handleEdit(user)}>
                                            <FontAwesomeIcon icon={faPenToSquare} />
                                        </i>
                                         <i onClick={()=>handleDelete(user)}>
                                         {" "}
                                         <FontAwesomeIcon icon={faCircleXmark} />
                                     </i></>)}
                                    </button>
                                </th>
                            </tr>
                            )
                        })}
                    </tbody>{" "}
                </table>
                <div className="add_users">
                    <div>
                        <input
                            className="search"
                            onKeyDown={handleEnter}
                            placeholder="Nhập tên tìm kiếm"
                            onChange={handleSearchChange}
                        ></input>
                        <i className="search_btn" onClick={handleSearch}>
                            <FontAwesomeIcon icon={faSearch} />
                        </i>
                    </div>
                    <div>
                        {" "}
                        <form>
    <label htmlFor="upload">Upload File</label>
    <input
        type="file"
        name="upload"
        id="upload"
        onChange={readUploadFile}
    />
</form>
                        <button className="filter_btn active" onClick={notFilter}>
                            Tổng:<span> {users.length}</span>
                        </button>{" "}
                        <button  className="filter_btn" onClick={filterGiaovu}>
                            Giáo vụ: <span>{(users.filter((user)=> user.roles[0] == "ROLE_MANAGER")).length}</span>
                        </button>{" "}
                        <button className="filter_btn" onClick={filterGiangvien}>
                            Giảng viên: <span>{(users.filter((user)=> user.roles[0] == "ROLE_ASSOCIATE")).length}</span>
                        </button>{" "}
                        <button className="filter_btn" onClick={filterSinhvien}>
                            Sinh viên: <span>{(users.filter((user)=> user.roles[0] == "ROLE_STUDENT")).length}</span>
                        </button>
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
                        <p>Xóa người dùng {userEdit.fullName}</p>
                        <div>
                            <button onClick={handleCancle}>Không xóa</button>
                            <button onClick={handleDeleteUser}>Xóa</button>
                        </div>
                    </div>
                </div>
                <div className="add_users_modal">
                    <form>
                        <h5>Thêm người dùng</h5>
                        <span>
                            <input placeholder="Họ và tên" id="fullnameAdd" />
                            <span>Vui lòng nhập tên</span>
                          
                        </span>
                        <span>
                            {" "}
                            <input placeholder="Tài khoản" id="usernameAdd" />
                            <span>Vui lòng nhập tài khoản</span>
                          
                        </span>
                        <span>
                            {" "}
                            <input
                                type="password"
                                placeholder="Mật khẩu"
                                id="passwordAdd"
                            />
                            <span>Vui lòng nhập mật khẩu</span>
                        </span>
                        <span>
                            <input placeholder="Email" id="emailAdd"  type="email"/>
                            <span>Vui lòng nhập Email</span>
                       
                        </span>
                        {/* <span>
                            <input placeholder="Ngày sinh" id="birthday" />
                            <span>Vui lòng nhập ngày sinh dd/mm/yyyy</span>
                        </span> */}
                        <div className="sex" id = "sexAdd">
                            <label>Giới tính</label>
                            <label>
                                <input
                                    type="radio"
                                    name="genderAdd"
                                    value="Nam"
                                    checked
                                    // checked={newUser.xyz === "male"}
                                    // onChange={handleChange}
                                />
                                <p>Nam</p>
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="genderAdd"
                                    value="Nữ"
                                    // checked={newUser.xyz === "female"}
                                    // onChange={handleChange}
                                />
                                <p>Nữ</p>
                            </label>
                        </div>
                        <div>
                            <div className="required_wrap">
                            <select required id="vaitroAdd" className="selectAddRequired" onChange={handleChoose}>
                                <option value="" disabled selected hidden>
                                    Chọn vai trò
                                </option>
                                <option value="ROLE_MANAGER">Giáo vụ</option>
                                <option value="ROLE_ASSOCIATE">Giảng viên</option>
                                <option value="ROLE_STUDENT">Sinh viên</option>
                            </select>
                            <p>Vui lòng chọn vai trò</p>
                            </div>
                            <div className="required_wrap">
                            <input onChange={handleChoose}
                                 required
                                placeholder="Số điện thoại"
                                id="phoneAdd"
                                type="number"
                            />
                             <p>Vui lòng nhập SĐT</p>
                            </div>
                        </div>
                       
                     <div>
                      <div  className="required_wrap">
                      <select id="khoaAdd" className="selectAddRequired" required onChange={handleChoose}>
                        <option value="" hidden>Chọn khoa</option>
                       {fac.map((item,index)=>{
                        return <option key={index} value={item.id}>{item.name}</option>
                       })}
                        </select>
                        <p>Vui lòng chọn khoa</p>
                      </div>
                     </div>
                        
                        <div>
                            <p onClick={handleCancle} className="cancleadd">
                                Hủy thêm
                            </p>
                            <button
                                onClick={(e) => handleSubmitAdd(e)}
                                type="submit"
                            >
                                Xác nhận thêm
                            </button>
                        </div>
                    </form>
                </div>
                <div className="edit_users_modal chinhsua">
                    {userEdit && (<form>
                        <h5>CHỈNH SỬA NGƯỜI DÙNG</h5>
                        <p>Họ và tên</p>
                        <input placeholder={userEdit.fullName} id="fullnameEdit"  onChange={handleNameC} />
                        <p>Tài khoản</p>
                        <input placeholder={userEdit.username}  id="usernameEdit"  onChange={handleUserNameC}  />
                        <p>Email</p>
                        <input placeholder={userEdit.email} id="emailEdit"  onChange={handleEmailC} />
                        <p>Số điện thoại</p>
                        <input 
                            placeholder={userEdit.phone}
                            id="phoneEdit"
                            type="number"  onChange={handlePhoneC} 
                        />
                        <div className="edit_lastDIV">
                            <div>Giới tính:</div>
                            <label><input type="radio" name="sexEdit" value="Nam"/><p>Nam</p></label>
                            <label><input type="radio" name="sexEdit" value="Nữ" /><p>Nữ</p></label>
                        <select id="rolesID" onChange={handleRolesC} >
                            <option value=""  hidden>{userEdit.roles[0] === "ROLE_MANAGER" && "Giáo vụ" || userEdit.roles[0] === "ROLE_STUDENT" && "Sinh viên"||userEdit.roles[0] === "ROLE_ASSOCIATE" && "Giảng viên"}</option>
                            <option value="ROLE_MANAGER">Giáo vụ</option>
                            <option value="ROLE_ASSOCIATE">Giảng viên</option>
                            <option value="ROLE_STUDENT">Sinh viên</option>
                        </select>
                        </div>
                        
                        
                        <div>
                            <p onClick={handleCancle} className="cancleadd">
                                Hủy
                            </p>
                            <button id="submit_btn" onClick={(e)=>handleSubmitEdit(e,userEdit)}>Xác nhận sửa</button>
                        </div>
                    </form>)}
                </div>
                <div className="alert_wrap them">
                    <div>Thêm thành công</div>
                </div>
                <div className="alert_wrap capnhat">
                    <div>Cập nhật thành công</div>
                </div>
                <div className="alert_wrap xoa">
                    <div className="xoa_user"></div>
                </div>
            </div>
        </>
    );
};

export default Users;

import "../css/Login.scss";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleChangeUsername = (event) => {
        setUsername(event.target.value);
    };

    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const user = {
            username: username,
            password: password,
        };
        localStorage.setItem("LocalData", password)

        if (user.username && user.password) {
            axios
                .post(`http://localhost:8080/api/auth/signin`, user)
                .then((response) => {
                    if (response.data.active) {
                        localStorage.setItem(
                            "token-data",
                            JSON.stringify(response)
                        );
                    } else {
                        alert("Tài khoản của bạn đã bị vô hiệu hóa bởi ADMIN")
                    }

                    const from = location.pathname || "/";
                    navigate(from, { replace: true });
                    // reload the page because above navigate call did not do that
                    navigate(0);
                }, this)
                .catch((error) => alert("Vui lòng kiểm tra lại Tên tài khoản hoặc Mật khẩu!")); //FIXME we should show the alert message inside the form
        }
    };

    return (
        <>
            <div className="Auth-form-container">
                <form className="Auth-form" onSubmit={handleSubmit}>
                    <div className="Auth-form-content">
                        <h3 style={{textAlign: "center", fontSize:"30px"}}>Đăng nhập</h3>
                        <div className="form-group mt-3">
                            <label>Tên tài khoản</label>
                            <input
                                type="text"
                                className="form-control mt-1"
                                placeholder=""
                                name="username"
                                onChange={handleChangeUsername}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Mật khẩu</label>
                            <input
                                type="password"
                                className="form-control mt-1"
                                placeholder=""
                                name="password"
                                onChange={handleChangePassword}
                            />
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button type="submit" className="btn btn-primary">
                                Đăng nhập
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Login;

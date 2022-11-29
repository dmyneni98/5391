import React from 'react';
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {AuthContext, AuthContextProvider} from "../../context/AuthContext";
import "./LoginInfo.css";
import Login from '../../pages/login/Login';

const LoginInfo = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);
   
  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    //dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("http://localhost:8800/api/auth/login", credentials);
      //dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      console.log(res.data.details);
      localStorage.setItem("user",res.data.details.username)
      localStorage.setItem("userid",res.data.details._id)
      navigate("/")
    } catch (err) {
      //dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };


  return (
    <div className="loginContainer">
      <div className="loginWrapper">
         <form className="loginform" >
          <div className="loginTitle">Sign in</div>
          <input className="loginInput" type="text" placeholder="username" id="username" name="username" onChange={handleChange}/>
          <input className="loginInput"type="password" placeholder="Password" id="password" name="password" onChange={handleChange}/>
          <button className="loginButton" type="button" onClick={handleClick}>Login</button>
      </form>
      {error && <span align="center">{error.message}</span>}
      </div>
    </div>
  );
};

export default LoginInfo;

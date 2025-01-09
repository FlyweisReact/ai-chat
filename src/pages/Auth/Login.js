/** @format */

import React, { useState } from "react";
import style from "../../css/login.module.css";
import { apple_icon, google_icon, logo, outlook_icon } from "../../asset";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postApiWithRedux } from "../../Api/Api";
import endPoints from "../../Api/apiConfig";
import { LOGIN } from "../../store/authSlice";
import { ClipLoader } from "react-spinners";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const payload = {
    email,
    password,
  };

  const LoginHandler = (e) => {
    e.preventDefault();
    dispatch(
      postApiWithRedux(endPoints.auth.login, payload, {
        setLoading,
        successMsg: "Welcome! You’ve successfully logged in.",
        errorMsg: "Login failed. Please check your credentials and try again.",
        dispatchFunc: [(res) => LOGIN(res)],
        additionalFunctions: [() => navigate("/chat-bot")],
      })
    );
  };

  return (
    <section className={style.page_container}>
      <div className={style.logo_container}>
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>

      <div className={style.content}>
        <form className={style.glass_effect} onSubmit={LoginHandler}>
          <h1 className={style.headline}>Welcome Back!</h1>

          <div className={style.input_group}>
            <label>Email or Phone Number</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={style.input_group}>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className={style.forget_password}>
            <p>Forgot Password ?</p>
          </div>

          <button className={style.submit_btn} type="submit">
            {loading ? <ClipLoader color="#fff" /> : "Continue"}
          </button>

          <p className={style.or}>Or Login With</p>

          <div className={style.more_options}>
            <img src={google_icon} alt="" />
            <img src={apple_icon} alt="" />
            <img src={outlook_icon} alt="" />
          </div>

          <Link className={style.register_link} to={"/signup"}>
            Don't have an account? <span>Sign up</span>
          </Link>
        </form>
      </div>
    </section>
  );
};

export default Login;

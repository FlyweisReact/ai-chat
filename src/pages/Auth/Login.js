/** @format */

import React, { useState } from "react";
import css from "../../css/login.module.css";
import { logo } from "../../asset";
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
    <section className={css.page_container}>
      <div className={css.logo_container}>
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>

      <form className={css.form_container} onSubmit={LoginHandler}>
        <h1 className={css.headline}>Welcome back</h1>

        <div className={css.input_group}>
          <input
            type="text"
            required
            spellCheck="false"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Email address</label>
        </div>

        <div className={css.input_group}>
          <input
            type="password"
            required
            spellCheck="false"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <label>Password</label>
        </div>

        <button className={css.submitBtn} type="submit">
          {loading ? <ClipLoader color="#fff" /> : "Continue"}
        </button>

        <Link className={css.register_link} to={"/signup"}>
          Don't have an account? <span>Sign up</span>
        </Link>
      </form>
    </section>
  );
};

export default Login;

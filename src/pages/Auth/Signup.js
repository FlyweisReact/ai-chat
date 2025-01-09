/** @format */

import React, { useState } from "react";
import style from "../../css/login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { postApi } from "../../Api/Api";
import { ClipLoader } from "react-spinners";
import endPoints from "../../Api/apiConfig";
import { apple_icon, google_icon, outlook_icon, logo } from "../../asset";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const payload = {
    email,
    password,
  };

  const createUser = (e) => {
    e.preventDefault();
    postApi(endPoints.auth.signup, payload, {
      setLoading,
      successMsg: "Account created successfully !",
      additionalFunctions: [() => navigate("/login")],
    });
  };

  return (
    <section className={style.page_container}>
      <div className={style.logo_container}>
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>

      <div className={style.content}>
        <form className={style.glass_effect} onSubmit={createUser}>
          <h1 className={style.headline}>Create Your Account</h1>

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

          <button className={style.submit_btn} type="submit">
            {loading ? <ClipLoader color="#fff" /> : "Sign up"}
          </button>

          <p className={style.or}>Or Login With</p>

          <div className={style.more_options}>
            <img src={google_icon} alt="" />
            <img src={apple_icon} alt="" />
            <img src={outlook_icon} alt="" />
          </div>

          <Link className={style.register_link} to={"/login"}>
            Already have an account ? <span>Sign in</span>
          </Link>
        </form>
      </div>
    </section>
  );
};

export default Signup;

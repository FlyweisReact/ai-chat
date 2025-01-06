/** @format */

import React, { useState } from "react";
import css from "../../css/login.module.css";
import { logo } from "../../asset";
import { Link, useNavigate } from "react-router-dom";
import { postApi } from "../../Api/Api";
import { ClipLoader } from "react-spinners";
import endPoints from "../../Api/apiConfig";

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
    <section className={css.page_container}>
      <div className={css.logo_container}>
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>

      <form className={css.form_container} onSubmit={createUser}>
        <h1 className={css.headline}>Create an account</h1>

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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Password</label>
        </div>

        <button className={css.submitBtn} type="submit">
          {loading ? <ClipLoader color="#fff" /> : "Continue"}
        </button>

        <Link className={css.register_link} to={"/login"}>
          Already have an account? <span>Login</span>
        </Link>
      </form>
    </section>
  );
};

export default Signup;

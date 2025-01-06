/** @format */

import React from "react";
import style from "../css/Home.module.css";
import { chatBot, logo } from "../asset";
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { isAuthenticated } from "../store/authSlice";

const Home = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector(isAuthenticated);

  return (
    <section className={style.page_container}>
      <header className={style.header}>
        <div className={style.logo_container}>
          <img src={logo} alt="logo" />
        </div>
        <p className={style.descriptive_text}>
          A cutting-edge conversational AI designed to understand, engage, and
          solve your queries effortlessly.
        </p>
      </header>

      <div className={style.content}>
        <img src={chatBot} alt="chat_bot" className={style.thumbnail} />

        <h6 className={style.text}>
          Designed for everyone, IntelliChat adapts to your communication style
          and needs, making every interaction both productive and enjoyable.
          With privacy and security at its core, your data is always safe, and
          your queries are handled with the utmost confidentiality. Explore the
          limitless potential of conversational AI with IntelliChat – because
          every great idea begins with a meaningful conversation.
        </h6>
        <div className={style.btn_container}>
          <button
            className={style.start}
            type="button"
            onClick={() => navigate(isLoggedIn ? "/chat-bot" : "/guest-chat")}
          >
            Start with AI <FaArrowRight />{" "}
          </button>
          {!isLoggedIn && (
            <>
              <button
                className={style.login_btn}
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className={style.login_btn}
                onClick={() => navigate("/signup")}
              >
                Signup
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Home;

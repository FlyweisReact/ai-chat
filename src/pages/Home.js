/** @format */

import React, { useState, useEffect } from "react";
import style from "../css/Home.module.css";
import { bot, logo, star_icon } from "../asset";
import { useNavigate } from "react-router-dom";
import { BsFillSendFill } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { isAuthenticated } from "../store/authSlice";

const Home = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const isLoggedIn = useSelector(isAuthenticated);

  const texts = [
    "Raise your queries.",
    "Raise your concerns.",
    "Raise your complaints.",
    "Raise your questions.",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [texts, 3000]);

  const speakHandler = () => {
    if (isLoggedIn) {
      navigate("/chat-bot");
    } else {
      navigate("/guest-chat");
    }
  };
  return (
    <section className={style.page_container}>
      <header className={style.header}>
        <div className={style.logo_container}>
          <img src={logo} alt="logo" />
        </div>
        {!isLoggedIn && (
          <div className={style.auth_btns}>
            <button className={style.logIn} onClick={() => navigate("/login")}>
              Sign In
            </button>
            <button
              className={style.signUp}
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </div>
        )}
      </header>

      <div className={style.content}>
        <div className={style.glass_effect}>
          <img src={bot} alt="" className={style.thumbnail} />
          <div className={style.container}>
            <div className={style.animation_container}>
              <AnimatePresence>
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  style={{ position: "absolute" }}
                >
                  <h4 className={style.headline}> {texts[currentIndex]}</h4>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className={style.query}>
              <img src={star_icon} alt="" className={style.star_icon} />
              <input type="text" />
              <button>
                <BsFillSendFill />
              </button>
            </div>
          </div>
        </div>

        <div className={style.description_container}>
          <p className={style.description}>
            Designed for everyone, IntelliChat adapts to your communication
            style and needs, making every interaction both productive and
            enjoyable. With privacy and security at its core, your data is
            always safe, and your queries are handled with the utmost
            confidentiality. Explore the limitless potential of conversational
            AI with IntelliChat – because every great idea begins with a
            meaningful conversation.
          </p>

          <button
            className={style.expert_talk}
            type="button"
            onClick={() => speakHandler()}
          >
            Speak to our expert
          </button>
        </div>
      </div>
    </section>
  );
};
export default Home;

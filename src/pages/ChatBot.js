/** @format */

import React, { useCallback, useEffect, useRef, useState } from "react";
import style from "../css/chat.module.css";
import { logo, star_icon } from "../asset";
import { PulseLoader } from "react-spinners";
import { TypeAnimation } from "react-type-animation";
import { useDispatch, useSelector } from "react-redux";
import { isAuthenticated, LOGOUT } from "../store/authSlice";
import { getApi, postApi, showMsg } from "../Api/Api";
import endPoints from "../Api/apiConfig";
import { useNavigate } from "react-router-dom";
import { ConfigProvider, Dropdown } from "antd";
import { IoIosLogOut } from "react-icons/io";
import axios from "axios";
import { FiPlus } from "react-icons/fi";
import { GoHistory } from "react-icons/go";
import { BsFillSendFill } from "react-icons/bs";
import { BiCategoryAlt } from "react-icons/bi";

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

const ChatBot = () => {
  const isLoggedIn = useSelector(isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [show, setShow] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isNewChat, setNewChat] = useState(true);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const today = new Date().toISOString().split("T")[0]; // Get today's date
  const [conversations, setConversations] = useState([]);
  const [currentAiMessage, setCurrentAiMessage] = useState("");

  const logoutHandler = () => {
    dispatch(LOGOUT());
    showMsg("", "Logged Out Successfully !", "success");
    navigate("/");
  };

  const saveChatData = (data) => {
    const payload = {
      messages: data,
    };

    postApi(endPoints.chat.saveChat, payload, {
      hideErr: true,
    });
  };

  const payload = {
    model: "gpt-4",
    messages: [{ role: "user", content: question }],
  };

  const fetchChatGPTResponse = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        payload,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      const aiAnswer =
        response?.data?.choices?.[0]?.message?.content || "No response found";

      const newConversations = [
        ...conversations,
        { role: "user", content: question },
        { role: "ai", content: aiAnswer },
      ];
      const convo = [
        {
          senderType: "User",
          content: question,
          date: today,
        },
        {
          senderType: "Ai",
          content: aiAnswer,
          date: today,
        },
      ];
      setQuestion("");
      setConversations(newConversations);
      setCurrentAiMessage(aiAnswer);
      saveChatData(convo);
    } catch (error) {
      console.error("Error fetching ChatGPT response:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (conversations?.length > 0) {
      localStorage.setItem("chat", JSON.stringify(conversations));
    }
  }, [conversations]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question.trim()) {
      setNewChat(false);
      fetchChatGPTResponse();
    } else {
      alert("Please enter a question!");
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isMobile) {
      setShow(false);
    }
  }, [isMobile]);

  const chatContainerRef = useRef(null);

  const scroolToLastChat = () => {
    chatContainerRef.current.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth", // Add smooth scrolling
    });
  };

  // Scroll to the last message on update
  useEffect(() => {
    if (chatContainerRef.current) {
      scroolToLastChat();
    }
  }, [conversations]);

  const fetchProfile = useCallback(() => {
    if (isLoggedIn) {
      getApi(endPoints.auth.getProfile, {
        setResponse: setProfile,
      });
    }
  }, [isLoggedIn]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // Menu Options
  const menuOptions = [
    {
      label: (
        <button
          className={style.log_out_btn}
          type="button"
          onClick={() => logoutHandler()}
        >
          <IoIosLogOut color="#fff" size={20} />
          Log out
        </button>
      ),
      key: "0",
    },
  ];

  const clearChat = () => {
    setConversations([]);
    setCurrentAiMessage("");
  };

  return (
    <section className={`${style.remaning_content}`}>
      <div className={style.header}>
        <div className={style.logo_container}>
          <img
            src={logo}
            alt=""
            className={style.logo}
            onClick={() => navigate("/")}
          />
        </div>

        <ConfigProvider
          theme={{
            token: {
              colorBgElevated: "#239453",
            },
            components: {
              Dropdown: {
                paddingBlock: 2,
              },
            },
          }}
        >
          <Dropdown menu={{ items: menuOptions }} trigger={["click"]}>
            <div className={style.user_icon}>
              {profile?.data?.user?.email?.slice(0, 1)}
            </div>
          </Dropdown>
        </ConfigProvider>
      </div>

      {isNewChat && (
        <div className={style.chats}>
          <h3 className={style.headline}>How can we resolve your issue?</h3>

          <form className={style.search_bar} onSubmit={handleSubmit}>
            <button className={style.additional_btn} type="button">
              <BiCategoryAlt />
            </button>
            <button
              className={style.additional_btn}
              type="button"
              onClick={() => clearChat()}
            >
              <GoHistory />
            </button>

            <div className={style.input_box}>
              <img src={star_icon} alt="" className={style.star_icon} />
              <input
                type="text"
                onChange={(e) => setQuestion(e.target.value)}
                value={question}
                required
              />

              <button className={style.send_btn} type="submit">
                <BsFillSendFill />
              </button>
            </div>
            <button
              className={style.additional_btn}
              type="button"
              onClick={() => {
                clearChat();
                setNewChat(true);
              }}
            >
              <FiPlus />
            </button>
          </form>
        </div>
      )}

      {!isNewChat && (
        <div className={`${style.chats} ${style.ai_chats}`}>
          <div className={style.chats_list} ref={chatContainerRef}>
            {conversations?.map((item, index) => {
              if (!item?.content) return null;

              const isLastAiMessage =
                item?.role === "ai" &&
                currentAiMessage &&
                index === conversations?.length - 1;

              if (isLastAiMessage) return null;

              return item?.role === "user" ? (
                <p className={style.user_text} key={`user${index}`}>
                  {item?.content}
                </p>
              ) : (
                <div
                  className={style.ai_text}
                  key={`ai${index}`}
                  dangerouslySetInnerHTML={{
                    __html: item?.content?.replace(/\n/g, "<br/>"),
                  }}
                />
              );
            })}

            {currentAiMessage && (
              <TypeAnimation
                sequence={[currentAiMessage]}
                wrapper="div"
                speed={70}
                cursor={false}
                className={style.ai_text}
                key={currentAiMessage}
              />
            )}
          </div>

          <div className={style.search_container}>
            <form className={style.search_bar} onSubmit={handleSubmit}>
              <button className={style.additional_btn} type="button">
                <BiCategoryAlt />
              </button>
              <button
                className={style.additional_btn}
                type="button"
                onClick={() => clearChat()}
              >
                <GoHistory />
              </button>

              <div className={style.input_box}>
                <img src={star_icon} alt="" className={style.star_icon} />
                <input
                  type="text"
                  onChange={(e) => setQuestion(e.target.value)}
                  value={question}
                  required
                />

                <button className={style.send_btn} type="submit">
                  {loading ? (
                    <PulseLoader color="#fff" size={5} />
                  ) : (
                    <BsFillSendFill />
                  )}
                </button>
              </div>
              <button
                className={style.additional_btn}
                type="button"
                onClick={() => {
                  clearChat();
                  setNewChat(true);
                }}
              >
                <FiPlus />
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default ChatBot;

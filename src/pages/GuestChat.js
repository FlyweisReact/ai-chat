/** @format */

import style from "../css/guestChat.module.css";
import React, { useEffect, useRef, useState } from "react";
import { FaArrowUp } from "react-icons/fa6";
import { logo } from "../asset";
import { PulseLoader } from "react-spinners";
import { TypeAnimation } from "react-type-animation";
import axios from "axios";
import { showMsg } from "../Api/Api";
import { useNavigate } from "react-router-dom";

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

const GuestChat = () => {
  const navigate = useNavigate();
  const [isNewChat, setNewChat] = useState(true);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [currentAiMessage, setCurrentAiMessage] = useState("");

  const payload = {
    model: "gpt-4",
    messages: [{ role: "user", content: question }],
  };

  const askQuestion = async () => {
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
      setQuestion("");
      setConversations(newConversations);
      setCurrentAiMessage(aiAnswer);
    } catch (error) {
      showMsg(
        "",
        "We encountered an issue. Please refresh the page or try again later.",
        "danger"
      );
      setCurrentAiMessage("No Response found");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question.trim()) {
      setNewChat(false);
      askQuestion();
    } else {
      alert("Please enter a question!");
    }
  };

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

  return (
    <section className={style.main_container}>
      <section className={`${style.remaning_content} `}>
        <div className={style.header}>
          <div>
            <img src={logo} alt="" className={style.logo} />
          </div>

          <div className={style.auth_btns}>
            <button
              className={style.login_btn}
              type="button"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className={style.signup_btn}
              type="button"
              onClick={() => navigate("/signup")}
            >
              Signup
            </button>
          </div>
        </div>

        {isNewChat && (
          <div className={style.chats}>
            <h3 className={style.headline}>What can I help with?</h3>

            <form className={style.search_bar} onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Ask me anything"
                onChange={(e) => setQuestion(e.target.value)}
                value={question}
                required
              />
              <button className={style.search} type="submit">
                <FaArrowUp color="#fff" />
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
                <input
                  type="text"
                  placeholder="Ask me anything"
                  onChange={(e) => setQuestion(e.target.value)}
                  value={question}
                  required
                />
                {loading ? (
                  <PulseLoader color="#000" size={5} />
                ) : (
                  <button className={style.search} type="submit">
                    <FaArrowUp color="#fff" />
                  </button>
                )}
              </form>
            </div>
          </div>
        )}
      </section>
    </section>
  );
};

export default GuestChat;

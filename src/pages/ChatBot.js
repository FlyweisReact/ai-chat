/** @format */

import React, { useEffect, useRef, useState } from "react";
import style from "../css/chat.module.css";
import Sidebar from "../components/Sidebar";
import { FaArrowUp } from "react-icons/fa6";
import { BsMenuButton } from "react-icons/bs";
import { logo } from "../asset";
import { PulseLoader } from "react-spinners";
import { TypeAnimation } from "react-type-animation";

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

const ChatBot = () => {
  const [show, setShow] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isNewChat, setNewChat] = useState(true);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const oldChat = JSON.parse(localStorage.getItem("chat"));
  const [conversations, setConversations] = useState(oldChat || []);
  const [currentAiMessage, setCurrentAiMessage] = useState("");

  const fetchChatGPTResponse = async () => {
    setLoading(true);
    setQuestion("");
    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4",
            messages: [{ role: "user", content: question }],
          }),
        }
      );
      const data = await response.json();
      const aiAnswer =
        data?.choices?.[0]?.message?.content || "No response found";
      setConversations((prevHistory) => [
        ...prevHistory,
        { role: "user", content: question },
        { role: "ai", content: aiAnswer },
      ]);
      setCurrentAiMessage(aiAnswer);
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
      setNewChat(false);
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

  return (
    <section className={style.main_container}>
      {isMobile ? (
        <Sidebar setShow={setShow} show={show} setNewChat={setNewChat} />
      ) : (
        show && (
          <Sidebar setShow={setShow} show={show} setNewChat={setNewChat} />
        )
      )}

      <section className={`${style.remaning_content} `}>
        <div className={style.header}>
          <div>
            {!show && (
              <BsMenuButton
                size={16}
                color="#fff"
                onClick={() => setShow(!show)}
              />
            )}
            <img src={logo} alt="" className={style.logo} />
          </div>

          <img
            src={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkAJEkJQ1WumU0hXNpXdgBt9NUKc0QDVIiaw&s"
            }
            alt=""
            className={style.user_avatar}
          />
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
                <FaArrowUp />
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
                  <PulseLoader color="#fff" size={5} />
                ) : (
                  <button className={style.search} type="submit">
                    <FaArrowUp />
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

export default ChatBot;

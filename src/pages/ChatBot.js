/** @format */

import React, { useEffect, useState } from "react";
import style from "../css/chat.module.css";
import Sidebar from "../components/Sidebar";
import { FaArrowUp } from "react-icons/fa6";
import { BsMenuButton } from "react-icons/bs";
import { logo } from "../asset";

const ChatBot = () => {
  const [show, setShow] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isNewChat, setNewChat] = useState(false);

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

            <div className={style.search_bar}>
              <input type="text" placeholder="Ask me anything" />
              <span className={style.search} onClick={() => setNewChat(false)}>
                <FaArrowUp />
              </span>
            </div>
          </div>
        )}

        {!isNewChat && (
          <div className={`${style.chats} ${style.ai_chats}`}>
            <div className={style.chats_list}>
              <p className={style.user_text}>React: Theoretical Overview</p>
              <div className={style.ai_text}>
                <h3>React: Theoretical Overview</h3> <br />
                <p>
                  <strong>React</strong> is a{" "}
                  <strong>JavaScript library</strong> developed by{" "}
                  <strong>Meta</strong> (formerly Facebook) for building{" "}
                  <strong>user interfaces</strong>. It’s especially well-suited
                  for applications where data changes frequently and needs to be
                  efficiently updated in the UI.
                </p>
                <br />
                <hr />
                <br />
                <ol>
                  <li>
                    <p>
                      <strong>Component-Based Architecture</strong>
                    </p>
                    <br />
                    <ul>
                      <li>
                        React applications are built from components, which are
                        independent, reusable pieces of UI.
                      </li>
                      <br />
                      <li>Components can be functional or class-based.</li>
                    </ul>
                  </li>
                  <br />
                  <li>
                    <p>
                      <strong>Declarative Programming</strong>
                    </p>{" "}
                    <br />
                    <ul>
                      <li>
                        Developers describe what the UI should look like, and
                        React updates the interface automatically when data
                        changes.
                      </li>
                    </ul>
                  </li>{" "}
                  <br />
                  <li>
                    <p>
                      <strong>Virtual DOM</strong>
                    </p>{" "}
                    <br />
                    <ul>
                      <li>
                        React maintains a virtual copy of the DOM. Changes are
                        first applied to the virtual DOM, and then React
                        efficiently updates only the parts of the real DOM that
                        need changing.
                      </li>
                    </ul>
                  </li>{" "}
                  <br />
                  <li>
                    <p>
                      <strong>Unidirectional Data Flow</strong>
                    </p>{" "}
                    <br />
                    <ul>
                      <li>
                        React uses a top-down approach to pass data via{" "}
                        <strong>props</strong> (short for properties), ensuring
                        better predictability and easier debugging.
                      </li>
                    </ul>
                  </li>{" "}
                  <br />
                  <li>
                    <p>
                      <strong>JSX (JavaScript XML)</strong>
                    </p>{" "}
                    <br />
                    <ul>
                      <li>
                        JSX is a syntax extension that allows mixing HTML-like
                        code with JavaScript, making it easier to define UIs
                        while leveraging JavaScript’s power.
                      </li>
                    </ul>
                  </li>{" "}
                  <br />
                  <li>
                    <p>
                      <strong>State Management</strong>
                    </p>{" "}
                    <br />
                    <ul>
                      <li>
                        Components can maintain their own local state using the{" "}
                        <code>useState</code> hook or class-based state
                        management.
                      </li>{" "}
                      <br />
                      <li>
                        For global state, libraries like Redux or Context API
                        are used.
                      </li>
                    </ul>
                  </li>{" "}
                  <br />
                  <li>
                    <p>
                      <strong>Lifecycle</strong>
                    </p>{" "}
                    <br />
                    <ul>
                      <li>
                        Components have lifecycles, which include mounting
                        (initialization), updating (state/props change), and
                        unmounting (removal).
                      </li>
                    </ul>
                  </li>{" "}
                  <br />
                  <li>
                    <p>
                      <strong>Hooks</strong>
                    </p>{" "}
                    <br />
                    <ul>
                      <li>
                        Introduced in React 16.8, hooks like{" "}
                        <code>useState</code> and <code>useEffect</code> enable
                        state and side-effects in functional components.
                      </li>
                    </ul>
                  </li>
                </ol>
              </div>
            </div>

            <div className={style.search_container}>
              <div className={style.search_bar}>
                <input type="text" placeholder="Ask me anything" />
                <span className={style.search} onClick={() => setNewChat(true)}>
                  <FaArrowUp />
                </span>
              </div>
            </div>
          </div>
        )}
      </section>
    </section>
  );
};

export default ChatBot;

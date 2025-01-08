/** @format */

import React from "react";
import style from "../css/sidebar.module.css";
import { BsThreeDots } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { SiCompilerexplorer } from "react-icons/si";
import { BsMenuButton } from "react-icons/bs";

const Sidebar = ({ setShow, show, setNewChat ,clearChat }) => {
  return (
    <section className={`${style.sidebar} ${show ? style.show : ""} `}>
      <div className={style.menu_bar}>
        <BsMenuButton size={16} color="#fff" onClick={() => setShow(!show)} />
      </div>

      <div className={style.new_chat_btn}>
        <button onClick={() => setNewChat(true)}>
          <FaPlus size={14} />
          New Chat
        </button>
        <button onClick={() =>clearChat()}>
          <SiCompilerexplorer size={14} />
          Explore
        </button>
      </div>

      {/* <div className={style.remaining_btn}>
        <div className={style.menu}>
          <p className={style.heading}>Today</p>
          <button className={`${style.menu_btn} ${style.active}`}>
            Create react app 18
            <BsThreeDots size={16} />
          </button>
        </div>

        <div className={style.menu}>
          <p className={style.heading}>Yesterday</p>
          <button className={style.menu_btn}>Create react app 18</button>
          <button className={style.menu_btn}>Create react app 18</button>
        </div>

        <div className={style.menu}>
          <p className={style.heading}>Previous 7 days</p>
          <button className={style.menu_btn}>Create react app 18</button>
          <button className={style.menu_btn}>Create react app 18</button>
          <button className={style.menu_btn}>Create react app 18</button>
          <button className={style.menu_btn}>Create react app 18</button>
          <button className={style.menu_btn}>Create react app 18</button>
          <button className={style.menu_btn}>Create react app 18</button>
          <button className={style.menu_btn}>Create react app 18</button>
        </div>
        <div className={style.menu}>
          <p className={style.heading}>Previous 30 days</p>
          <button className={style.menu_btn}>Create react app 18</button>
          <button className={style.menu_btn}>Create react app 18</button>
          <button className={style.menu_btn}>Create react app 18</button>
          <button className={style.menu_btn}>Create react app 18</button>
          <button className={style.menu_btn}>Create react app 18</button>
          <button className={style.menu_btn}>Create react app 18</button>
          <button className={style.menu_btn}>Create react app 18</button>
        </div>
      </div> */}
    </section>
  );
};

export default Sidebar;

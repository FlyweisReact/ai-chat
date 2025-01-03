/** @format */

import ChatBot from "../pages/ChatBot";
import Home from "../pages/Home";

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/chat-bot",
    element: <ChatBot />,
  },
];

export default routes;

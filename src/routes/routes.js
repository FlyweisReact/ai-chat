/** @format */

import ChatBot from "../pages/ChatBot";
import Home from "../pages/Home";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import GuestChat from "../pages/GuestChat";
import ProtectedRoute from "../components/ProtectedRoute";

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/chat-bot",
    element: (
      <ProtectedRoute>
        <ChatBot />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/guest-chat",
    element: <GuestChat />,
  },
];

export default routes;

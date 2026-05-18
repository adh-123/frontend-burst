import React from "react";
import { useSelector } from "react-redux";
import {Routes,Route} from "react-router-dom";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import Users from "./components/Users";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import "./App.css";
export default function App() {
  const user =
    useSelector((state) => state.chat.user);
  return (
    <Routes>
      {/* LOGIN */}
      <Route
        path="/"
        element={
          user
          ? (
            <div className="app">
              <Sidebar />
              <Chat />
            </div>
          )
          : <Login />
        }
      />
    
      <Route
        path="/users"
        element={<Users />}
      />
      
      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />
      <Route
        path="/reset-password/:token"
        element={<ResetPassword/>}/>
    </Routes>
  );
}
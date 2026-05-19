import React, { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {BubbleChatSecureIcon,MailReceive02Icon, LockPasswordIcon, UserIcon,ViewIcon,ViewOffSlashIcon} from "@hugeicons/core-free-icons";
import { useDispatch } from "react-redux";
import { setUser } from "../features/chatSlice";
import {useNavigate} from "react-router-dom";
import "./Login.css";
export default function Login() {
  const dispatch = useDispatch();
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate =useNavigate();
  const validateForm = () => {
    let newErrors = {};
    if (isSignup) {
      if (!name.trim()) {
        newErrors.name = "Display name is required";
      } else if (name.length < 3) {
        newErrors.name =
          "Name must be at least 3 characters";
      }
    }
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      newErrors.email = "Invalid email address";
    }
    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password =
        "Password must be at least 6 characters";
    } else if (
      !/(?=.*[A-Z])(?=.*[0-9])/.test(password)
    ) {
      newErrors.password =
        "Use at least 1 uppercase and 1 number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async () => {

  if (!validateForm()) return;

  setLoading(true);

  try {

    // SIGNUP
    if (isSignup) {

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/register`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            username: name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail);
      }

      setSuccess(
        "Account created successfully!"
      );

      setName("");
      setEmail("");
      setPassword("");

      setTimeout(() => {

        setIsSignup(false);

        setSuccess("");

      }, 1000);
    }

    // LOGIN
    else {

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/login`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail);
      }

      // SAVE TOKEN
      localStorage.setItem(
        "token",
        data.access_token
      );

      // SAVE USER
      dispatch(
        setUser({
          id: data.id,
          username: data.username,
        })
      );
    }

  } catch (error) {

    setErrors({
      api: error.message,
    });

  } finally {

    setLoading(false);

  }
};
  return (
    <div className="login-screen">
      <div className="login-card">
        <div className="login-logo">
          <HugeiconsIcon
            icon={BubbleChatSecureIcon}
            size={32}
            color="white" />
        </div>
        <h1 className="login-title">
          Burst
        </h1>
        <p className="login-sub">
          {isSignup? "Join the colorful conversation." : "Welcome back!"}
        </p>
        {success && (
          <p className="success-text">
            {success}
          </p>
        )}
        {isSignup && (
          <>
            <label className="login-label">
              Display name
            </label>

            <div className="input-icon">

              <input
                className="login-input"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />

              <HugeiconsIcon
                icon={UserIcon}
                size={20}
                color="#777"
              />

            </div>

            {errors.name && (
              <p className="error-text">
                {errors.name}
              </p>
            )}
          </>
        )}

        <label className="login-label">
          Email
        </label>

        <div className="input-icon">

          <input
            className="login-input"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <HugeiconsIcon
            icon={MailReceive02Icon}
            size={20}
            color="#777"
          />
        </div>
        {errors.email && (
          <p className="error-text">
            {errors.email}
          </p>
        )}

<label className="login-label"> Password</label>
<div className="input-icon">
  <input
    className="login-input"
    type={showPassword ? "text" : "password"}
    placeholder="Enter your password"
    value={password}
    onChange={(e) =>
      setPassword(e.target.value)
    }
  />
  <div
    className="password-icons"
    onClick={() =>
      setShowPassword(!showPassword)
    }
  >
    <HugeiconsIcon
      icon={
        showPassword
          ? ViewOffSlashIcon
          : ViewIcon
      }
      size={20}
      color="#777"
    />
  </div>
</div>
{errors.password && (
  <p className="error-text">
    {errors.password}
  </p>
)}
  {errors.api && (
  <p className="error-text">
    {errors.api}
  </p>
)}
   <div
  style={{
    display: "flex",

    justifyContent:
      "flex",

    marginTop: "10px",

    marginBottom:
      "-9px",
  }}
>

  <span
    onClick={() => navigate(   "/forgot-password")
    }
    style={{
      color:
        "#00aef0",

      cursor:
        "pointer",

      fontSize:
        "14px",

      fontWeight:
        "500",
    }}
  >
    Forgot Password?
  </span>

</div>
       <button
        className="login-btn"
        onClick={handleSubmit}
        disabled={loading}>
        {loading ? ( <div className="loader"></div>
        ) : isSignup ? ("Create account") : ( "Sign in")}
       </button>
        {/* Footer */}
        <div className="login-footer">

          {isSignup
            ? "Already have an account?"
            : "New here?"}

          <span
            onClick={() => {
              setIsSignup(!isSignup);
              setErrors({});
              setSuccess("");
            }}
          >
            {isSignup
              ? " Sign in"
              : " Create an account"}
          </span>

        </div>

      </div>
    </div>
  );
}
import React, {useEffect, useRef, useState} from "react";

import { useSelector,useDispatch} from "react-redux";

import {sendMessage,setMessages,deleteMessage} from "../features/chatSlice";

import { HugeiconsIcon } from "@hugeicons/react";

import {SentIcon} from "@hugeicons/core-free-icons";

import { Delete } from "lucide-react";
import {useNavigate} from "react-router-dom";

import "./Chat.css";

export default function Chat() {

  const [text, setText] = useState("");

  const [ inviteUserId, setInviteUserId] = useState("");
  const [inviteEmail,setInviteEmail]=useState("");
  const [users, setUsers] =useState([]);
  const navigate =useNavigate();

  const socket = useRef(null);

  const dispatch = useDispatch();

  const { user,activeRoom,messages,} = useSelector(
    (state) => state.chat
  );

  // FILTER ROOM MESSAGES
  const roomMessages =
    messages.filter(
      (m) =>
        m.room_id ===
        activeRoom?.id
    );

  // LOAD OLD MESSAGES
  useEffect(() => {

    if (!activeRoom?.id)
      return;

    fetch(
      `https://burst-backend-f491.onrender.com/messages/${activeRoom.id}`
    )

      .then((res) => res.json())

      .then((data) => {

        dispatch(
          setMessages(
            Array.isArray(data)
              ? data
              : []
          )
        );

      })

      .catch((err) => {

        console.log(err);

      });

  }, [activeRoom?.id, dispatch]);
  // LOAD USERS
useEffect(() => {

  fetch(
    "http://127.0.0.1:8000/users"
  )

    .then((res) => res.json())

    .then((data) => {

      setUsers(data);

    })

    .catch((err) => {

      console.log(err);

    });

}, []);

  // WEBSOCKET
  useEffect(() => {

    if (!activeRoom?.id)
      return;

    socket.current =
      new WebSocket(
        `ws://localhost:8000/ws/${activeRoom.id}`
      );

    socket.current.onopen =
      () => {

        console.log(
          "Connected"
        );

      };

    socket.current.onmessage =
      (event) => {

        const data =
          JSON.parse(
            event.data
          );

        dispatch(
          sendMessage(data)
        );

      };

    socket.current.onerror =
      (error) => {

        console.log(
          "WebSocket Error:",
          error
        );

      };

    socket.current.onclose =
      () => {

        console.log(
          "Disconnected"
        );

      };

    return () => {

      if (
        socket.current
      ) {

        socket.current.close();

      }

    };

  }, [activeRoom?.id, dispatch]);

  // INVITE USER
  const handleInvite =
    async () => {

    if (!inviteEmail)
      return;

    try {

      const response =
        await fetch(
          `http://localhost:8000/rooms/${activeRoom.id}/invite`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              email:
                  inviteEmail,
                
            }),
          }
        );

      const data =
        await response.json();

      console.log(data);

      alert(
        "User invited successfully!"
      );

      setInviteEmail("");

    } catch (err) {

      console.log(err);

    }

  };

  // SEND MESSAGE
  const handleSend = () => {

    if (!text.trim())
      return;

    if (
      !socket.current ||

      socket.current
        .readyState !==
        WebSocket.OPEN
    ) {

      console.log(
        "WebSocket not connected"
      );

      return;

    }

    const messageData = {

      id: Date.now(),

      room_id:
        activeRoom.id,

      user_id:
        user.id,

      username:
        user.username,

      content: text,

      created_at:
        new Date().toISOString(),

    };

    socket.current.send(
      JSON.stringify(
        messageData
      )
    );

    setText("");

  };

  // EMPTY
  if (!activeRoom) {

    return (

      <div className="empty">


      </div>
    );
  }

  return (

    <div className="chat">

      {/* HEADER */}
      <div className="chat-header">

        <div className="chat-room-icon">

          {activeRoom.name
            ?.charAt(0)
            .toUpperCase()}

        </div>

        <div>

          <h2>
            {activeRoom.name}
          </h2>

          <p>
            Welcome! Say hi 👋
          </p>

          {/* INVITE USER */}
<div
  style={{
    marginTop: "10px",

    display: "flex",

    gap: "8px",
  }}

>
 <input
  type="email"

  placeholder=
    "Enter User Email"

  value={
    inviteEmail
  }

  onChange={(e) =>
    setInviteEmail(
      e.target.value
    )
  }

  style={{
    padding: "6px",

    borderRadius:
      "6px",

    border:
      "1px solid #ccc",
  }}
/>

  {/* INVITE BUTTON */}
  <button
    onClick={
      handleInvite
    }

    style={{
      padding:
        "6px 12px",

      border: "none",

      borderRadius:
        "6px",

      background:
        "#4f8cff",

      color: "white",

      cursor:
        "pointer",
    }}
  >
    Invite
  </button>

  {/* USERS BUTTON */}
  <button
    onClick={() =>
      navigate("/users")
    }

    style={{
      padding:
        "6px 12px",

      border: "none",

      borderRadius:
        "6px",

      background:
        "#9333ea",

      color: "white",

      cursor:
        "pointer",
    }}
  >
    Users
  </button>

</div>

        </div>

      </div>


      {/* MESSAGES */}
      <div className="messages">

        {roomMessages.map(
          (m) => (

          <div
            key={m.id}

            className="message-row"
          >

            <div className="message-avatar">

              {m.username
                ?.charAt(0)
                .toUpperCase()}

            </div>

            <div>

              {/* TOP */}
              <div className="message-top">

                <b>
                  {m.username}
                </b>

                <span className="message-time">

                  {m.created_at &&
                    new Date(
                      m.created_at +"Z"
                    ).toLocaleString(
                      "en-IN",
                      {
                        day: "2-digit",

                        month: "short",

                        year:
                          "numeric",

                        hour:
                          "2-digit",

                        minute:
                          "2-digit",

                        hour12:
                          true,

                        timeZone:
                          "Asia/Kolkata",
                      }
                    )
                  }

                </span>

              </div>

              {/* MESSAGE */}
              <div className="message-bubble-wrapper">

                <div className="message-bubble">

                  {m.content}

                </div>

                {/* DELETE */}
                {m.user_id ===
                  user.id && (

                  <div
                    className="delete-icon"

                    onClick={() =>
                      dispatch(
                        deleteMessage(
                          m.id
                        )
                      )
                    }
                  >

                    <Delete
                      size={16}
                    />

                  </div>
                )}

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* INPUT */}
      <div className="chat-input-box">

        <input
          className="chat-input"

          value={text}

          onChange={(e) =>
            setText(
              e.target.value
            )
          }

          placeholder="Message"
        />

        <button
          className="send-btn"

          onClick={handleSend}
        >

          <HugeiconsIcon
            icon={SentIcon}
            size={20}
            color="white"
          />

        </button>

      </div>

    </div>
  );
}
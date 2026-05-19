import React, { useEffect,useState,} from "react";
import {useSelector,useDispatch,} from "react-redux";
import {logout,setActiveRoom,setRooms,} from "../features/chatSlice";
import { HugeiconsIcon } from "@hugeicons/react";
import {Chatting01Icon,Add01Icon,Logout03Icon,} from "@hugeicons/core-free-icons";
import "./Sidebar.css";
export default function Sidebar() {
  const [room, setRoom] =useState("");
  const [showDelete,setShowDelete,] = useState(null);
  const dispatch =useDispatch();
  const rooms =useSelector((state) =>
        state.chat.rooms
    ) || [];

  const activeRoom =useSelector((state) =>
        state.chat.activeRoom
    );
  const user =useSelector((state) =>
        state.chat.user
    );
  // LOAD ROOMS
  const loadRooms =async () => {
    if (!user) return;
    try {

      const response =await fetch(
          `${import.meta.env.VITE_API_URL}/rooms/${user.id}`
        );

      const data = await response.json();

      dispatch(setRooms(Array.isArray(data)? data: [])
      );

    } catch (err) {

      console.log(err);

    }

  };

  // AUTO REFRESH ROOMS
  useEffect(() => {

    loadRooms();

    const interval =
      setInterval(
        loadRooms,
        3000
      );

    return () =>
      clearInterval(
        interval
      );

  }, [user]);

  // CLOSE DELETE POPUP
  useEffect(() => {

    const handleClick =
      () => {

      setShowDelete(
        null
      );

    };

    window.addEventListener(
      "click",
      handleClick
    );

    return () => {

      window.removeEventListener(
        "click",
        handleClick
      );

    };

  }, []);

  // CREATE ROOM
  const createRoom =
    async () => {

    if (!room.trim())
      return;

    try {

      const response =
        await fetch(
          `${import.meta.env.VITE_API_URL}/rooms`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              {
                name: room,

                user_id:
                  user.id,
              }
            ),
          }
        );

      const data =
        await response.json();

      if (
        !response.ok
      ) {

        throw new Error(
          data.detail
        );

      }

      loadRooms();

      setRoom("");

    } catch (error) {

      console.log(error);

    }

  };

  const deleteRoom =
  async (roomId) => {

  try {

    await fetch(
      `http://localhost:8000/rooms/${roomId}`,
      {
        method: "DELETE",
      }
    );

    dispatch(
      setRooms(
        rooms.filter(
          (room) =>
            room.id !== roomId
        )
      )
    );

    if (
      activeRoom?.id ===
      roomId
    ) {

      dispatch(
        setActiveRoom(null)
      );

    }

    setShowDelete(null);

  } catch (err) {

    console.log(err);

  }

};

  return (

    <div
      className="sidebar"

      style={{
        height: "100vh",

        overflowY:
          "auto",
      }}
    >

      {/* TOP */}
      <div className="sidebar-top">

        <div className="sidebar-logo">

          <div className="logo-circle">

            <HugeiconsIcon
              icon={
                Chatting01Icon
              }
              size={22}
              color="white"
            />

          </div>

          <h2>
            Burst
          </h2>

        </div>

      </div>

      {/* ROOM HEADER */}
      <div className="rooms-header">

        <h4>
          ROOMS
        </h4>

        <button
          className="add-room-btn"

          onClick={
            createRoom
          }
        >

          <HugeiconsIcon
            icon={Add01Icon}
            size={18}
          />

        </button>

      </div>

      {/* INPUT */}
      <input
        className="room-input"

        value={room}

        onChange={(e) =>
          setRoom(
            e.target.value
          )
        }

        placeholder="New room..."
      />

      {/* ROOM LIST */}
      <div className="rooms-list">

        {rooms.length >
        0 ? (

          rooms.map((r) => (

            <div
              key={r.id}

              className={`room-item ${
                activeRoom?.id ===
                r.id
                  ? "active"
                  : ""
              }`}

              onClick={() =>
                dispatch(
                  setActiveRoom(
                    r
                  )
                )
              }

              onContextMenu={(
                e
              ) => {

                e.preventDefault();

                e.stopPropagation();

                setShowDelete(
                  r.id
                );

              }}

              style={{
                position:
                  "relative",
              }}
            >

              {r.name}

              {/* DELETE POPUP */}
              {showDelete ===
                r.id && (

                <div
                  onClick={(e) =>e.stopPropagation()}

                  style={{
                    position:
                      "absolute",

                    right: "0",

                    top: "49px",

                    background:
                      "white",

                    borderRadius:
                      "10px",

                    boxShadow:
                      "0 2px 12px rgba(0,0,0,0.2)",

                    padding:
                      "8px",

                    zIndex: 999,
                  }}
                >

                  <div
                    onClick={() =>
                      deleteRoom(
                        r.id
                      )
                    }

                    style={{
                      color:
                        "red",

                      cursor:
                        "pointer",

                      fontWeight:
                        "bold",
                    }}
                  >
                    Delete
                  </div>

                </div>

              )}

            </div>

          ))

        ) : (

          <p className="no-rooms">
            No rooms yet
          </p>

        )}

      </div>

      {/* USER */}
      <div className="sidebar-user">

        <div className="user-avatar">

          {user?.username
            ?.charAt(0)
            .toUpperCase()}

        </div>

        <div className="user-name">

          {user?.username}

        </div>

        <div
          className="logout-btn"

          onClick={() =>
            dispatch(
              logout()
            )
          }
        >

          <HugeiconsIcon
            icon={
              Logout03Icon
            }
            size={20}
          />

        </div>

      </div>

    </div>
  );
}
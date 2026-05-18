import React, {useEffect,useState,} from "react";
import {useNavigate} from "react-router-dom";

export default function Users() {

  const [users,setUsers] =useState([]);
  const navigate =useNavigate();

  useEffect(() => {

    fetch(
      "https://burst-backend-f491.onrender.com/users"
    )

      .then((res) => res.json())

      .then((data) => {

        setUsers(data);

      })

      .catch((err) => {

        console.log(err);

      });

  }, []);

  return (

    <div
      style={{
        padding: "30px",

        background:
          "#f5f7fb",

        height: "100vh",
        overflowY:"scroll",
        boxSizing: "border-box",
      }}
    >
<div
  style={{
    display: "flex",

    justifyContent:
      "space-between",

    alignItems:
      "center",

    marginBottom:
      "25px",
  }}
>

  <h1
    style={{
      fontSize:
        "32px",

      fontWeight:
        "bold",

      margin: 0,
    }}
  >
    Users
  </h1>

  <button
    onClick={() =>
      navigate("/")
    }

    style={{
      padding:
        "10px 16px",

      border: "none",

      borderRadius:
        "10px",

      background:
        "#9333ea",

      color: "white",

      cursor:
        "pointer",

      fontWeight:
        "bold",
    }}
  >
    ← Return to Chat
  </button>

</div>
      <div
        style={{
          display: "grid",

          gridTemplateColumns:
  "repeat(auto-fit, minmax(320px, 1fr))",
         
          gap: "14px",
           alignItems:
            "start",
        }}
      >
{users.map((u) => (

  <div
    key={u.id}

    onMouseEnter={(e) => {

      e.currentTarget.style.transform =
        "scale(1.02)";

      e.currentTarget.style.boxShadow =
        "0 8px 30px rgba(147,51,234,0.25)";

    }}

    onMouseLeave={(e) => {

      e.currentTarget.style.transform =
        "scale(1)";

      e.currentTarget.style.boxShadow =
        "0 4px 20px rgba(0,0,0,0.08)";

    }}

    style={{
      background:
        "white",

      borderRadius:
        "24px",

      overflow:
        "hidden",

      transition:
        "all 0.3s ease",

      boxShadow:
        "0 4px 20px rgba(0,0,0,0.08)",

      border:
        "1px solid rgba(147,51,234,0.12)",
    }}
  >

    {/* TOP GRADIENT */}
    <div
      style={{
        height: "50px",

        background:
          "linear-gradient(135deg,#a855f7,#4f46e5)",
      }}
    />

    {/* PROFILE SECTION */}
    <div
      style={{
        padding: "16px",

        marginTop:
          "-35px",
      }}
    >

      {/* AVATAR */}
      <div
        style={{
          width: "42px",

          height: "42px",

          borderRadius:
            "50%",

          background:
            "linear-gradient(135deg,#7c3aed,#4f46e5)",

          border:
            "5px solid white",

          color:
            "white",

          display:
            "flex",

          alignItems:
            "center",

          justifyContent:
            "center",

          fontSize:
            "22px",

          fontWeight:
            "bold",

          marginBottom:
            "15px",
        }}
      >

        {u.username
          ?.charAt(0)
          .toUpperCase()}

      </div>

      {/* NAME */}
      <h2
        style={{
          margin: 0,
          fontFamily:"-apple-system",

          fontSize:
            "20px",

          fontWeight:
            "bold",
        }}
      >
        {u.username}
      </h2>

      <p
        style={{
          marginTop:
            "4px",

          color:
            "#777",

          fontSize:
            "15px",
        }}
      >
        Burst User
      </p>

      <div
  style={{
    marginTop: "20px",

    background:
      "#f8fafc",

    border:
      "1px solid #e5e7eb",

    borderRadius:
      "14px",

    padding:
      "0px 10px",
  }}
>

  <p
    style={{
      color:
        "#94a3b8",

      fontSize:
        "12px",

      fontWeight:
        "bold",

      letterSpacing:
        "1px",

      marginBottom:
        "6px",
    }}
  >
    EMAIL
  </p>

  <p
    style={{
      fontSize:
        "15px",

      fontWeight:
        "500",

      wordBreak:
        "break-word",
    }}
  >
    {u.email}
  </p>

</div>

      <div
  style={{
    marginTop: "20px",

    background:
      "#f8fafc",

    border:
      "1px solid #e5e7eb",

    borderRadius:
      "18px",

    padding:
      "0px 10px",
  }}
>

  <p
    style={{
      color:
        "#94a3b8",

      fontSize:
        "12px",

      fontWeight:
        "bold",

      letterSpacing:
        "0px",

      marginBottom:
        "0px",
    }}
  >
    USER ID
  </p>

  <p
    style={{
      fontSize:
        "16px",

      fontWeight:
        "bold",
    }}
  >
    #{u.id}
  </p>

</div>

    </div>

  </div>

))}

      </div>

    </div>

  );

}
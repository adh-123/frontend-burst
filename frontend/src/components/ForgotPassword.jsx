import React from "react";
import {useState} from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { useNavigate } from "react-router-dom";

import {Chatting01Icon,Key01Icon} from "@hugeicons/core-free-icons";
export default function ForgotPassword(){
    
    const[email, setEmail]=useState("");
    const[message,setMessage]=useState("");
    const navigate = useNavigate();
    const handleSubmit = async () => {
        try {
            const response = await fetch(

            `${import.meta.env.VITE_API_URL}/forgot-password`,

            {
                method: "POST",

                headers: {
                    "Content-Type":
                    "application/json"
                },

                body: JSON.stringify({
                    email
                })
            }
        );

        const data =
            await response.json();

        console.log(data);

        setMessage(
            response.ok
            ? data.message
            : data.message ||
              "Email failed"
        );

    } catch(error){

        console.log(error);

        setMessage(
            "Server error"
        );

    }

};
    return(

<div
style={{

position:"relative",

height:"100vh",

display:"flex",

justifyContent:
"center",

alignItems:
"center",

background:
"#f5f7fb"

}}
>

{/* BURST TOP LEFT */}

<div
style={{

position:"absolute",

top:"25px",

left:"35px",

display:"flex",

alignItems:
"center",

gap:"14px"

}}
>

<div
style={{

width:"58px",

height:"58px",

borderRadius:
"50%",

background:
"#06b6d4",

display:"flex",

justifyContent:
"center",

alignItems:
"center",

color:"white",

fontSize:
"30px"

}}
>
<HugeiconsIcon

icon={Chatting01Icon}

size={32}

color="white"
/>


</div>

<h1
style={{

margin:0,
fontFamily:"fangsong",

fontSize:
"42px",

color:
"#06b6d4",

fontWeight:
"bold"

}}
>

Burst

</h1>

</div>

{/* CARD */}

<div
style={{

width:"420px",

background:
"white",

padding:
"40px",

borderRadius:
"25px",

boxShadow:
"0 8px 30px rgba(0,0,0,.08)",

textAlign:
"center"

}}
>

<div
style={{

width:"70px",

height:"70px",

margin:
"0 auto",

borderRadius:
"50%",

background:
"#06b6d4",

display:"flex",

justifyContent:
"center",

alignItems:
"center",

fontSize:
"28px"

}}
>
<HugeiconsIcon

icon={Key01Icon}

size={32}

color="white"
/>


</div>

<h1
style={{

marginTop:
"25px",

marginBottom:
"10px"

}}
>

Forgot Password?

</h1>

<p
style={{

color:"#888",

marginBottom:
"30px"

}}
>

Don't worry, we'll send ResetPassword link to your mail.

</p>

<div
style={{

textAlign:
"left"

}}
>

<label>

Email

</label>

<input

type="email"

placeholder=
"Enter your email"

value={email}

onChange={(e)=>

setEmail(
e.target.value
)}

style={{

width:"100%",

padding:"14px",

marginTop:"8px",

border:
"1px solid #ddd",

borderRadius:
"10px",

marginBottom:
"25px",

boxSizing:
"border-box"

}}

/>

</div>

<button

onClick=
{handleSubmit}

style={{

width:"100%",

padding:"14px",

background:
"#06b6d4",

border:"none",

borderRadius:
"10px",

color:"white",

fontSize:
"16px",

fontWeight:
"bold",

cursor:
"pointer"

}}
>

Reset Password

</button>
{
message &&

<p
style={{
color:
message ===
"Reset link sent successfully"

?

"green"

:

"red",

marginBottom:
"15px",

textAlign:
"center"

}}
>

{

message
?
message
:
""

}

</p>

}

<p

onClick={()=>
navigate("/")
}

style={{

marginTop:
"25px",

cursor:
"pointer",

color:
"#666"

}}
>

← Back to login

</p>

</div>

</div>

)

}
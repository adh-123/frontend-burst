import React,{useState} from "react";
import {useParams,useNavigate}from "react-router-dom";
import {HugeiconsIcon}from "@hugeicons/react";
import {Chatting01Icon,Key01Icon} from "@hugeicons/core-free-icons";
export default function ResetPassword(){
const{token}=useParams();
const navigate=useNavigate();
const[password,setPassword]=useState("");
const[confirmPassword,setConfirmPassword]=useState("");
const[message,setMessage]=useState("");
const handleSubmit = async () => {
if(!password || !confirmPassword){
    setMessage("All fields are required");
    return;
}

if(password !== confirmPassword);
    setMessage("Passwords did not match");
    return;
}
try{

const response = await fetch(
"http://localhost:8000/reset-password/",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
token,
new_password:password
})
}
);

const data = await response.json();

setMessage(
response.ok
? "Password reset successfully"
: data.message || "Something went wrong"
);

}catch(error){

setMessage("Server connection error");

}

};
return(
<div
style={{
position:"relative",
height:"100vh",
display:"flex",
justifyContent:"center",
alignItems:"center",
background:"#f5f7fb"
}}
>

{/* BURST */}

<div
style={{
position:"absolute",
top:"25px",
left:"35px",
display:"flex",
alignItems:"center",
gap:"15px"
}}
>

<div
style={{
width:"58px",
height:"58px",
borderRadius:"50%",
background:"#06b6d4",
display:"flex",
justifyContent:"center",
alignItems:"center"
}}
>

<HugeiconsIcon
icon={Chatting01Icon}
size={30}
color="white"
/>

</div>

<h1
style={{
margin:0,
fontFamily:"fangsong",
color:"#06b6d4"
}}
>
Burst
</h1>
</div>

{/* CARD */}

<div
style={{
width:"430px",
background:"white",
padding:"40px",
borderRadius:"24px",
boxShadow:"0 6px 30px rgba(0,0,0,.08)"
}}
>
<div
style={{
width:"70px",
height:"70px",
background:"#06b6d4",
borderRadius:"50%",
display:"flex",
justifyContent:"center",
alignItems:"center",
margin:"0 auto"
}}
>
<HugeiconsIcon
icon={Key01Icon}
size={30}
color="white"
/>
</div>
<h1
style={{
textAlign:"center",
marginTop:"20px"
}}
>
Set a new Password
</h1>
<p
style={{
textAlign:"center",
color:"#888"
}}
>
Your new password must be different
</p>
<label>
Password
</label>
<input
type="password"
placeholder="********"
value={password}

onChange={(e)=>setPassword(e.target.value)}
style={{
width:"100%",
padding:"14px",
marginTop:"8px",
marginBottom:"20px",
border:"1px solid #ddd",
borderRadius:"10px"
}}
/>
<label>Confirm Password</label>
<input
type="password"
placeholder="********"
value={confirmPassword}
onChange={(e)=>setConfirmPassword(e.target.value)}
style={{
width:"100%",
padding:"14px",
marginTop:"8px",
border:"1px solid #ddd",
borderRadius:"10px"
}}
/>
<p
style={{
color: message === "Password reset successfully"
? "green"
: "red",

textAlign:"center"
}}
>{message}</p>
<button onClick={handleSubmit}
style={{
width:"100%",
padding:"14px",
marginTop:"15px",
background:"#06b6d4",
border:"none",
borderRadius:"10px",
color:"white",
fontWeight:"bold"
}}
>Reset Password</button>
<p onClick={()=>navigate("/")}
style={{
textAlign:"center",
marginTop:"25px",
cursor:"pointer"
}}
>
← Back to login
</p>
</div>
</div>
)
}
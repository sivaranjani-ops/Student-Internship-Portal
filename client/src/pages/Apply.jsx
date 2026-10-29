import {useState} from "react";
import {Link,useParams} from "react-router-dom";
import internships from "../data/internships.js";

// Public API base URL for the deployed Render backend.
const API_URL = "https://student-internship-portal-1-4amx.onrender.com/api";

export default function Apply(){
 const {id}=useParams();
 const [studentName,setStudentName]=useState("");
 const [email,setEmail]=useState("");
 const [rollNumber,setRollNumber]=useState("");
 const [internshipId,setInternshipId]=useState(id||"");
 const [message,setMessage]=useState("");
 const [error,setError]=useState("");
 const [loading,setLoading]=useState(false);

 async function submit(e){
  e.preventDefault();
  setMessage("");
  setError("");
  const item=internships.find(x=>x.id===internshipId);
  if(!studentName.trim()||!email.trim()||!rollNumber.trim()||!item){
   setError("Please complete every field.");
   return;
  }
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())){
   setError("Please enter a valid email address.");
   return;
  }
  setLoading(true);
  try{
   const r=await fetch(API_URL+"/applications",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
     studentName:studentName.trim(),
     email:email.trim(),
     rollNumber:rollNumber.trim(),
     internshipId:item.id
    })
   });
   const data=await r.json();
   if(!r.ok) throw new Error(data.message||"Submission failed.");
   setMessage("Application submitted successfully!");
   setStudentName("");
   setEmail("");
   setRollNumber("");
  }catch(err){
   setError(err.message==="Failed to fetch"
    ?"Cannot reach the backend. The API URL, CORS, or server may be unavailable."
    :err.message||"Something went wrong.");
  }finally{
   setLoading(false);
  }
 }

 return <section className="form-card">
  <div className="form-header">
   <p className="eyebrow">Take the next step</p>
   <h1>Apply for an internship</h1>
   <p>Share your details and choose the opportunity you are interested in.</p>
  </div>
  {message&&<p className="success-message" role="status">{message}</p>}
  {error&&<p className="error-message" role="alert">{error}</p>}
  <form className="application-form" onSubmit={submit}>
   <label htmlFor="studentName">Student name</label>
   <input id="studentName" value={studentName} onChange={e=>setStudentName(e.target.value)} placeholder="Enter your full name" required minLength={2} maxLength={100}/>
   <label htmlFor="email">Email ID</label>
   <input id="email" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" required/>
   <label htmlFor="rollNumber">Roll number</label>
   <input id="rollNumber" value={rollNumber} onChange={e=>setRollNumber(e.target.value)} placeholder="Enter your roll number" required maxLength={30}/>
   <label htmlFor="internshipId">Select internship</label>
   <select id="internshipId" value={internshipId} onChange={e=>setInternshipId(e.target.value)} required>
    <option value="">Choose an opportunity</option>
    {internships.map(x=><option key={x.id} value={x.id}>{x.title}</option>)}
   </select>
   <button disabled={loading} type="submit">{loading?"Submitting...":"Submit application"}</button>
  </form>
  <Link className="text-link" to="/">← Back to Home</Link>
 </section>;
}

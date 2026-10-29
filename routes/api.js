const express = require("express");
const Application = require("../models/Application");
const router = express.Router();

const internships = [
 { id:"web-development", title:"Web Development Intern", company:"TechNova Solutions", location:"Coimbatore / Remote", duration:"3 months", stipend:"₹8,000 per month", description:"Build responsive websites and learn modern frontend development.", skills:["HTML","CSS","JavaScript","React"] },
 { id:"data-analytics", title:"Data Analytics Intern", company:"Insight Analytics", location:"Remote", duration:"2 months", stipend:"₹6,000 per month", description:"Explore datasets and turn findings into useful reports.", skills:["Python","SQL","Excel"] },
 { id:"cybersecurity", title:"Cybersecurity Intern", company:"SecureNet Labs", location:"Hybrid", duration:"3 months", stipend:"₹10,000 per month", description:"Learn security monitoring and defensive security practices.", skills:["Networking","Linux","Security"] }
];

router.get("/internships", (_req,res) => res.json(internships));
router.get("/internships/:id", (req,res) => {
 const item = internships.find((entry) => entry.id === req.params.id);
 if (!item) return res.status(404).json({message:"Internship not found"});
 res.json(item);
});
router.post("/applications", async (req,res) => {
 try {
  const {studentName,email,rollNumber,internshipId} = req.body;
  if (![studentName,email,rollNumber,internshipId].every((v) => typeof v === "string" && v.trim())) return res.status(400).json({message:"Please complete every required field."});
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return res.status(400).json({message:"Please enter a valid email address."});
  const item = internships.find((entry) => entry.id === internshipId);
  if (!item) return res.status(400).json({message:"Please choose a valid internship."});
  const application = await Application.create({studentName:studentName.trim(),email:email.trim(),rollNumber:rollNumber.trim(),internshipId:item.id,internshipTitle:item.title});
  res.status(201).json({message:"Application submitted successfully!",application});
 } catch (error) {
  console.error("Application submission error:", error);
  if (error.name === "ValidationError") return res.status(400).json({message:error.message});
  res.status(500).json({message:"Unable to submit your application. Please try again."});
 }
});
router.get("/applications", async (_req,res) => {
 try { res.json(await Application.find().sort({createdAt:-1})); }
 catch (error) { console.error("Application retrieval error:",error); res.status(500).json({message:"Unable to retrieve applications."}); }
});
module.exports = router;

let express= require("express");
let app= express();
let dotenv= require("dotenv")
dotenv.config()
let nodemail= require("nodemailer");
let cors= require("cors");
app.use(cors());
app.use(express.json());
let PORT=8000;

app.get("/test", (req,res)=>{
res.json({message:"this is test mode"})
})


let transporter = nodemail.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER,
    pass: process.env.PASSWORD,
  },
});

app.post("/sendemail", async (req, res) => {
  const { email, name, description } = req.body;

  try {
let info = await transporter.sendMail({
  from: `"${name}" <vy784147@gmail.com>`, 
  to: "vy784147@gmail.com",
  replyTo: email, 
  subject: "Interview - Message from Portfolio Form",
  html: `
    <h3 style="color:green; font-size:"20px">Connected Person Name: ${name}</h3>
    <p>${description}</p>
  `,
});
    res.json({ message: "Email has been sent successfully" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }


});



app.listen(PORT,"0.0.0.0",()=>{
    console.log("port is runnig at 8000")
})
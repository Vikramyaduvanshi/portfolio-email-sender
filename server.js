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
async function replytosender(){
const info = await transporter.sendMail({
      from: `Vikram Yadav <${process.env.USER}>`,
      to: email,
      subject: `Thank you for reaching out to Vikram Yadav`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 10px;">
          <h2 style="color: #007BFF;">Hi ${name || "there"},</h2>
          <p style="font-size: 16px;">Thank you for getting in touch with me through my portfolio website. I appreciate your interest and will get back to you shortly.</p>
          
          <p style="font-size: 16px;">If your message was regarding collaboration, job opportunity, or interview discussion, I'm excited to connect and explore further!</p>

          <p style="font-size: 16px;">Meanwhile, feel free to explore more about my work and projects on my portfolio.</p>

          <br/>

          <p style="font-size: 16px;">Best regards,<br/><strong>Vikram Yadav</strong><br/>MERN Stack Developer</p>
        </div>
      `,
    });

    
}

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
await replytosender()
    res.json({ message: "Email has been sent successfully" });

  } catch (e) {
    res.status(500).json({ message: e.message });
  }


});



app.listen(PORT,"0.0.0.0",()=>{
    console.log("port is runnig at 8000")
})
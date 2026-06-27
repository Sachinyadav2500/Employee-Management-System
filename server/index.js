import dotenv from "dotenv";
dotenv.config();

import express from "express"
import cors from "cors"
import authRouter from "./routes/auth.js"
import DepartmentRouter from "./routes/department.js"
import employeeRouter from "./routes/employee.js"
import salaryRouter from "./routes/salary.js"
import leaveRouter from "./routes/leave.js"
import settingRouter from "./routes/setting.js"
import dashboardRouter from "./routes/dashboard.js"
import connectToDatabase from "./db/db.js"
connectToDatabase()
const app =express()
app.use(cors())
app.use(express.json())
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  "/uploads",
  express.static(path.join(__dirname, "public/uploads"))
);
app.use('/api/auth' , authRouter)
app.use('/api/department' , DepartmentRouter)
app.use('/api/employee' ,employeeRouter )
app.use('/api/salary' ,salaryRouter)
app.use('/api/leave' ,leaveRouter)
app.use('/api/setting' ,settingRouter)
app.use('/api/dashboard' , dashboardRouter)

app.get("/", (req, res) => {
  res.send("Server Working");
});
app.listen(process.env.PORT ,()=>{
    console.log(`server is running on port : ${process.env.PORT}`);
})

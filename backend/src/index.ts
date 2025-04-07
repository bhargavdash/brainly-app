import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import router from './routes/route'
import dotenv from 'dotenv'
dotenv.config()

const app = express();

app.use(express.json())
app.use(cors())


const PORT: string = process.env.PORT ?? ""
const MONGO_URI: string = process.env.MONGO_URI ?? ""

mongoose.connect(MONGO_URI).then(()=>{
    console.log("DB connected!!");
})

app.use('/api', router);
app.get('/healthy', (req, res) => {
    res.send("Main route is healthy")
})

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`);
})

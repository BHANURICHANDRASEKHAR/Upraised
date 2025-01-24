import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import DatabaseConnection from './DataBase/Connection.js'
config();
DatabaseConnection();
const app = express();
app.use(express.json())
app.use(cors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}))
app.get('/',(re,res)=>{
    res.send('Welcome to the API')
})
app.listen(process.env.Port,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})
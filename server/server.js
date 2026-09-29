import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app = express()

app.use(cors())

app.use(express.json())

app.get('/api/health',(req,res)=>{
    res.status(200).json({
        status: 'success',
        message: 'LearnyMo Backend is active and running!',
        timestamp: new Date()
    })
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`LearnyMo Server running on http://localhost:${PORT}`);
});
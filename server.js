const express = require('express')
const dotenv = require('dotenv')
const databaseConnection = require('./utils/database')
const cookiesParser = require('cookie-parser')
const userRoute = require('./routes/userRoute')
const cors = require('cors')

const app = express()

dotenv.config()
databaseConnection();



const port = process.env.PORT_NO
app.use(express.json())

app.use(cookiesParser())

app.use(express.urlencoded({extended: true}))

const corsOptions = {
    // origin: 'http://localhost:3000',
    origin:'https://netflix-update-six.vercel.app/',
    credentials: true,  
}

app.use(cors(corsOptions))
app.use("/api/v1/user",userRoute)
// http://localhost:10000/api/v1/user/register


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
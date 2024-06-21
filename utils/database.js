const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({
    path:"../.env"
})

const databaseConnection = () => {
    
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("Database Connected");
    }).catch((err)=>{
        console.log("Database not connected");
    })
}
module.exports = databaseConnection;
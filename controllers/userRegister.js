const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const Login = async (req, res) =>{
    try{
        const {email, password} = req.body
        if(!email || !password){
            return res.status(401).json({
                message:"Please Enter all fields",
                success:false
            })
        }

        const user = await User.findOne({email})

        if(!user){
            return  res.status(401).json({
                message:"Invalid Email or Password",
                success:false
            })
        }

        // console.log("User found", user)


        const isMatch  = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(401).json({
                message:"Invalid Email or Password",
                success:false
            })
        }
        // console.log("User Matched ", isMatch)
        const tokenData = {
            id:user._id,
        }

        const token = jwt.sign(tokenData, "ahdkjashdahsdkjhasdkjhasdk", {expiresIn:"1d"})
        
        return res.status(200)
        .cookie("token", token, {httpOnly:true})
        .json({
            message:`Welcome back ${user.UserName}`,
            success:true,
            user: {
                id: user._id,
                UserName: user.UserName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                gender: user.gender
            }
        })
    }
    catch(error){
        console.error("Not able to login", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message
        });
    }
}



const Register = async(req, res) =>{
    try{
        const {UserName, email, password, phoneNumber, gender} = req.body
        
         if (!UserName || !email || !password || !phoneNumber || !gender) {
            return res.status(400).json({
             message:"Please fill all fields",
             success:false
            })           
         }
        const user = await User.findOne({email});
         if(user){
             return res.status(400).json({
                 message:"User already exits",
                 success:false
             })
         }  

        const hashedPassword = await bcrypt.hash(password, 10)

const newUser = await User.create({
    UserName,
    email,
    password: hashedPassword,
    phoneNumber,
    gender
})

// console.log("newUser data", newUser)
    return res.status(200).json({
        message:"Account Created Successfully",
        success:true,
        user: newUser
    })
    }
    catch(error){
        console.log("Not able to create account", error);
        return res.status(500).json({
            message:"Internal Server Error",
            success:false,
            error: error.message
        })
    }
}

const Logout = async (req, res) => {
    return res.status(200)
        .cookie("token", "", { expiresIn: new Date(Date.now()), httpOnly:true })
        .json({
            message: "Logged Out Successfully",
        success: true
    });
}


const userController = {
    Register,
    Login,
    Logout,

}

module.exports = userController
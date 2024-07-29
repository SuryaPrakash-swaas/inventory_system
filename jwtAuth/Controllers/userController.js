const userModel = require("../Models/userModel");
const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY || 'encrypted_secret_key';


const userRegistration = async (req, res) => {
  const userData = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  };
  const userInsert = await userModel.insertUser(userData);
  if (userInsert === "Success") {
    res.status(200).json({message:"User Created Successfully"});
    return;
  }
  if (userInsert === "Already Exists") {
    res.status(200).json({message:"User Already Exists"});
  }
};

const userLogin = async (req, res)=>{
    if (Object.keys(req.body).length === 0) {
		res.status(500).json({ message: 'Internal Server Error' });
        return
	}
    const loginData={
        email:req.body.email,
        password:req.body.password,
};
const loginCheck =await userModel.userLogin(loginData);

if(loginCheck.message==="Success"){
   const token= jwt.sign({ email: req.body.email ,password:req.body.password }, secretKey, { expiresIn: '1h' });
			// res.json({ token });
    res.status(200).json({message: 'Valid User',user_info:{username:loginCheck.queryResult.userName,email: loginCheck.queryResult.email,userid:loginCheck.queryResult.userId, token}})

}
if(loginCheck==="Failed"){
    res.status(200).json({message:'Invalid Email/Password'})
}

};



module.exports = {userRegistration,userLogin};

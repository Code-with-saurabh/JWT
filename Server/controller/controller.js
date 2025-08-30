const defaultRoute = (req,res)=>{
    res.json({message:"hello this is router Db Route"})
}

const signup = async (req,res)=>{
     const {firstName,lastName,email,confirmPassword} = req.body;
    try{
        console.log(req.body)
        res.status(200).json({status:true,message:"Hello User"})
    }catch(err){
        return res.status(500).json({error:"Internal Server Error!"})
    }
}

const signin = async (req,res)=>{
     const {email,password} = req.body;
    try{
        console.log(req.body)
        res.status(200).json({status:true,message:"Hello User"})
    }catch(err){
        return res.status(500).json({error:"Internal Server Error!"})
    }
}
module.exports = {
    defaultRoute,
    signup,
    signin
}
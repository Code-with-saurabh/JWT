const mongoose = require("mongoose")
const {MONGODB_URL} = require("./Config")
const dbConnection = async ()=>{
    try{
       const res =  await mongoose.connect(MONGODB_URL)
       console.log("Database connected successfully:", res.connection.host);

       return true;
    }catch(err){
        if(err.name ="MongoServerSelectionError"){
            console.log("Check your db connection")
            return false
        }
        console.log("Error \n",err)
         process.exit(1)
        return false
    }
}

module.exports = {dbConnection}
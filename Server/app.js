const express = require("express")
const app = express()
const {PORT} = require("./utilities/Config")
const DbRoute = require("./Routes/dbOprations")
const UserRoute = require("./Routes/UserRoute")
const cors = require("cors")
const {dbConnection} = require("./utilities/connectdb")
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api",UserRoute)
app.use("/api/db",DbRoute)

app.get("/",(req,res)=>{
    res.send("Hello from Db default route")
})

const startServer = async ()=>{
    try{
        const res = await dbConnection();

        if(!res){
            console.log("Db Connection Error ")
            return;
        }
        console.log("data base Connected...")
        app.listen(PORT,()=>{
            console.log(`server is running on ${PORT}`)
        })

    }catch(err){
        console.log("Server Starting Error ")
    }
}

startServer();
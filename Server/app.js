const express = require("express")
const app = express()
const {PORT} = require("./utilities/Config")
const DbRoute = require("./Routes/dbOprations")
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/db",DbRoute)

app.get("/",(req,res)=>{
    res.send("Hello from Db default route")
})
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})
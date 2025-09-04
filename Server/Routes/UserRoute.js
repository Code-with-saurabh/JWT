const express = require("express");
const { defaultRoute,signup,signin, getUser } = require("../controller/controller");
const authMiddleware = require("../Middleware/authMiddleware");
 
const routes = express.Router();
 
routes.get("/",defaultRoute)
routes.post("/signup",signup)
routes.post("/signin",signin)
routes.get("/user",authMiddleware,getUser)

module.exports = routes


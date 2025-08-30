const express = require("express");
const { defaultRoute,signup,signin } = require("../controller/controller");
const routes = express.Router();
 
routes.get("/",defaultRoute)
routes.post("/signup",signup)
routes.post("/signin",signin)

module.exports = routes


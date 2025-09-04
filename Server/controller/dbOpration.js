const JWT = require("jsonwebtoken")
const {JWT_SECRET,JWT_EXPIRES_IN} = require("../utilities/Config")

const User = require("../model/UserModel");

const defaultRoute = (req, res) => {
    res.json({ message: "hello this is router Db Route" });
};

const createNewUser = async (req) => {
    const { firstName, lastName, email, confirmPassword } = req.body;
    
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return {
                status: false,
                message: "Email is already registered",
                data: {},
            };
        }

        const newUser = new User({
            firstName,
            lastName,
            email,
            confirmPassword,
        });

        const savedUser = await newUser.save();
        

        const token = JWT.sign({id:savedUser._id},JWT_SECRET,{expiresIn:JWT_EXPIRES_IN});
        if(!token){
             return {
            status: false,
            message: "token genrating  Error",
            error: "Token error",
        };
        }
        console.log(token)

        return {
            status: true,
            message: "User created successfully",
            data: {UserData:savedUser,token:token},
        };
    } catch (error) {
        return {
            status: false,
            message: "Internal Server Error",
            error: error.name || "Unknown error",
        };
    }
};

const ReadAllUser = async () => {
    try {
        const allUsers = await User.find();
        if (!allUsers) {
            return {
                status: false,
                message: "No users found",
                data: {},
            };
        }
        return {
            status: true,
            message: "Users data fetched",
            data: allUsers,
        };
    } catch (error) {
        return {
            status: false,
            message: "Internal Server Error",
            error: error.name || "Unknown error",
        };
    }
};

const FinduserByUsername = async (username) => {
    try {
        const user = await User.findOne({ email: username });
        if (!user) {
            return {
                status: false,
                message: "User not found",
                data: {},
            };
        }
        return {
            status: true,
            message: "User data fetched",
            data: user,
        };
    } catch (error) {
        return {
            status: false,
            message: "Internal Server Error",
            error: error.name || "Unknown error",
        };
    }
};

const UpdateuserByUsername = async (username, dataToUpdate) => {
    try {
        if (!username || typeof dataToUpdate !== "object") {
            return {
                status: false,
                message: "Username and dataToUpdate are required.",
                data: {},
            };
        }

        const fields = ["firstName", "lastName", "email", "confirmPassword"];
        const updatePayload = {};
        fields.forEach((field) => {
            updatePayload[field] =
                dataToUpdate[field] !== undefined ? dataToUpdate[field] : "";
        });

        const user = await User.findOneAndUpdate(
            { email: username },
            { $set: updatePayload },
            { new: true, runValidators: true }
        );

        if (!user) {
            return {
                status: false,
                message: "User not found",
                data: {},
            };
        }

        return {
            status: true,
            message: "User data updated successfully",
            data: user,
        };
    } catch (err) {
        return {
            status: false,
            message: "Internal Server Error",
            error: err?.message || "Unknown error",
        };
    }
};

const DeleteuserByUsername = async (username) => {
    try {
        const user = await User.findOneAndDelete({ email: username });
        if (!user) {
            return {
                status: false,
                message: "User not found",
                data: {},
            };
        }

        return {
            status: true,
            message: "User deleted successfully",
            data: user,
        };
    } catch (error) {
        return {
            status: false,
            message: "Internal Server Error",
            error: error.name || "Unknown error",
        };
    }
};

const checkUserCredentials = async (req) => {
     const { email } = req.body;

    try {
    const user = await User.findOne({ email });
    if (!user) return { status: false, message: "User not found" };
    const token = JWT.sign({id:user._id},JWT_SECRET,{expiresIn:JWT_EXPIRES_IN})
    if(!token){
        console.log("\ntoken genrating  Error....")
         return {
            status: false,
            message: "token genrating  Error",
            error: "Token error",
        };
    }
    console.log("Login Token is :",token)
    return { status: true,  data: {UserData:user,token:token} };
    } catch (error) {
        return {
            status: false,
            message: "Internal Server Error",
            error: error.name || "Unknown error",
        };
    }
};

module.exports = {
    defaultRoute,
    createNewUser,
    ReadAllUser,
    FinduserByUsername,
    UpdateuserByUsername,
    DeleteuserByUsername,
    checkUserCredentials,
};

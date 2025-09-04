const {
    defaultRoute,
    createNewUser,
    ReadAllUser,
    FinduserByUsername,
    UpdateuserByUsername,
    DeleteuserByUsername,
    checkUserCredentials,
} = require("./dbOpration");

const bcrypt = require("bcrypt")

const signup = async (req, res) => {
    const { firstName, lastName, email, confirmPassword } = req.body;

    try {
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(confirmPassword, 10);

        // Pass the hashed password to the db function
        const result = await createNewUser({
            ...req,
            body: {
                ...req.body,
                confirmPassword: hashedPassword,
            },
        });

        if (!result.status) {
            return res.status(400).json(result);
        }
        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({ error: "Internal Server Error!" });
    }
};
 

const signin = async (req, res) => {
    const { email, confirmPassword } = req.body;

    try {
        const result = await checkUserCredentials(req);

        if (!result.status) {
            return res.status(400).json(result);
        }

        const isPasswordValid = await bcrypt.compare(confirmPassword, result.data.UserData.confirmPassword);
        if (!isPasswordValid) {
            return res.status(400).json({
                status: false,
                message: "Invalid credentials",
                data: {},
            });
        }

        return res.status(200).json({
            status: true,
            message: "User signed in successfully",
            data: result.data,
        });
    } catch (err) {
        return res.status(500).json({ error: "Internal Server Error!" });
    }
};




const readAllUsers = async (req, res) => {
    try {
        const result = await ReadAllUser();
        if (!result.status) {
            return res.status(400).json(result);
        }
        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({ error: "Internal Server Error!" });
    }
};

const getUserByUsername = async (req, res) => {
    const { username } = req.params;
    try {
        const result = await FinduserByUsername(username);
        if (!result.status) {
            return res.status(400).json(result);
        }
        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({ error: "Internal Server Error!" });
    }
};

const updateUserByUsername = async (req, res) => {
    const { username, dataToUpdate } = req.body;
    try {
        const result = await UpdateuserByUsername(username, dataToUpdate);
        if (!result.status) {
            return res.status(400).json(result);
        }
        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({ error: "Internal Server Error!" });
    }
};

const deleteUserByUsername = async (req, res) => {
    const { username } = req.params;
    try {
        const result = await DeleteuserByUsername(username);
        if (!result.status) {
            return res.status(400).json(result);
        }
        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({ error: "Internal Server Error!" });
    }
};

module.exports = {
    defaultRoute,
    signup,
    signin,
    readAllUsers,
    getUserByUsername,
    updateUserByUsername,
    deleteUserByUsername,
};

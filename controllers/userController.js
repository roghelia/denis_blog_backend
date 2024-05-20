import User from "../models/user.model.js";
import bcrypt from "bcrypt"

const signUpUser = async (req, res) => {
    const { name, email, password } = req.body;

    if(!name || !email || !password){
        throw new Error("Fill all the details.")
    }

    const userExists = await User.findOne({email})

    if(userExists) {
        res.status(400)
        throw new Error("User already exists.")
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    try {
        const newUser = await User.create({name, email, password: hashedPassword})
        newUser.save();
        if(newUser){
            res.status(200).send("Sign-up successfully.")
        } else {
            res.status(400).send("Sign-up unsuccessful.")
        }
    } catch (error) {
        console.log(error)
    }
}

const signInUser = async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password){
        throw new Error("Fill all the details.")
    }
 
    try {
        const userExists = await User.findOne({email})
    
    } catch (error) {
        console.log(error)
    }
    if(userExists){
        const passwordVerify = await bcrypt.compare(password, userExists.password)

        if(passwordVerify){
            res.status(200).send("Login Successful.")
        } else {
            res.status(400).send("Incorrect password.")
        }
    } else {
        res.status(400).send("User doesn't exist.")
    }
}

const deleteUser = async (req, res) => {
    const { email, password } = req.body;

    const userExists = await User.findOne({email});

    if(userExists){
        const passwordVerify = await bcrypt.compare(password, userExists.password)

        if(passwordVerify){
            try {
                const delUser = await User.deleteOne({email})

                if(delUser){
                    res.send("Removed the user.")
                } else {
                    res.send("Error! while deleting the user.")
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
}

const updateUser = async (req, res) => {
    const { username, email, password } = req.body;

    const userExists = await User.findOne({email})

    if(userExists){
        userExists.name = req.body.name
        userExists.email = req.body.password

        const salt = await bcrypt.salt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        userExists.password = hashedPassword
    }
}

export { signUpUser, signInUser, deleteUser, updateUser };
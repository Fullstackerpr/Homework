import bcrypt from "bcrypt";
import { User } from "../models/index.js";

export const authController = {
    register: async(req, res, next) =>{
        try {
            const body = req.body
            const {password}  = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.findOne({email: body.email}, "email _id").exec()
            if(!user){
                const newUser = new User({
                    ...body,
                    password: hashedPassword
                })
                await newUser.save()
                res.status(201).json({
                    status: "success",
                    massage:" users find successfully",
                    error: null,
                    data: {
                        newUser
                    },
                })
                return
            }
            return next(new Error("user already exists!", 400))
        } catch (error) {
            next(error)
        }
    },

    login: async (req, res, next) => {
        try {
            const { email,password } = req.body;
            const user = await User.findOne({ email: email })
            if(!user){
                return next( new Error("User detail wrong", 400))
            }
            const payload = {
                sub: user.id,
                name: user.name,
                email: user.email,
            }

            const secretKey = config.jwt_secret
            const token = generateToken(payload, secretKey, {
                algorithm: "HS512",
                expiresIn: "1d"
            })

            req.user = user; 
            res.json({
                status: "success",
                message: "Login in successfully",
                error: null,
                data: {
                    user, 
                    token: token
                }
            })
        } catch (error) {
            next(error);
        }
    }
}


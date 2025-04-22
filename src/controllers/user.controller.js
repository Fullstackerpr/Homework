import User from "../models/user.model.js";
import { catchError } from "../utils/error-response.js";
import { userValidator } from "../utils/user.validation.js";
import { decode, encode } from "../utils/bcrypt-encrypt.js";


export class UserController {
    async createUser(req, res) {
        try {
            const {error, value} = userValidator(req.body);
            if(error) {
                throw new Error(`Error on creating user: ${error}`);
            }

            const {name, email, password} = value;
            const hashedPassword = await decode(password, 7);
            const newUser = await User.create({
                name, email, hashedPassword
            });

            return res.status(201).json({
                statusCode: 201,
                message: 'success',
                data: newUser
            });
        } catch (error) {   
            catchError(error, res);
        }
    }

    async getAllUsers(_, res){
        try {
            const users = await User.find();
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: users
            });
        } catch (error) {
            catchError(error, res);
        }
    }


    async getUserById(req, res) {
        try {
            const id = req.params.id;
            const user = await User.findById(id);

            if(!user){
                throw new Error('user not found!');
            }

            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: user
            });
        } catch (error){
            catchError(error, res);
        }
    }

    async updateUserById(req, res) {
        try {
            const id = req.params.id;
            const user = await User.findById(id);

            if(!user){
                throw new Error('user not found!');
            }

            const updateUser = await User.findByIdAndUpdate(id, req.body, {new: true});

            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: updateUser
            });
        } catch(error) {
            catchError(error, res);
        }
    }

    async deleteUserById(req, res) {
        try {
            const id = req.params.id;
            const user = await User.findById(id);

            if(!user){
                throw new Error('user not found!');
            }

            await User.findByIdAndDelete(id);

            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: {}
            });
        } catch (error) {
            catchError(error, res);
        }
    }
}
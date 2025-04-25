import User from "../models/user.model.js";
import { catchError } from "../utils/error-response.js";
import { userValidator } from "../utils/user.validation.js";
import { decode, encode } from "../utils/bcrypt-encrypt.js";
import { successRes } from "../utils/success-response.js";
import { ganarateAccessToken, ganarateRefreshToken } from "../utils/ganarate-token.js";


export class UserController {
    async createUser(req, res) {
        try {
            const {error, value} = userValidator(req.body);
            if(error) {
                catchError(res, 400, 'User validation fail');
            }

            const {name, email, password} = value;
            const hashedPassword = await decode(password, 7);
            const newUser = await User.create({
                name, email, hashedPassword
            });

            successRes(res, 201, newUser);
        } catch (error) {   
            catchError(res, 500, error.message);
        }
    }

    async getAllUsers(_, res){
        try {
            const users = await User.find();
            successRes(res, 200, users);
        } catch (error) {
            catchError(res, 500, error.message);
        }
    }


    async getUserById(req, res) {
        try {
            const id = req.params.id;
            const user = await User.findById(id);

            if(!user){
                catchError(res, 404, 'User not found!')
            }

            
            successRes(res, 200, user);
        } catch (error){
            catchError(res, 500, error.message);
        }
    }

    async updateUserById(req, res) {
        try {
            const id = req.params.id;
            const user = await User.findById(id);

            if(!user){
                catchError(res, 404, 'User not found!');
            }

            const updateUser = await User.findByIdAndUpdate(id, req.body, {new: true});

            successRes(res, 200, user);
        } catch(error) {
            catchError(res, 500, error.message);
        }
    }

    async deleteUserById(req, res) {
        try {
            const id = req.params.id;
            const user = await User.findById(id);

            if(!user){
                catchError(res, 404, 'User not found!');
            }

            await User.findByIdAndDelete(id);

            successRes(res, 200, {});
        } catch (error) {
            catchError(res, 500, error.message);
        }
    }

    async signinUser(req, res) {
        try {
            const {name, password} = req.body;
            const user = await User.findOne({name});

            if(!user){
                catchError(res, 404, 'User not found!');
            }

            const isMatchPassword = await encode(password, user.hashedPassword);
            if(!isMatchPassword){
                catchError(res, 400, 'Invalid password!')
            }

            const payload = {id: user._id, role: user.role};
            const accessToken = ganarateAccessToken(payload);
            const refreshToken = ganarateRefreshToken(payload);
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: true,
                maxAge: 30 * 24 * 60 * 60 * 1000
            });

            successRes(res, 200, accessToken);

        } catch (error) {
            catchError(res, 500, error.message);
        }
    }
}
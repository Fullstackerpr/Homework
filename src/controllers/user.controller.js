import User from "../models/user.model.js";
import { catchError } from "../utils/error-response.js";
import { userValidator } from "../validations/user.validation.js";
import { decode, encode } from "../utils/bcrypt-encrypt.js";
import { successRes } from "../utils/success-response.js";
import {transporter} from '../utils/mailer.js';
import { ganarateAccessToken, ganarateRefreshToken } from "../utils/ganarate-token.js";
import MailMessage from "nodemailer/lib/mailer/mail-message.js";
import { otpGenerator } from "../utils/otp-generetor.js";
import { getChashe, setChache } from "../utils/cache.js";


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

            const otp =  otpGenerator();
            setChache(name, otp);

            const mailMessage = {
                from: process.env.SMTP_USER,
                to: 'bahodirnabijanov782@gmail.com',
                subject: 'online-shop',
                text: otp
            }

            transporter.sendMail(mailMessage, function(err, info){
                if(err){
                    catchError(res, 400, `error on sending to mail ${err}`)
                }else{
                    console.log(info);
                }
            })
    
 
            

            successRes(res, 200, accessToken);

        } catch (error) {
            catchError(res, 500, error.message);
        }
    }

    async signoutUser(req, res){
        try {
            const refreshToken = req.cookies.refreshToken;
            if(!refreshToken){
                catchError(res, 401, 'Refresh token not found');
            };

            const decodedToken = JsonWebTokenError.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);
            if(!decodedToken){
                catchError(res, 401, 'Refresh token expired');
            }

            res.clearCookie('reshreshToken');
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: {}
            });
        
        } catch (error) {
            catchError(res, 500, error.message);
        }

    }

    async confirmSignin(req, res){
        try {
            const {name, otp} = req.body;
            const user = await User.findOne({name});

            if(!user){
                catchError(res, 404, 'User not found!');
            }

            const otpChashe = getChashe(name);
            if(!otpChashe || otp != otpChashe){
                catchError(res, 400, 'OTP expired');
            }

            const payload = {id: user._id, role: user.role};
            const accessToken = ganarateAccessToken(payload);
            const refreshToken = ganarateRefreshToken(payload);
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: true,
                maxAge: 30 * 24 * 60 * 60 * 1000
            });

            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: accessToken
            })
        } catch (error) {
            catchError(res, 500, error.message);
        }
    }
}
import {status} from 'http-status';
import {User} from '../models/index.js';


export const authController = {
    signUp: async (req, res, next) => {
        try {
            const body = req.body;
            const user = await User.findOne(
                {email: body.email},
                'email _id',
            ).exec();

            console.log(user);
            if(!user){
                const newUser = new User(body);

                await newUser.save();
                res.send(newUser);
            }

            res.send('User already exists!');
            return;
        } catch (error){
            next(error);     
        }
    },
    signIn: async (req, res, next) => {
        try {
            const body = req.body;
            const user = await User.findOne({email: body:email});

            if (!user) {
                res.send('User not found!');
                return;
            }

            const validaPass = await user.isValidPassword(body.password);

            console.log({validaPass});
            if(!validaPass){
                res.status(401).send('User detail wrong!');
                return;
            }

            res.send({
                message: 'ok',
                data: user,
            });
        } catch (err){
            next(err);
        }
    },
};
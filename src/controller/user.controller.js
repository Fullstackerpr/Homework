import { User } from "../models/index.js";


export const userController = {
    create: async(req, res, next) => {
        try {
            const body = req.body;
            const user = new User(body);
            await user.save();

            res.json({
                status: 'success!!!',
                message: 'New user created',
                error: null,
                data: {
                    user,
                },
            });
        } catch (error){
            next(error);
        }
    },
};
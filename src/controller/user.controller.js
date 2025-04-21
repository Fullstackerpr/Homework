import { User } from "../models/index.js";


export const userController = {

    getall: async (req, res, next) => {
        try {
            const users = await User.find();
            if (!users || users.length === 0) {
                return next(new Error('Users not found!'));
            }
    
            res.status(200).json({
                status: 'success',
                message: 'Find successfully!',
                error: null,
                data: {
                    users,
                },
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    },


    getById: async(req, res, next) => {
        try {
            const {id} = req.params;
            const user = await User.findById(id);
            
            if (!user) {
                next (Error('User not found!!'), 404);
            }
            res.status(200).json({
                status: 'success',
                message: 'User or id not found',
                error: null,
                data: {
                    user
                },
            });
        } catch (error) {
            next(error);
            console.log(error);
        }
    },


    create: async(req, res, next) => {
        try {
            const body = req.body;
            const newuser = new User(body);
            await newuser.save();

            res.json({
                status: 'success!!!',
                message: 'New user created',
                error: null,
                data: {
                    newuser,
                },
            });
        } catch (error){
            next(error);
            console.log(error);
            
        }
    },


    update: async (req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;
            console.log("Update ID:", id);
            console.log("Body:", body);
    
            const upuser = await User.findById(id);
            console.log("Found User:", upuser);
    
            if (!upuser) {
                return next(new Error('User not found!'));
            }
    
            await User.updateOne({ _id: id }, body);
    
            res.json({
                status: 'success!',
                message: 'User updated',
                error: null,
                data: null,
            });
    
        } catch (error) {
            console.log("Update error:", error);
            next(error);
        }
    },
    


    delete: async (req, res, next) => {
        try {
            const { id } = req.params;
            const deletedUser = await User.findByIdAndDelete(id);
    
            if (!deletedUser) {
                return next(new Error('User not found'));
            }
    
            res.json({
                status: 'success',
                message: 'User deleted',
                error: null,
            });
        } catch (error) {
            console.log("Delete error:", error);
            next(error);
        }
    }
    
};
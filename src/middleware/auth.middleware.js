export const authMiddleware = async (req, res, next) => {
    try {
        const str = (req.header.authorization || "").split(" ")[1] || "";

        const [userEmail, userPassword] = Buffer.from(str, "base64")
            .toString()
            .split(":");

        const user = await User.findOne({ email: userEmail }).exec();

        if (!user) {
            return res.status(401).send('Authentication required!');
        }

        if (
            userEmail &&
            userPassword &&
            userEmail === user.email &&
            userPassword === user.password
        ) {
            return next(); 
        }

        res.status(401).send('Authentication required!');
    } catch (error) {
        next(error);
    }
};

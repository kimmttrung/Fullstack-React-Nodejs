const User = require("../models/user");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const createUserService = async (name, email, password) => {
    try {
        // hash user password
        const hashPassword = await bcrypt.hash(password, saltRounds);

        // save user to database
        let result = await User.create({
            name: name,
            email: email,
            password: hashPassword,
            role: "USER"

        })
        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
}
const handleLoginService = async (email1, password) => {
    try {
        // fetch user by email
        const user = await User.findOne({ email: email1 })
        if (user) {
            // compare pasword
            const isMatchPassword = await bcrypt.compare(password, user.password);
            if (!isMatchPassword) {
                return {
                    EC: 2,
                    EM: "Password không hợp lệ"
                }
            } else {
                // create an access token
                return ('create an access token')

            }
        } else {
            return {
                EC: 1,
                EM: "Email password không hợp lệ"
            }
        }


        const hashPassword = await bcrypt.hash(password, saltRounds);

        // save user to database
        let result = await User.create({
            name: name,
            email: email,
            password: hashPassword,
            role: "USER"

        })
        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
}





module.exports = {
    createUserService,
    handleLoginService
}
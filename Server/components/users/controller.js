//tầng giao tiếp xử lí data

const async = require('hbs/lib/async');
const userService = require('./service');
const bcrypt = require('bcryptjs');

exports.login = async (email, password) => {
    const user = await userService.login(email);
    // if(user && user.password == password){
    //     return user;
    // }
    // return null;
    if(!user) return false;
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) return null;
    return { _id: user._id, email: user.email };
}

exports.register = async (email, password, confirm_password) => {
    if (password != confirm_password) return null;
    let user = await userService.login(email);
    if (user) return null;

    const hash = await bcrypt.hash(password, await bcrypt.genSalt(10));
    user = await userService.register(email, hash);
    return { _id: user._id };
}
//tầng giao tiếp với database 

const async = require('hbs/lib/async');
const userModel = require('./model');

exports.login = async (email) => {
    // code cứng
    // const user = data.filter(item => item.email == email)[0];
    // return user;

    const user = await userModel.findOne({ email: email }, 'id email password');
    return user;
}

exports.register = async (email, password) => {
    const user = new userModel({ email, password });
    return await user.save();
}







//giả lập data ( lấy data từ database)
var data = [
    { id: 1, email: 'admin@gmail.com', password: '123', name: 'Bum' }
]
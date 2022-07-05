var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken');
const userController = require('../components/users/controller');
const productController = require('../components/products/controller');
const authentication = require('../middle/authentication');
//http://localhost:3000/api/login
router.post('/login', async function (req, res, next) {
  const { email, password } = req.body;
  //thực hiện kiểm tra đăng nhập
  const result = await userController.login(email, password);
  console.log(result, email, password);
  if (result) {
    //secret key, token lấy ở đây
    const token = jwt.sign(
      {
        id: result._id,
        email: result.email,
      }, 'bum', { expiresIn: '2h' });
    // req.session.token = token;
    //nếu đúng chuyển qua trang sản phẩm
    res.json({ status: true, result, token });
  } else {
    //nếu sai quay trở lại đăng nhập
    res.json({ status: false });
  }
});

//http://localhost:3000/api/register
router.post('/register', async function (req, res, next) {
  const { email, password, confirm_password } = req.body;
  const result = await userController.register(email, password, confirm_password);
  if (result) {
    res.json({ status: true });
  } else {
    res.json({ status: false });
  }
});

//http://localhost:3000/api/products
// thêm middle kiểm tra login
// khi nào login, có token thì mới lấy được danh sách sản phẩm
router.get('/products',[authentication.checkToken], async function (req, res, next) {
  //lây danh sách sản phẩm từ database
  const products = await productController.getProducts();
  res.json(products);
});

//http://localhost:3000/api/products/:id/detail
// thêm middle kiểm tra login
// khi nào login, có token thì mới lấy được danh sách sản phẩm
router.get('/products/:id/detail',[authentication.checkToken], async function (req, res, next) {
  const {id} = req.params;
  const product = await productController.getProductById(id);
  res.json(product);
});

module.exports = router;
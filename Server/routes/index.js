var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken');
const userController = require('../components/users/controller');
const authentication = require('../middle/authentication');

/**
 * 1. đăng nhập
 * http://localhost:3000/dang-nhap
 * get: chạy ra login
 * post: thực hiện login
 *
 * 2. đăng xuất
 * http://localhost:3000/dang-xuat
 * get: chạy đăng xuất
 * 
 * 3. sản phẩm
 * http://localhost:3000/san-pham
 * get: xuất danh sách sản phẩm
 * post: thêm mới sản phẩm
 * 
 * 4. chi tiết 1 sản phẩm
 * http://locahost:3000/san-pham/:id/edit
 * get: lấy thông tin chi tiết 1 sản phẩm
 * put: cập nhật thông tin sản phẩm
 * 
 * 5. xóa sản phẩm
 * http://localhost:3000/san-pham/:id/delete
 * delete: xóa 1 sản phẩm 
 * 
 * 6. thống kê
 * http://localhost:3000/san-pham/thong-ke
 * get: lấy thống kê sản phẩm, vẽ biểu đồ
 * 
 */


/*
* 1. đăng nhập
* http://localhost:3000/dang-nhap
* method: get
* detail: chạy ra login
* author: Bình
* date: 17/3/2022
*/
router.get('/dang-nhap', [authentication.checkLogin], function (req, res, next) {
  res.render('login', {});
});


/*
* http://localhost:3000/dang-nhap
* method: post
* detail: thực hiện login
* author: Bình
* date: 17/3/2022
*/
router.post('/dang-nhap', async function (req, res, next) {
  const { email, password } = req.body;
  //thực hiện kiểm tra đăng nhập
  const result = await userController.login(email, password);
  console.log(result, email, password);
  if (result) {
    //secret key
    const token = jwt.sign(
      {
        id: result._id,
        email: result.email,
      }, 'bum', {expiresIn: '2h'});
    req.session.token = token;
    //nếu đúng chuyển qua trang sản phẩm
    res.redirect('/san-pham');
  } else {
    //nếu sai quay trở lại đăng nhập
    res.redirect('/dang-nhap');
  }
});

/*
* 2. đăng xuất
* http://localhost:3000/dang-xuat
* method: get
* detail: chạy đăng xuất
* author: Bình
* date: 17/3/2022
*/
router.get('/dang-xuat',[authentication.checkLogin], function (req, res, next) {
  req.session.destroy(function (err) {
    //nếu đăng xuất thành công ra trang đăng nhập
    res.redirect('/dang-nhap');
  })
});
module.exports = router;

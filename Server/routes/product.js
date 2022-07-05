var express = require('express');
var router = express.Router();


const productController = require('../components/products/controller');
const categoryController = require('../components/categories/controller');
const upload = require('../middle/upload');
const authentication = require('../middle/authentication');

/*
* 3. sản phẩm
* https://bumbled-mob402.herokuapp.com/san-pham
* method: get
* detail: xuất danh sách sản phẩm
* author: Bình
* date: 17/3/2022
*/
router.get('/',[authentication.checkLogin], async function (req, res, next) {
  //lây danh sách sản phẩm từ database
  const data = await productController.getProducts();
  res.render('product', { product: data });
});

/*
* http://localhost:3000/san-pham/them-moi
* method: get
* detail: hiển thị trang thêm mới sản phẩm
* author: Bình
* date: 22/3/2022
*/
router.get('/them-moi',[authentication.checkLogin], async function (req, res, next) {
  // thêm mới sản phẩm vào database
  const category = await categoryController.getCategories();
  res.render('themsanpham', { category: category });
});


/*
* http://localhost:3000/san-pham/
* method: post
* detail: thêm mới sản phẩm
* author: Bình
* date: 17/3/2022
*/

//middleware
router.post('/', [upload.single('image'),authentication.checkLogin], async function (req, res, next) {
  // thêm mới sản phẩm vào database
  let { body, file } = req;
  let image = '';
  if (file) {
    image = `https://bumbled-mob402.herokuapp.com/images/${file.filename}`;
  }
  body = { ...body, image: image };
  await productController.insert(body);
  res.redirect('/san-pham');
});


/*
* http://locahost:3000/san-pham/:id/edit
* method: get
* detail: lấy thông tin chi tiết 1 sản phẩm
* author: Bình
* date: 17/3/2022
*/
router.get('/:id/edit',[authentication.checkLogin], async function (req, res, next) {
  // lấy thông tin chi tiết 1 sản phẩm
  const { id } = req.params;
  const product = await productController.getProductById(id);
  const category = await categoryController.getCategoriesForOneProduct(product.category._id);
  res.render('detail', { product: product, category: category });
});


/*
* http://locahost:3000/san-pham/:id/edit
* method: post
* detail: cập nhật thông tin sản phẩm
* author: Bình
* date: 17/3/2022
*/
router.post('/:id/edit', [upload.single('image'),authentication.checkLogin], async function (req, res, next) {
  // cập nhật sản phẩm vào database
  let { body, file, params } = req;
  delete body.image;

  if (file) {
    let image = `https://bumbled-mob402.herokuapp.com/images/${file.filename}`;
    body = { ...body, image: image };
  }
  await productController.update(params.id, body);
  res.redirect('/san-pham');
});



/*
* 5. xóa sản phẩm
* http://localhost:3000/san-pham/:id/delete
* method: delete
* detail: xóa 1 sản phẩm
* author: Bình
* date: 17/3/2022
*/
router.delete('/:id/delete',[authentication.checkLogin], async function (req, res, next) {
  // thêm mới sản phẩm vào database
  const { id } = req.params;
  await productController.delete(id);

  res.json({ result: true });
});



/*
* 6. thống kê
* http://localhost:3000/san-pham/thong-ke
* method: get
* detail: thống kê sản phẩm
* author: Bình
* date: 17/3/2022
*/

router.get('/thong-ke', async function (req, res, next) {
  //lây danh sách sản phẩm từ database
  res.render('thongke');
});

module.exports = router;
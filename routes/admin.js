const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/IsAuthenticatedAdmin');

const router = express.Router();

// /admin/add-product => GET
// router.get('/add-product', adminController.getProducts);

// /admin/products => GET

// /admin/add-product => POST
router.post('/add-product',isAuth, adminController.createProuct);
router.post('/edit-product', isAuth, adminController.postEditProduct);

router.post('/delete-product',isAuth,adminController.postDeleteProduct);
router.get('/orders', isAuth, adminController.getOrders);
module.exports = router;

const express = require('express');
const router = express.Router();

const jwtAuthMiddleware = require('../jwtAuth/middlewares/AuthMiddleware');
const categoryController = require('../Controllers/categoryController');
const inventoryController = require('../Controllers/inventoryController');


router.post('/user/category/add/:userId', jwtAuthMiddleware,categoryController.addCategory);

router.get('/user/category/list/:userId',jwtAuthMiddleware,categoryController.viewCategoryList);

router.post('/user/category/edit/:userId/:category_id', jwtAuthMiddleware,categoryController.updateCategory);

router.post('/user/category/delete/:userId/:category_id', jwtAuthMiddleware,categoryController.removeCategory);

router.post('/user/inventory/add/:userId',jwtAuthMiddleware,inventoryController.addItem);

router.get('/user/inventory/list/:userId',jwtAuthMiddleware,inventoryController.viewInventoryList);

router.post('/user/inventory/edit/:userId/:inventory_id',jwtAuthMiddleware,inventoryController.updateInventory);

router.post('/user/inventory/delete/:userId/:inventory_id',jwtAuthMiddleware,inventoryController.removeInventory);

router.post('/user/inventory/search/:userId/:inventory_name',jwtAuthMiddleware,inventoryController.searchInventoryItem);

module.exports = router;
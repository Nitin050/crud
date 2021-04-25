const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');


router.post('/', userController.create);
router.get('/:Id', userController.findOne);
router.put('/:Id', userController.update);
router.delete('/:Id', userController.delete);
module.exports = router;
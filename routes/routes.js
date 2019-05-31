const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

// request the controller file
const controller = require('../controller/controller');

// set up bodyparser middleware
// helps you use the body object in requests
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json())

router.get('/', controller.giveReply);
router.post('/pay',controller.lipaNaMpesa);
router.post('/paymentstatus', controller.getTransactionStatus);


module.exports = router;
const express = require('express');
const router = express.Router();

// request the controller file
const controller = require('../controller/mpesaController');

/*
set bodyparser middleware
enables use of the req.body object
and also to parse incoming requests (req) as json, string, array etc...

N/b: body-parser was re-added to express
So you don't have to explicitly import it
*/
router.use(express.json());

/* 
also allow x-www-form-urlencoded (strings, arrays etc..)
*/
router.use(express.urlencoded({extended: true})); 

// The various routers
router.get('/',controller.goHome);
router.post('/pay', controller.lipaNaMpesa);
router.post('/paymentstatus', controller.getTransactionStatus);
router.post('/getWebHook',controller.getWebHook);

module.exports = router;
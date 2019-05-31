const Schema = require('../model/model');

// get extra modules
const request = require("request");
const moment = require("moment");
const base64 = require("base-64");

// Global variables and methods

// Global variables
// Explicit values are in the .env file which i gitignore-d
const consumer_key = process.env.CONSUMER_KEY;
const consumer_secret = process.env.CONSUMER_SECRET;
const url = process.env.SAF_URL //change this after going live
// let auth = "Basic " + new Buffer.from(consumer_key + ":" + consumer_secret).toString("base64");
// let auth = "Basic " + new Buffer(consumer_key + ":" + consumer_secret).toString("base64");
const url_for_api = process.env.URL_FOR_API//change this after going live
const shortCode = process.env.SHORTCODE //this is the testing shortcode change it to your own after going live
const passkey = process.env.PASSKEY //change this after going live
const callBackURL = process.env.CALL_BACK_URL //your callback url for which to pick the json data returned
const accountReference = process.env.ACCOUNT_REFERENCE //any specific reference
const transactionDesc = process.env.TRANSACTION_DESCRIPTION;
let timestamp = moment().format("YYYYMMDDHHmmss");
let password = base64.encode(shortCode + passkey + timestamp);

// Global variables

// Global get token function
function getToken(tokenParam) {
    let oauth_token;
    request({
        url: url,
        auth: {
            user: consumer_key,
            password: consumer_secret
        }
    },
        function (error, response, body) {

            // parse body to json object
            let oauth_body = JSON.parse(body);

            // extract access token from the parsed object
            oauth_token = oauth_body.access_token;

            // pass it to a callback function so it can be accessed externally
            tokenParam(oauth_token);
        }
    );
};

// Global save data using schema 

// Global lipa na mpesa function
lipa = ({ amount, phoneNumber, callback_function }) => {
    // use the global get token method to get authorisation token
    getToken(function (token) {
        let oauth_token = token;
        let auth_for_api = "Bearer " + oauth_token;

        // use the request library to querry HTTP to the safaricom url
        // using given payload 
        request({
            method: "POST",
            url: url_for_api,
            headers: {
                Authorization: auth_for_api
            },
            json: {
                BusinessShortCode: shortCode,
                Password: password,
                Timestamp: timestamp,
                TransactionType: "CustomerPayBillOnline", //this can change depending on paybill or till number
                Amount: amount,
                PartyA: phoneNumber,
                PartyB: shortCode,
                PhoneNumber: phoneNumber,
                CallBackURL: callBackURL,
                AccountReference: accountReference,
                TransactionDesc: transactionDesc
            }
        },
            // the callback function to receive the result
            function (error, response, body) {
                callback_function(body);
            }
        );
    });
}

// Global check lipa na mpesa progress function

// get the status of a pending lipa na mpesa transaction
//Lipa na M-Pesa Online Query Request
getTheTransactionStatus = ({ CheckoutRequestID, callback_function }) => {

    // get authorisation token
    getToken(function (token) {
        let request = require("request"),
            oauth_token = token,
            url2 = "https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query";
        auth = "Bearer " + oauth_token;

        request({
            method: "POST",
            url: url2,
            headers: {
                Authorization: auth
            },
            json: {
                BusinessShortCode: shortCode,
                Password: password,
                Timestamp: timestamp,
                CheckoutRequestID: CheckoutRequestID
            }
        },
            function (error, response, body) {
                // TODO: Use the body object to extract the response
                callback_function(body);
            }
        );
    });
};

exports.giveReply = (req, res, next) => {
    res.send("i am a yamtu!");
};

exports.lipaNaMpesa = (req, res, next) => {

    // the lipa na mpesa method
    // processes mpesa payment
    // using passed in phone number and amount
    // called in the '/pay' router

    let amount = req.body.amount; // get the amount passed from the user
    let phoneNumber = req.body.phonenumber; //get the phone number passed from the user

    lipa({
        amount,
        phoneNumber,
        callback_function: (body) => {
            let CheckoutRequestID = body.CheckoutRequestID;

            const Schema2 = new Schema({
                MerchantRequestID: body.MerchantRequestID,
                CheckoutRequestID: CheckoutRequestID,
                ResponseCode: body.ResponseCode,
                ResponseDescription: body.ResponseDescription,
                CustomerMessage: body.CustomerMessage,
            });
            Schema2
                .save()
                .then(() => {

                    // invoke method to check progress here
                    // getTheTransactionStatus(CheckoutRequestID); 

                    // send the body as a response
                    res.status(200).send(
                        {
                            "message": "success",
                            "CheckoutRequestID": `${CheckoutRequestID}`
                        })
                })
                .catch(err => {
                    res.status(400).send(err);
                })
        }
    })
}

// Get the transaction status
exports.getTransactionStatus = (req, res, next) => {

    let CheckoutRequestID = req.body.CheckoutRequestID

    getTheTransactionStatus({
        CheckoutRequestID: CheckoutRequestID,
        callback_function: (body) => {
            res.send(body);
        }
    });
}
var request = require('request'),
  oauth_token = "ACCESS_TOKEN",
  url = "https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query"
  auth = "Bearer " + oauth_token;

  request(
    {
      method: 'POST'
      url : url,
      headers : {
        "Authorization" : auth
      },
      json : {
        "BusinessShortCode": " " ,
        "Password": " ",
        "Timestamp": " ",
        "CheckoutRequestID": " "
        }
    },
    function (error, response, body) {
      // TODO: Use the body object to extract the response
      console.log(body)
    }
  )
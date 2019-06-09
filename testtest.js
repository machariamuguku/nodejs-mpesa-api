let testest = {
    "Body": {
        "stkCallback": {
            "MerchantRequestID": "19465-780693-1",
            "CheckoutRequestID": "ws_CO_27072017154747416",
            "ResultCode": 0,
            "ResultDesc": "The service request is processed successfully.",
            "CallbackMetadata": {
                "Item": [
                    {
                        "Name": "Amount",
                        "Value": 1
                    },
                    {
                        "Name": "MpesaReceiptNumber",
                        "Value": "LGR7OWQX0R"
                    },
                    {
                        "Name": "Balance"
                    },
                    {
                        "Name": "TransactionDate",
                        "Value": 20170727154800
                    },
                    {
                        "Name": "PhoneNumber",
                        "Value": 254721566839
                    }
                ]
            }
        }
    }
}

console.log(testest.Body.stkCallback.CallbackMetadata.Item)
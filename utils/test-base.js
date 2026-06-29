const { test } = require('@playwright/test');

exports.customtest = test.extend(
    {
        testDataForOrder : {
            username : "anshika@gmail.com",
            password : "Iamking@000",
            productName : "Zara Coat 3" 
        }
    }
)
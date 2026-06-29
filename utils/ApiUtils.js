class ApiUtils{


    constructor(apiContext,loginPayload){
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken(){
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data:this.loginPayload
            })

               const loginResponseJson = await loginResponse.json();
               const token = loginResponseJson.token;
               
               return token;
    }

    async createOrder(orderPayload){

         let response = {};
         response.token = await this.getToken();
         const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data : orderPayload,
                headers :{
                    "authorization" : response.token,
                    "content-type": "application/json"
                }
            }
           )
           const orderResponseJson = await orderResponse.json();
           const orderId = orderResponseJson.orders[0];
           response.orderId = orderId;
           
           return response;
        
    }

    async getTokenForEvent(){
        const loginResponse = await this.apiContext.post("https://api.eventhub.rahulshettyacademy.com/api/auth/login",
            
            {
                data:this.loginPayload
            })

               const loginResponseJson = await loginResponse.json();
               const token = loginResponseJson.token;
               
               return token;
    }



}

module.exports = {ApiUtils};
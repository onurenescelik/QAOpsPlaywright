const {test,expect} = require('@playwright/test');
const {Event} = require('./helpers/Event');
const YahooUser = {email:"onurtest@yahoo.com",password:"Test1224."};
const GmailUser = {email:"onurtesttt@gmail.com",password:"Test1224."};
const BASE_URL = 'https://eventhub.rahulshettyacademy.com';
const API_URL = 'https://api.eventhub.rahulshettyacademy.com/api';

test('Security Test: Gmail user should not access Yahoo user bookings', async ({page, request}) => {
    
    // --- STEP 1: Login as Yahoo User via API ---
    const loginRes = await request.post(`${API_URL}/auth/login`, {
        data: {
            email: YahooUser.email,    
            password: YahooUser.password
        }
    });
    
    expect(loginRes.ok()).toBeTruthy();
    const loginJson = await loginRes.json();
    const YahooToken = loginJson.token;

    //Step 2 — Fetch events via API to get a valid event ID
    const listOfEvents = await request.get(`${API_URL}/events`, {
        headers:{
           'Authorization': `Bearer ${YahooToken}`
        },
        params:{
            category:"Conference",
            page:1
        }

        
    })
    expect(listOfEvents.ok()).toBeTruthy();
    const listOfEventsJSON = await listOfEvents.json();
    const eventId = listOfEventsJSON.data[0].id;

    //Step 3 — Create a booking via API as Yahoo user
    const bookingRes = await request.post(`${API_URL}/bookings`,{
        headers:{
            'Authorization': `Bearer ${YahooToken}`
         },

         data: {
            eventId:eventId,
            customerName:"onur test",
            customerEmail:YahooUser.email,
            customerPhone: "9055555555",
            quantity:1
         }
    })
    expect(bookingRes.ok()).toBeTruthy();
    const bookingResJSON = await bookingRes.json();
    const bookingId = bookingResJSON.data.id;

    const event = new Event(page,GmailUser);
    await event.loginAs(BASE_URL);

    const targetUrl = `${BASE_URL}/bookings/${bookingId}`;
    await page.goto(targetUrl, { waitUntil: 'networkidle' });

   await expect(page.getByText("Access Denied")).toBeVisible();
   await expect(page.getByText("You are not authorized to view this booking")).toBeVisible();




});


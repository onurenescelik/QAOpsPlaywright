// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { workers } from 'node:cluster';
import { trace } from 'node:console';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({  // ayarlar bir değişkene atanır 
  testDir: './tests',
  retries: 1, // fail olan testlerin tekrar calıstırılması
  workers: 3, //default 5 test aynı anda(paralel) calısır normalde
  timeout:30 *1000,  //her adım icin gecerli bekleme
  expect:{
    timeout: 5000 //doğrulamalarda kullanılacak bekleme
  },

  reporter : 'html',
  projects : [

    {
      name : 'safari',
      use: {
   
      browserName :  'webkit',
      headless: true , 
      screenshot : 'off',
      trace : 'on', //retain-on-failure -> bu sekilde olursa yalnızca fail olan testler için oluşturulacaktır.
                                  //on -> butun testler ıcın gecerlı
      ...devices['iPhone 11'], //secilen modele göre pencere açılır
    }
  },
  {
    name : 'chrome',
    use: {
   
      browserName :  'chromium',
      headless: false ,
      screenshot : 'on',
      video : 'retain-on-failure',
      ignoreHttpErrors : true,
      permissions : ['geolocaiton'],
      trace : 'retain-on-failure',
      //viewport : {width:720,height:720}
    }
  
  }
  ],
});

module.exports = config  // yukarıdaki değişkene atanan bütün verileri buraya export ediyoruz.
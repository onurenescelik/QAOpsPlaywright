// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { trace } from 'node:console';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({  // ayarlar bir değişkene atanır 
  testDir: './tests',
  retries : 2,
  timeout:30 *1000,  //her adım icin gecerli bekleme
  expect:{
    timeout: 5000 //doğrulamalarda kullanılacak bekleme
  },

  reporter : 'html',
 use: {
   
    browserName :  'chromium',
    headless: false , // default true ancak burda configde false yaptık yani her test calıstıgında browser acıp test yurutulecek. Komutta Ozellikle headless denirse acılmaz
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    screenshot : 'on',
    trace : 'retain-on-failure' //retain-on-failure -> bu sekilde olursa yalnızca fail olan testler için oluşturulacaktır.
                                //on -> butun testler ıcın gecerlı
  },

});

module.exports = config  // yukarıdaki değişkene atanan bütün verileri buraya export ediyoruz.
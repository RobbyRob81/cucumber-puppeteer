const { BeforeAll, AfterAll, After, setDefaultTimeout } = require("cucumber");
const puppeteer = require("puppeteer");

const { DEFAULT_TIMEOUT, DEFAULT_VIEWPORT } = require("./support/constants");
const scope = require("./support/scope");

const { NODE_ENV } = process.env;

BeforeAll(async () => {
  setDefaultTimeout(DEFAULT_TIMEOUT);

  if (NODE_ENV === "production") {
    scope.browser = await puppeteer.launch(
      process.env.DEBUG
        ? {
          headless: false,
          slowMo: 20,
          devtools: false,
          defaultViewport: DEFAULT_VIEWPORT,
          args: ['--incognito']
        } : {
          defaultViewport: DEFAULT_VIEWPORT,
          headless: true,
          devtools: false,
          executablePath: '/usr/bin/chromium-browser',
          args: [
            // '--no-sandbox',
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
            '--disable-web-security',
            '--disable-gpu',
            '--incognito'
          ]
        }  
    );
  } else {
    scope.browser = await puppeteer.launch({
      defaultViewport: DEFAULT_VIEWPORT
    });
  }
  scope.context = await scope.browser.createIncognitoBrowserContext();

});

After(async scenarioResult => {
  if (scope.browser && scope.currentPage) {
    await scope.currentPage.close();

    scope.currentPage = null;
    scope.origin = null;
    scope.savedHref = null;
  }
});

// AfterAll(async () => {
//   if (scope.browser) await scope.browser.close();
// });
AfterAll(async () => {
  if (scope.context) await scope.context.close();
  if (scope.browser) await scope.browser.close();
});

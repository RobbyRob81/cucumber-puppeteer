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
          headless: true,
          slowMo: 20,
          devtools: false,
          defaultViewport: DEFAULT_VIEWPORT
        } : {
          defaultViewport: DEFAULT_VIEWPORT,
          headless: true,
          devtools: false,
          // executablePath: '/usr/bin/chromium-browser',
          args: [
            // '--no-sandbox',
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
            '--disable-web-security',
            '--disable-gpu'
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

// AfterScenario(scenarioResult => {
  // console.log("scenarioResult: ", scenarioResult.scenario.result)
  // e currently use scenarioResult.status, scenarioResult.scenario.uri and scenarioResult.scenario.line.
  // let message = testCase.sourceLocation.uri + ":" + testCase.sourceLocation.line + " "
  // console.log(message)
  //  console.log(scenarioResult.status)
  //  console.log(scenarioResult.scenario.uri)
  //  console.log(scenarioResult.scenario.line)
  // if(scenarioResult.scenario.result.status) {
  //     console.log(scenarioResult.scenario.result.status)
  //   // console.log(scenarioResult)
  // }

// })




After(async scenarioResult => {
//  if(scenario.result){
//    console.log(scenario)
//    console.log(JSON.stringify(scenario))
//  }
  // console.log(scenarioResult.status)
  //  console.log(scenarioResult.scenario.uri)
  //  console.log(scenarioResult.scenario.line)
  // console.log(scenarioResult.pickle)

  if (scope.browser && scope.currentPage) {
    await scope.currentPage.close();

    scope.currentPage = null;
    scope.origin = null;
    scope.savedHref = null;
  }
});

AfterAll(async () => {
  if (scope.context) await scope.context.close();
  if (scope.browser) await scope.browser.close();
});

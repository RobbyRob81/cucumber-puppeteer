const { Given, When, Then } = require("cucumber");

const { Maybe } = require("../utils");
const { getUrl } = require("../support/url");
const { getLocation } = require("../support/location");
const { getLocaleHeaders } = require("../support/locale");
const { getDevice } = require("../support/device");
const { compose, flow, flowArgs } = require("../utils");
const {
    clickOn,
    closePage,
    compareElementsCount,
    countElements,
    delay,
    getItemInnerText,
    getItems,
    getItemsInnerText,
    getListOfNumbers,
    getReceiverNumber,
    hoverOn,
    hrefEquals,
    hrefIncludes,
    missingElement,
    openPage,
    saveHref,
    seeElement,
    setDevice,
    setHeaders,
    setLocation,
    shouldBeOnPage,
    srcEquals,
    styleEquals,
    textEquals,
    textIncludes,
    typeIn,
    urlEquals,
    wait
} = require("../support/actions");

// Given 
Given(/a user in the (en-us) locale/, async locale => compose(setHeaders, getLocaleHeaders)(locale));
Given(/a user on a (desktop|tablet|mobile) device/, async device => compose(setDevice, getDevice)(device));

Given(/the (.+) domain and the (.*) path/, async (domain, path) => compose(openPage,getUrl)(domain, path));
Given(/the app loads/, async () => compose( openPage, getUrl)());

// When 
When(/I click the (.+)/, async name => clickOn(name));
When(/I go to (.+)/, async url => openPage(url));
When(/I hover the (.+)/, async name => hoverOn(name));
When(/I set the user location to (.+)/, async location => compose(setLocation, getLocation)(location));
When(/I save the HREF of the (.+)/, async name => saveHref(name));

When(/I focus the (.+) and type (.+)/, async (name, query) => {
    await clickOn(name);
    return typeIn(name, query);
});

When(/I search for (\"([^\"]*)\") text, (\"([^\"]*)\") caller id, (\"([^\"]*)\") caller name, and (\"([^\"]*)\") callee number/, async (
  transcriptText,
  callerId,
  callerName,
  calleeNumber
  ) => {
    if(transcriptText.length) {
      await clickOn('transcript text input');
      await typeIn('transcript text input', transcriptText)
    }
    if(callerId.length) {
      await clickOn("caller id input")
      await typeIn('caller id input', await getItemInnerText('caller id'))
    }
    if (calleeNumber.length) {
      await clickOn("callee number input");
      console.log(getListOfNumbers("table td:nth-child(4)"))
      // const numbers = flowArgs(getItems, getItemsInnerText)("table td:nth-child(4)")
      // console.log(await numbers)
      // let lists = await getItemInnerText("table td:nth-child(4)");
      // console.log(lists);
      
     
      await typeIn('callee number input', await getReceiverNumber(calleeNumber))
    }
    // console.log("transText", transcribeText.length)
    // console.log("callerId", callerId)
    // console.log("callerName", callerName)
    // console.log("calleeName:", calleeName)
    
    // await clickOn('caller id input')
    await clickOn('search button');
  });

// Then 
Then(/(\d+) (.+)s* should be visible/, async (count, name) => await countElements(count, name));
Then(/(more|less) than (\d+) (.+)s* should be displayed/,async (operator, count, name) => compareElementsCount(name, operator, count));

Then('I wait for {int} seconds', { timeout: 60 * 1000 }, wait);
Then(/I choose a (.+) inner text from the view/, async text => getItemInnerText(text))
Then(/I should be on the (.+) page/, async page => shouldBeOnPage(page));

Then(/the (.+) should be displayed/, async name => await seeElement(name));
Then(/the (.+) style for the (.+) should be (.+)/, async (attr, name, val) => styleEquals(attr, name, val));

Then(/the HREF for the (.+) should be '(.+)'/, async (name, href) => hrefEquals(name, href));
Then(/the HREF for the (.+) should include '(.+)'/, async (name, href) => hrefIncludes(name, href));

Then(/the SRC for the (.+) should be '(.+)'/, async (name, src) => srcEquals(name, src));
Then(/the text for the (.+) should be '(.+)'/, async (name, text) => textEquals(name, text));
Then(/the text for the (.+) should include (.+)/, async (name, text) =>textIncludes(name, text));
Then(/the URL should equal the saved HREF/, async () => urlEquals());

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
    getReceiverNumber,
    hoverOn,
    hrefEquals,
    hrefIncludes,
    missingElement,
    openPage,
    querySteps,
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
const dateReg = (/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/im);
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

Given(/I login/, async => compose(getUserName, getPassword, login))

When(/I focus the (.+) and type (.+)/, async (name, query) => {
    await clickOn(name);
    return typeIn(name, query);
});

When(/I search for (\"([^\"]*)\") transcript, (\"([^\"]*)\") caller id, (\"([^\"]*)\") caller name, (\"([^\"]*)\") receiver number, and (\"([^\"]*)\") from date/,  async (
  transcriptText,
  callerId,
  callerName,
  receiverNumber,
  fromDate
  ) => {
    if (transcriptText.length) {
      await clickOn('transcript text input');
      await typeIn('transcript text input', transcriptText)
    }
    if (callerId.length) {
      await clickOn("caller id input")
      const id = await getItemInnerText('caller id');
      await typeIn('caller id input', await id.match(/(\d)\w+/g))
    }
    if (receiverNumber.length) {
      await clickOn("receiver number input");
      const number = await getItemInnerText(receiverNumber);
      await typeIn('receiver number input', await number.replace(/\W+/g,""));
    } 
    if (callerName.length) {
      await clickOn("caller name input");
      const callerName = await getItemInnerText('caller name');
      await typeIn('caller name input', callerName);
    }
    // if (fromDate.length) {
    //   // const [month, day, year] = fromDate.split("/");
    //   await clickOn('date range from input');
    //   await clickOn('month and year label');
    //   await clickOn('year label');
    //   let year = await _getItemWithText('2014')
    //   await clickOn(year)
    //   await clickOn('date range from input label');
    // }
    
    await clickOn('search button');
  });

// Then 
Then(/(\d+) (.+)s* should be visible/, async (count, name) => await countElements(count, name));
Then(/(more|less) than (\d+) (.+)s* should be displayed/,async (operator, count, name) => compareElementsCount(name, operator, count));
// Then('I should be on the {string} page', shouldBeOnPage);

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

Then(/the caller name (\"([^\"]*)\") should match/, async name => console.log())

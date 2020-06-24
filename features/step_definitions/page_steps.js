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

// Given 
Given(/a user in the (en-us) locale/, async locale => compose(setHeaders, getLocaleHeaders)(locale));
Given(/a user on a (desktop|tablet|mobile) device/, async device => compose(setDevice, getDevice)(device));

Given(/the (.+) domain and the (.*) path/, async (domain, path) => compose(openPage,getUrl)(domain, path));
Given(/the app loads/, async () => compose( openPage, getUrl)());

// When do x
When(/I hover the (.+)/, async name => hoverOn(name));
When(/I click the (.+)/, async name => clickOn(name));
When(/I save the HREF of the (.+)/, async name => saveHref(name));

// Location
When(/I set the user location to (.+)/, async location => compose(setLocation, getLocation)(location));

// When I go to x
When(/I go to (.+)/, async url => openPage(url));

Given(/I login/, async => compose(getUserName, getPassword, login))
// or make it DRY by doing this:
// Given('I login', async () => {
// 	await visitHomepage();
// 	await clickOnItem('Login');
// 	await takenToPage('login');
// 	await fillInFormField('identifier', email);
// 	await fillInFormField('password', password);
// 	await pressButton('Login');
// 	return await shouldBeOnPage('dashboard');
// });

//When a user does x
When(/I focus the (.+) and type (.+)/, async (name, query) => {
    await clickOn(name);
    return typeIn(name, query);
});

// Then 
Then(/(\d+) (.+)s* should be visible/, async (count, name) => await countElements(count, name));

Then(/(more|less) than (\d+) (.+)s* should be displayed/,async (operator, count, name) => compareElementsCount(name, operator, count));

Then('I should be on the {string} page', shouldBeOnPage);

Then('I wait for {int} seconds', { timeout: 60 * 1000 }, wait);
Then(/I choose a (.+) inner text from the view/, async text => getItemInnerText(text))

Then(/I should be on the (.+) page/, async page => shouldBeOnPage(page));

Then(/the (.+) should be displayed/, async name => await seeElement(name));

Then(/the (.+) style for the (.+) should be (.+)/, async (attr, name, val) => styleEquals(attr, name, val));

// Link Validation
Then(/the HREF for the (.+) should be '(.+)'/, async (name, href) => hrefEquals(name, href));
Then(/the HREF for the (.+) should include '(.+)'/, async (name, href) => hrefIncludes(name, href));

// Text Validation
Then(/the text for the (.+) should be '(.+)'/, async (name, text) => textEquals(name, text));

Then(/the text for the (.+) should include (.+)/, async (name, text) =>textIncludes(name, text));

// URL Validation
Then(/the URL should equal the saved HREF/, async () => urlEquals());


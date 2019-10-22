
const COMMON_UI_SELECTORS = {
    "logout link": "a[href^='/logout']",
    "nav bar": ".navbar",
    "nav drop down": ".navbar-dropdown",
    "no results text": '.p-3',
    "pagination element": ".pagination",
}

const CALL_LIST_SELECTORS = {
    'calls': '#cog-call-table-body > tr',
    'call list': "#cog-call-table-body",
    'call list items': 'tbody > tr'
}

const CALLER_SELECTORS = {
    "caller id": ".cog-table-double-row:nth-child(3) > div:nth-child(1)",
    "caller id input": "input[id=resident-id]",
}

const CALLEE_SELECTORS = {
    "caller name input": "input[placeholder*='Name']",
    "callee number": "table tr td:nth-child(4)",
    "callee numbers": "table td:nth-child(4)"
}

const FORM_SELECTORS = {
    "clear button": "button[type=clear]",
    "form date input": '#call-search-date-from-input',
    "search button": "button[type=submit]",
    "transcript text input": "input[placeholder='Enter Transcript Text']",
    "callee number input": "input[placeholder*='Number']"
}


const PAGES = {
    "calls page": '/calls',
    "home page": '/',
    "login page": '/login'
}

const COMMON_SELECTORS = {
    ...CALL_LIST_SELECTORS,
    ...CALLEE_SELECTORS,
    ...CALLER_SELECTORS,
    ...FORM_SELECTORS,
    ...COMMON_UI_SELECTORS,
    ...PAGES
};

module.exports = COMMON_SELECTORS;

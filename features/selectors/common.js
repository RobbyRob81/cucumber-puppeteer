
const COMMON_UI = {
    "nav bar": ".navbar",
    "nav drop down": ".navbar > .container > .collapse > div:nth-child(3)",
    "no results text": '.p-3',
    "login container": ".login-container",
    "pagination element": ".pagination-container",
    "pagination": ".pagination-container",
    "pagination prev icon": ".pagination-container .arrow-prev",
    "pagination next icon": ".pagination-container .arrow-next",
    "pagination first icon": ".pagination-container .arrow-first",
    "pagination last icon": ".pagination-container .arrow-last",
};

const DROPDOWNS = {
    'Analytics': ".collapse .navbar-nav > div:nth-child(3) > a",
    'user role dropdown': ".navbar > .container > .collapse > div:nth-child(3) > .dropdown > a",
};

const LINKS = {
    'Comments': "a[href^='/comments']",
    'Lexicon': "a[href^='/analytics/lexicon']",
    'Link Analysis': "a[href^='/analytics/link-analysis']",
    'Logout': "a[href^='/logout']",
    'Manage Lexicon': "a[href^='/lexicon-editor']",
    'Manage Users': "a[href^='/users']",
    'Template Notifications': "a[href^='/analytics/template-notification']",
    "Calls":  "a[href='/calls'",
    "Continuous Monitoring":  "a[href='/continuous-monitoring'",
    "county logo": "a[href='/'",
    "Dashboard":  "a[href='/dashboard/call-activity'",
    "Known-Unkowns": "a[href^='/analytics/known-unknown']",
    "logout link": "a[href^='/logout']",
};

const CALENDAR = {
    // 'datepicker days': '.datepicker-days',
    // 'datepicker month': '.datepicker-months',
    // 'years label': '.datepicker-years .datepicker-switch',
    // 'datepicker years': '.datepicker-years',
    'date picker': '.datepicker',
    'date header': '.datepicker-switch',
    'outside calendar': 'body',
    'month and year label': '.datepicker-days .datepicker-switch',
    'year label'      : '.datepicker-months .datepicker-switch',
    'days'            : '.datepicker-days .datepicker-switch',
    'months label'    : '.datepicker-months .datepicker-switch',
    'prev date days'  : '.datepicker-days .prev',
    'next date days'  : '.datepicker-days .next',
    'today date days' : '.datepicker-days .today',
    'clear date days' : '.datepicker-days .clear',
    'date years'      : '.datepicker-years',
    'prev date years' : '.datepicker-years .prev',
    'today date years': '.datepicker-years .today',
    'clear date years': '.datepicker-years .clear',
    'calendar month and year text': '.datepicker-days .datepicker-switch', 
}

// "caller id input": "input[placeholder='Enter Resident ID']", lpso
// "caller name": "input[placeholder='Enter Resident ID']" lpso
const TABLES = {
    'calls': '#cog-call-table-body tr',
    'calls table': '.cog-call-table',
    'first call': "#cog-call-table-body tr:first-child",
    "caller id": ".cog-table-double-row:nth-child(3) > div:nth-child(1)",
    "caller name": ".cog-table-double-row:nth-child(3) > div:nth-child(2)",
    "receiver number": "table tr td:nth-child(4)",
    "receiver numbers": "table td:nth-child(4)",
}

const LABELS = {
    'date range from input label': 'label[for="date-range"]'
}

const INPUTS = {
    "username input": "#username",
    "password input": '#password',
    "caller id input": "input[id=resident-id], input[placeholder='Enter Resident ID']",
    "caller name input": "input[placeholder*='Name']",
    'date range from input': 'input[placeholder="From"]',
    'from date': "input[id='call-search-date-from-input']",
    "receiver number input": "input[placeholder*='Number']",
    "transcript text input": "input[placeholder='Enter Transcript Text']",
}

const BUTTONS = {
    "clear button": "button[type=clear]",
    "search button": "button[type=submit]",
    "login button": ".cog-btn"
}

const PAGES = {
    "calls": '/calls',
    "home": '/',
    "login": '/login',
    "dashboard": '/dashboard/call-activity',
    "call activity": '/dashboard/call-activity',
    "phone activity": '/dashboard/phone-activity'
}

const COMMON_SELECTORS = {
    ...BUTTONS,
    ...CALENDAR,
    ...COMMON_UI,
    ...INPUTS,
    ...LABELS,
    ...LINKS,
    ...PAGES,
    ...TABLES,
};

module.exports = COMMON_SELECTORS;

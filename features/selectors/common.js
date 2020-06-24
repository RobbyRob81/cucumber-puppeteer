
const COMMON_UI = {
    
};

const PAGES = {
    "calls": '/calls',
    "home": '/',
    "login": '/login',
    "dashboard": '/dashboard/call-activity',
    "call activity": '/dashboard/call-activity',
    "phone activity": '/dashboard/phone-activity'
}

const COMMON_SELECTORS = {
    ...COMMON_UI,
    ...PAGES
};

module.exports = COMMON_SELECTORS;

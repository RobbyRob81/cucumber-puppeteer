const HEADER_SELECTORS = {
    
};

const NAVBAR_SELECTORS = {
    NAV_BAR: ".navbar",
    NAV_DROP_DOWN: ".navbar-dropdown",
    LOGOUT_LINK: "a[href^='/logout']"
};

const CALL_PAGE_SELECTORS = {
    CALL_LIST_CONTAINER: ".call-index-container",
    CALL_LIST: "#cog-call-table-body",
    CALLER_ID: ".cog-table-double-row:nth-child(3) > div:nth-child(1)"
}


const PAGES = {
    HOME_PAGE: '/',
    LOGIN_PAGE: '/login',
    CALLS_PAGE: '/calls'
}

const COMMON_SELECTORS = {
    ...CALL_PAGE_SELECTORS,
    ...NAVBAR_SELECTORS,
    ...PAGES
};

module.exports = COMMON_SELECTORS;

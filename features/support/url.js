const {
  CLIENT_ENV,
  DOMAIN_ENV,
  NODE_ENV,
  SUBDOMAIN_ENV
} = process.env;

const DOMAIN = 'threatdeterrence';
// const getSUBDOMAIN = (env, client ) => env === "production" && client === "ccso" || client === "lpso" ? "verus-" : "speech-";
// const SUBDOMAIN = getSUBDOMAIN(DOMAIN_ENV, CLIENT_ENV);
// console.log("Subdomain: ", SUBDOMAIN)


const getUrl = (path = "") => {
  const URLS_BY_DOMAIN_AND_ENV = {
      development: "http://localhost:4200",
      production: `https://speech-${CLIENT_ENV}.${DOMAIN}.com`,
      // production: `https://verus-${CLIENT_ENV}.threatdeterrence.com`, //lpso
      staging: `https://verus-staging-${CLIENT_ENV}.${DOMAIN}.com`,
      test: "http://localhost:4200"
  };

  // const domainUrl =
  //   URLS_BY_DOMAIN_AND_ENV[domain][NODE_ENV] ||
  //   URLS_BY_DOMAIN_AND_ENV.test.development;

  const domainUrl = URLS_BY_DOMAIN_AND_ENV[NODE_ENV]
  return path ? `${domainUrl}${path}` : domainUrl;
};

module.exports = {
  getUrl
};

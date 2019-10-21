const { NODE_ENV, CLIENT_ENV } = process.env;

const getUrl = (path = "") => {
  const URLS_BY_DOMAIN_AND_ENV = {
      development: "http://localhost:4200",
      staging: `https://verus-staging-${CLIENT_ENV}.threatdeterrence.com`,
      production: `https://speech-${CLIENT_ENV}.threatdeterrence.com`,
      test: "http://localhost:4200"
  };

  // console.log('domain:', domain)
  console.log('path:', path)
  console.log('CLIENT_ENV:', CLIENT_ENV)


  // const domainUrl =
  //   URLS_BY_DOMAIN_AND_ENV[domain][NODE_ENV] ||
  //   URLS_BY_DOMAIN_AND_ENV.test.development;

  const domainUrl = 
    URLS_BY_DOMAIN_AND_ENV[NODE_ENV]

    console.log("domainUrl: ", domainUrl);


  return path ? `${domainUrl}${path}` : domainUrl;
};

module.exports = {
  getUrl
};

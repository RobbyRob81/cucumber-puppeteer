const {
  CLIENT_ENV,
  DOMAIN_ENV,
  NODE_ENV,
  SUBDOMAIN_ENV
} = process.env;

const DOMAIN = 'aspiration';

const getUrl = (path = "") => {
  const URLS_BY_DOMAIN_AND_ENV = {
      alpha: `https://alpha.${DOMAIN}.com`,
      dev: "http://localhost:3000",
      prod: `https://${DOMAIN}.com`,
      test: "http://localhost:3000"
  };

  const domainUrl = URLS_BY_DOMAIN_AND_ENV[NODE_ENV]
  console.log('domain: ', domainUrl)
  return path ? `${domainUrl}${path}` : domainUrl;
};

module.exports = {
  getUrl
};

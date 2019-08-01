const puppeteer = require("puppeteer");

const { iPhone, iPad } = puppeteer.devices;

const getDevice = device => {
  const DEVICE_DESCRIPTORS_BY_DEVICE = {
    desktop: null,
    tablet: iPad,
    mobile: iPhone
  };

  return (
    DEVICE_DESCRIPTORS_BY_DEVICE[device] || DEVICE_DESCRIPTORS_BY_DEVICE.desktop
  );
};

module.exports = {
  getDevice
};

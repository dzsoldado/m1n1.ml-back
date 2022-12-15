const UAParser = require('ua-parser-js')

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
}

function requestHeadersParser(headers){
  let ua = UAParser(headers['user-agent']);
  let ip = headers["x-forwarded-for"]
          ? headers["x-forwarded-for"].split(",")[0]
          : "127.0.0.1";
  return {
    ip: ip,
    browser: ua.browser.name,
    os: ua.os,
  }
}

module.exports = {
  isValidUrl,
  requestHeadersParser,
}
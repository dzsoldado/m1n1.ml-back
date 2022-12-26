const UAParser = require('ua-parser-js')
const axios = require('axios')

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
          : "127.0.0.1"; // when developing locally
  return {
    ip,
    browser: ua.browser?.name??'unknown',
    os: ua.os??'unknown',
  }
}

async function getCountryFromIp(ip){
  try{
    const result = await axios.get(`https://ipapi.co/${ip}/json/`)
    return {
      country: result.data?.country_name || 'unknown',
      country_code: result.data?.country_code || 'unknown',
    }
  }catch(err){
    console.log(err)
    return ;
  }
}

module.exports = {
  isValidUrl,
  requestHeadersParser,
  getCountryFromIp
}
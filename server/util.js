const util = {
  get_domain_str (env) {
    if(env == "online"){
        return 'https://api.bigappinfo.com'
    } else {
        return 'http://test.api.bigappinfo.com'
    }
  }
}

module.exports = util

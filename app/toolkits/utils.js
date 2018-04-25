const utils = {
  parseCookie (string) {
    const returnValue = {};
    
    if (string && typeof string === 'string') {
      try {
        string.split('; ').forEach(item => {
          const index = item.indexOf('=');
          returnValue[item.slice(0, index)] = item.slice(index + 1);
        })
      } catch (e) {console.log(e)}
    }

    return returnValue;
  },
  executeAsync (func) {
    setTimeout(func, 0);
  }
}

module.exports = utils;

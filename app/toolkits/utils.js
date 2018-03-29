const utils = {
  getReturn (ok, data, message) {
    return {
      success: !!ok,
      data: data || null,
      message: message || ''
    }
  },
  parseCookie (string) {
    const returnValue = {};
    try {
      string.split('; ').forEach(item => {
        const index = item.indexOf('=');
        returnValue[item.slice(0, index)] = item.slice(index + 1);
      })
    } catch (e) {console.log(e)}

    return returnValue;
  }
};

module.exports = utils;

const utils = {
  getReturn (ok, data, message) {
    return {
      success: !!ok,
      data: data || null,
      message: message || ''
    }
  }
};

module.exports = utils;

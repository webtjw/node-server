let DBUtils = {
  orginizeResult (callback) {
    return function (error, result, fields) {
      if (error) callback && callback({
        success: false,
        data: null,
        error: error,
        errorMsg: error.sqlMessage || 'database mistake'
      });
      else callback && callback({
        success: true,
        data: result
      });
    }
  }
}

module.exports = DBUtils;
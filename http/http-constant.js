const HTTP_CONSTANT = {};

// Multiple-purpose Internet Mail Extension
HTTP_CONSTANT.MIME = {
  HTML: 'text/html',
  TEXT: 'text/plain',
  JSON: 'application/json',
  JAVASCRIPT: 'application/javascript',
};

HTTP_CONSTANT.HEADERS = {
  METHODS: 'Access-Control-Allow-Methods',
  HEADERS: 'Access-Control-Allow-HEADERS',
  ORIGIN: 'Access-Control-Allow-Origin'
}

module.exports = HTTP_CONSTANT;

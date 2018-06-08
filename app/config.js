const isDevelopment = process.env.NODE_ENV === 'development'

module.exports = {
  isDevelopment,
  isProduction: !isDevelopment,
  port: 3001
}
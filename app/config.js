const isDevelopment = process.env.NODE_ENV === 'development'

module.exports = {
  isDevelopment,
  isProduction: !isDevelopment,
  port: isDevelopment ? 3001 : 80
}
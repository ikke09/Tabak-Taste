require('dotenv').config();
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    createProxyMiddleware('/api', {
      target: process.env.PROXY,
      changeOrigin: true,
      pathRewrite: {
          "^/api": ""
      },
      headers: {
          Connection: 'keep-alive',
      }
    })
  );
};
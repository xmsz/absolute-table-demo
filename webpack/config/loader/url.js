module.exports = (params = {}) => {
  const { env = '' } = params;

  return {
    loader: 'url-loader',
    options:
      env === 'production'
        ? {
            limit: 4096,
            outputPath: './images/',
            publicPath: '../images/'
          }
        : {
            limit: 1
          }
  };
};

module.exports = {
  presets: [
    'vca-jsx',
    '@vue/cli-plugin-babel/preset',
    '@babel/preset-typescript',
    '@babel/preset-env',
  ],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    '@babel/plugin-proposal-class-properties',
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: false,
        helpers: true,
        regenerator: true,
        useESModules: false,
      },
    ],
  ],
};

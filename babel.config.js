const presets = [
  [
    '@babel/env',
    {
      modules: false,
      targets: {
        browsers: ['> 1%', 'last 2 versions', 'not ie <= 8'],
      },
      useBuiltIns: 'usage',
      corejs: 3,
    },
    'stage-2',
  ],
];

const plugins = [
  '@babel/plugin-transform-modules-commonjs',
];

module.exports = {
  presets,
  plugins,
};

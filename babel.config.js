module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '~': './src',
          '~screens': './src/screens',
          '~navigation': './src/navigation',
          '~locales': './src/locales/index',
          '~components': './src/components',
          '~atoms': './src/components/atoms/index',
          '~compose': './src/components/compose/index',
          '~state': './src/state',
          '~images': './src/static/images',
          '~icons': './src/static/icons',
          '~style': './src/style/index',
          '~store': './src/store',
          '~utils': './src/utils',
          '~hooks': './src/hooks',
          '~apis': './src/apis/index',
        },
      },
    ],
  ],
};

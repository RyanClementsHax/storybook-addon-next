const path = require('path');

// NOTE: this is main preset for storybook. This conf is used in examples/with-nx/libs/shared/ui/atoms/.storybook/main.js
console.log({
  path: path.resolve(__dirname, '../apps/next-app/next.config.js'),
});

module.exports = {
  stories: [],
  addons: [
    '@storybook/addon-essentials',
    {
      name: 'storybook-addon-next',
      options: {
        nextConfigPath: path.resolve(
          __dirname,
          '../apps/next-app/next.config.js'
        ),
      },
    },
  ],
  // uncomment the property below if you want to apply some webpack config globally
  // webpackFinal: async (config, { configType }) => {
  //   // Make whatever fine-grained changes you need that should apply to all storybook configs

  //   // Return the altered config
  //   return config;
  // },
};

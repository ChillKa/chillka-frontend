const {
  list,
  maxMessageLength,
  minMessageLength,
} = require('./changelog.config.js');

module.exports = {
  extends: ['@commitlint/config-conventional'],
  plugins: [
    {
      rules: {
        'custom-type-enum': ({ type }) => {
          if (!list.includes(type)) {
            return [
              false,
              `
                Type 必須得是: ${list.join(', ')} \n
                例如: feat: 增加一個新的功能
                `,
            ];
          }
          return [true];
        },
        'custom-header-max-length': ({ header }, _when, expectedValue) => {
          if (header.length > expectedValue) {
            return [
              false,
              `
                標題必須少於${expectedValue}個字元, 現在為${header.length}個字元
                `,
            ];
          }
          return [true];
        },
        'custom-header-min-length': ({ header }, _when, expectedValue) => {
          if (header.length < expectedValue) {
            return [
              false,
              `
                標題必須多於${expectedValue}個字元, 現在為${header.length}個字元
                `,
            ];
          }
          return [true];
        },
      },
    },
  ],
  rules: {
    'custom-type-enum': [2, 'always'],
    'custom-header-max-length': [2, 'always', maxMessageLength],
    'custom-header-min-length': [2, 'always', minMessageLength],
  },
};

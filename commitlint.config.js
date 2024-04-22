module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [
            2,
            'always',
            ['feat', 'fix', 'style', 'docs', 'refactor', 'chore'],
        ],
        'header-max-length': [2, 'always', 100],
        'header-min-length': [2, 'always', 3],
    },
};

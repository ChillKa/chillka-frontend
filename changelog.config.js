module.exports = {
    disableEmoji: false,
    format: '{type}{scope}: {emoji}{subject}',
    list: ['feat', 'fix', 'style', 'docs', 'refactor', 'chore'],
    maxMessageLength: 100,
    minMessageLength: 3,
    questions: ['type', 'scope', 'subject', 'body', 'issues'],
    scopes: [],
    types: {
        feat: {
            description: '新增/修改功能 (Feature)',
            emoji: '🎸',
            value: 'feat',
        },
        fix: {
            description: '修正 Bug (bug fix)',
            emoji: '🐛',
            value: 'fix',
        },
        style: {
            description:
                '修改程式碼格式或風格，不影響原有運作，例如 ESLint (formatting, missing semi colons, …)',
            emoji: '💄',
            value: 'style',
        },
        docs: {
            description: '修改/新增文件 (documentation)',
            emoji: '✏️',
            value: 'docs',
        },

        refactor: {
            description: '重構 or 優化，不屬於 bug 也不屬於新增功能等',
            emoji: '💡',
            value: 'refactor',
        },
        chore: {
            description: '增加或修改第三方套件(輔助工具)等 (maintain)',
            emoji: '🤖',
            value: 'chore',
        },
    },
    messages: {
        type: '請選擇您要 Commit 的類型(必選)：',
        customScope:
            '選擇此次 Commit 影響的範圍(可選，若無，請按 Enter 略過):\n ',
        subject: '簡短描述 Commit 的修正範圍(必填)：\n',
        body: '更詳細的 Commit 說明(可選，若無，請按 Enter 略過):\n ',
        issues: '此次 Commit 會關閉的 Issues, e.g #123(可選，若無，請按 Enter 略過):\n ',
    },
};

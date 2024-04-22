const { execSync } = require('child_process');
const config = require('./changelog.config.js');
const commitMessage = execSync('git log -1 --pretty=%B').toString().trim();
const typeList = Object.entries(config.types).map(
    ([_, value]) => value.value + ': ' + value.emoji
);

const checkType = typeList.some((keyword) => commitMessage.includes(keyword));

if (!checkType) {
    console.log('type 錯誤 請重新 commit');
    execSync('git reset HEAD^', { stdio: 'inherit' });
}

const { execSync } = require('child_process');
const curPackageJson = require('../package.json');

// 所有需要废弃的版本
const versionsToDeprecate = ["1.0.0", "1.0.2", "1.0.3", "1.0.5", "1.0.6", "1.0.7", "1.0.8", "1.0.9", "1.0.10", "1.0.11", "1.1.0", "1.1.1", "1.1.2", "1.1.3", "1.1.5"];

const packageName = curPackageJson.name;
const deprecateMessage = '此版本为开发中版本（存在 bug），请升级到最新版本。';

console.log(`开始标记 ${versionsToDeprecate.length} 个版本为废弃状态...\n`);

let successCount = 0;
let failCount = 0;

versionsToDeprecate.forEach((version, index) => {
  try {
    const command = `npm deprecate ${packageName}@${version} "${deprecateMessage}"`;
    console.log(`[${index + 1}/${versionsToDeprecate.length}] 正在标记 ${version}...`);
    execSync(command, { stdio: 'inherit' });
    successCount++;
    console.log(`✓ ${version} 已成功标记\n`);
  } catch (error) {
    failCount++;
    console.error(`✗ ${version} 标记失败: ${error.message}\n`);
  }
});

console.log('\n========================================');
console.log(`完成！成功: ${successCount}, 失败: ${failCount}`);
console.log('========================================');


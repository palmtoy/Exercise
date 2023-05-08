const nunjucks = require('nunjucks');

const strTemplate1 = `
~ 脚本: {{ scriptsName }}
~ 应用: {{ appName }}
~ 平台: {{ platform }}
~ 包名: {{ package }}
`;

const dataObj = {
	scriptsName: 'Smoke Test',
	appName: 'SKY',
	platform: 'iOS',
	package: 'com.sky.blue',
};

const str1 = nunjucks.renderString(strTemplate1, dataObj);
console.log(`nunjucks str(1) ↓\n ${str1}`);


// You can write comments using {# and #}. Comments are completely stripped out when rendering.
const strTemplate2 = `
~ 脚本: {{ scriptsName }}{# ~ 应用: {{ appName }} #}
{# ~ 平台: {{ platform }} #}
~ 包名: {{ package }}
`;
const str2 = nunjucks.renderString(strTemplate2, dataObj);
console.log(`\n\nnunjucks str(2) ↓\n ${str2}`);


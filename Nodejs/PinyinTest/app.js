#!/usr/bin/env node

const pinyin = require('pinyin');

/**
 * function pinyin(words: string, options?: pinyin.Options): string[][];
 *
 * @param words 汉字
 * @param options 可选参数设置
 *
 * @return string[][]
 */

const poetryAuthorList = [ '唐诗', '宋词', '诗词歌赋' ];

// 默认风格, 即全拼带声调
for (const poetryNameCn of poetryAuthorList) {
	const pinyinNames = pinyin(poetryNameCn);
	console.log('AAA ~', poetryNameCn, pinyinNames);
}
console.log();


// STYLE_NORMAL 普通风格, 即全拼不带声调
for (const poetryNameCn of poetryAuthorList) {
	const pinyinNames = pinyin(poetryNameCn, { style: pinyin.STYLE_NORMAL }).join('');
	console.log('BBB ~', poetryNameCn, pinyinNames);
}
console.log();

// STYLE_FIRST_LETTER 首字母风格, 只返回拼音的首字母
for (const poetryNameCn of poetryAuthorList) {
	const pinyinNames = pinyin(poetryNameCn, { style: pinyin.STYLE_FIRST_LETTER }).join('');
	console.log('CCC ~', poetryNameCn, pinyinNames);
}



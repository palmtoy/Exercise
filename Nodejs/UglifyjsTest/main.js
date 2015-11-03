'use strict';

function funcBook(){
	return [
		{head: '前言', page: '/views/tpl/book-r1/preface.html', active: false},
		{head: '目录', page: '/views/tpl/book-r1/contents.html', active: true},
		{head: '代码', page: '/views/tpl/book-r1/code.html', active: false},
		{head: '试读', page: '/views/tpl/book-r1/sample.html', active: false},
		{head: '勘误', page: '/views/tpl/book-r1/mistake.html', active: false}
	];
}

var funcTab=function(arr, idx) {
	for(var i = 0; i < arr.length; i++){
		arr[i].active = (idx === i ? true : false);
	}
	return arr;
}

console.log(funcTab(funcBook(), 3));


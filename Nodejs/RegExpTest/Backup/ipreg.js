#!/usr/bin/env node

var ipRegex = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/;

var url = "http://www.example.com/landing.aspx?referrer=10.11.12.13";

var tmpList = url.match(ipRegex);
console.log(tmpList);


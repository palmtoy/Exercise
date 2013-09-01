var func1 = function(req,res,callback){
  setTimeout(function(){
    console.log('in func1');
    callback(req,res,1);  
  }, 5000);
}

var func2 = function(req,res,callback){ 
  setTimeout(function(){
    console.log('in func2');
    callback(req,res,2);
  }, 3000);
}

var func3 = function(req,res,callback){
  setTimeout(function(){
    console.log('in func3');
    callback(req,res,3);   
  }, 1000);
}

var req = null;
var res = null;

var callback = function(){};
var async = require('async');

async.series(
  [
    function(callback){
      func1(req, res, callback);
    },  
    function(callback){
      func2(req, res, callback);
    },
    function(callback){
      func3(req, res, callback);  
    } 
  ]
);


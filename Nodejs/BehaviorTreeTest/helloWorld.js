var util = require('util');
var bt = require('pomelo-bt');
var Sequence = bt.Sequence;
var Node = bt.Node;

// define some action nodes
var HelloNode = function(blackboard) {
  Node.call(this, blackboard);
};
util.inherits(HelloNode, Node);

HelloNode.prototype.doAction = function() {
  console.log('Hello ');
  return bt.RES_SUCCESS;
};


var WorldNode = function(blackboard) {
  Node.call(this, blackboard);
};
util.inherits(WorldNode, Node);

WorldNode.prototype.doAction = function() {
  console.log('World');
  return bt.RES_SUCCESS;
};

var blackboard = {};

// composite your behavior tree
var seq = new Sequence({blackboard: blackboard});
var hello = new HelloNode(blackboard);
var world = new WorldNode(blackboard);

seq.addChild(hello);
seq.addChild(world);

// run the behavior tree
seq.doAction();


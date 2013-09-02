var EventEmitter = require('events').EventEmitter;
var util = require('util');
var utils = require('../util/utils');
var defaultAcceptorFactory = require('./acceptor');
var dispatcher = require('./dispatcher');

var Gateway = function(opts) {
  EventEmitter.call(this);
  this.port = opts.port || 3050;
  this.started = false;
  this.stoped = false;
  this.acceptorFactory = opts.acceptorFactory || defaultAcceptorFactory;
  this.services = opts.services;
  var self = this;
	utils.myPrint('opts = ', JSON.stringify(opts));
  this.acceptor = this.acceptorFactory.create(opts, function(msg, cb) {
		utils.myPrint('msg = ', JSON.stringify(msg));
		utils.myPrint('self.services = ', JSON.stringify(self.services));
		// utils.myPrint('cb = ', cb);
    dispatcher.route(msg, self.services, cb);
  });
	utils.myPrint('this = ', JSON.stringify(this));
};
util.inherits(Gateway, EventEmitter);

var pro = Gateway.prototype;

pro.stop = function() {
  if(!this.started || this.stoped) {
    return;
  }
  this.stoped = true;
  try {
    this.acceptor.close();
  } catch(err) {}
};

pro.start = function() {
  if(this.started) {
    throw new Error('gateway already start.');
  }
  this.started = true;

  var self = this;
  this.acceptor.on('error', self.emit.bind(self, 'error'));
  this.acceptor.on('closed', self.emit.bind(self, 'closed'));
  this.acceptor.listen(this.port);
};

/**
 * create and init gateway
 *
 * @param opts {services: {rpcServices}, connector:conFactory(optional), router:routeFunction(optional)}
 */
module.exports.create = function(opts) {
  if(!opts || !opts.services) {
    throw new Error('opts and opts.services should not be empty.');
  }

  return new Gateway(opts);
};
#!/usr/bin/env python3

# flask run --host=0.0.0.0 --port=5001
# ./app.py

from flask import Flask, request, jsonify
from functools import wraps
from pythonjsonlogger import jsonlogger
import logging
import flask
import yaml


DATA_FILE = 'data.yml'


# Setup Flask app
app = Flask(__name__)

# Remove default Flask logger
app.logger.handlers[:] = []
# Setup logging
logHandler = logging.StreamHandler()
formatter = jsonlogger.JsonFormatter(
    fmt='%(asctime)s %(levelname)s %(name)s %(message)s'
)
logHandler.setFormatter(formatter)
app.logger.addHandler(logHandler)
app.logger.setLevel(logging.DEBUG)


@app.before_request
def before_request():
    flask.g.log_status = None  # init

@app.after_request
def after_request(response):
    flask.g.log_status = response.status_code
    # log request info
    app.logger.info(
        "Request log",
        extra={
            "remote_addr": flask.request.remote_addr,
            "method": flask.request.method,
            "url": flask.request.url,
            "status": response.status_code,
        }
    )
    return response


def load_data():
    with open(DATA_FILE, 'r') as f:
        data = yaml.safe_load(f)
    return data

def save_data(data):
    with open(DATA_FILE, 'w') as f:
        yaml.dump(data, f)


@app.route('/')
def index():
    retMsg = load_data()['hello_msg']
    app.logger.debug('Return message: %s', retMsg)
    return retMsg

def token_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = request.headers.get('auth-token')
        app.logger.debug('Received token: %s', token)
        if not token or token != f'mt':
            return jsonify({'message': 'Token is missing or invalid'}), 403
        return f(*args, **kwargs)
    return decorated_function

'''
curl -X POST http://127.0.0.1:5001/echo \
  -H "auth-token: mt" \
  -H "Content-Type: application/json" \
  -d '{"msg": "Hello World!"}'
'''
@app.route('/echo', methods=['POST'])
@token_required
def echo():
    reqData = request.get_json()
    msg = reqData.get('msg')
    app.logger.debug('Received data: %s', reqData)
    data = load_data()
    data['echo_num'] += 1
    save_data(data)
    retMsg = {'echo-msg': msg, 'server-msg': data['echo_msg'] + f' ~ {data["echo_num"]}'}
    app.logger.debug('Return data: %s', retMsg)
    return jsonify(retMsg)


if __name__ == '__main__':
    app.run(debug=True, use_reloader=False, host='0.0.0.0', port=5001)

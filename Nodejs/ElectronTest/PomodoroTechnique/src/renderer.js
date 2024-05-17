const Timer = require('timer.js');
const { ipcRenderer } = require('electron');
const ProgressBar = require('progressbar.js/dist/progressbar.js');

const switchButton = document.getElementById('switch-button');
const progressBar = new ProgressBar.Circle('#timer-container', {
  strokeWidth: 2,
  color: '#F44336',
  trailColor: '#eee',
  trailWidth: 1,
  svgStyle: null,
});
const workTime = 10; // 工作: 10秒
const restTime = 5; // 休息: 5秒
const state = {};

function render() {
  const { remainTime: s, type } = state;
  const maxTime = type < 2 ? workTime : restTime;
  const ss = s % 60;
  const mm = ((s - ss) / 60).toFixed();
  progressBar.set(1 - s / maxTime);
  progressBar.setText(`${mm.toString().padStart(2, '0')}:${ss.toString().padStart(2, '0')}`);
  if (type === 0) {
    switchButton.innerText = '开始工作';
  } else if (type === 1) {
    switchButton.innerText = '停止工作';
  } else if (type === 2) {
    switchButton.innerText = '开始休息';
  } else {
    switchButton.innerText = '停止休息';
  }
}

function setState(_state) {
  Object.assign(state, _state);
  render();
}

function startWork() {
  setState({ type: 1, remainTime: workTime });
  workTimerObj.start(workTime);
}

function startRest() {
  setState({ type: 3, remainTime: restTime });
  workTimerObj.start(restTime);
}

const workTimerObj = new Timer({
  ontick: ms => {
    setState({ remainTime: (ms / 1000).toFixed(0) });
  }, // 每秒更新时间
  onstop: () => {
    setState({ type: 0, remainTime: 0 });
  }, // 停止, 则进入到工作状态
  onend: function () {
    const { type } = state;
    if (type === 1) {
      setState({ type: 2, remainTime: 0 });
      if (process.platform === 'darwin') {
        // 只有在 MacOS 下才能使用 notification
        notification({
          title: '任务完成',
          body: '是否休息一会儿?',
          actionText: '休息五分钟',
          closeButtonText: '继续工作',
          onaction: startRest,
          onclose: startWork,
        });
      } else {
        // Windows 下使用 alert
        alert('任务完成');
      }
    } else if (type === 3) {
      setState({ type: 0, remainTime: 0 });
      if (process.platform === 'darwin') {
        notification({
          title: '休息结束',
          body: '是否开始工作?',
          actionText: '开始工作',
          closeButtonText: '继续休息',
          onaction: startWork,
          onclose: startRest,
        });
      } else {
        alert('休息结束');
      }
    }
  },
});

switchButton.onclick = function () {
  if (this.innerText === '开始工作') {
    startWork();
  } else if (this.innerText === '开始休息') {
    startRest();
  } else {
    workTimerObj.stop();
  }
};

async function notification({ title, body, actionText, closeButtonText, onclose, onaction }) {
  const res = await ipcRenderer.invoke('notification', {
    title,
    body,
    actions: [{ text: actionText, type: 'button' }],
    closeButtonText,
  });
  res.event === 'close' ? onclose() : onaction();
}

setState({
  remainTime: 0,
  type: 0, // 0: 开始工作; 1: 停止工作; 2: 开始休息; 3: 停止休息
});

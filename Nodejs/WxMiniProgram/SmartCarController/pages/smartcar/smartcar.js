Page({
  data: {
    motto: 'Smart Car Controller :>',
    acmCarTitle: 'Ackerman Car Controller ->',
    baseUrl: 'http://192.168.0.106',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  
  bindGo2AcmCar() {
    wx.navigateTo({
      url: '../index/index'
    })
  },

  _sendWxReq(pPath) {
    // console.log(`__sendWxReq: url = ${this.data.baseUrl + '/?' + pPath}`);
    wx.request({
      url: this.data.baseUrl + '/?' + pPath,
      method: 'GET',
      success: function (res) {
        // console.log(res.data);
      }
   })
  },
  bindCarForward() {
    // console.log(`${new Date().toString()} ~ _bindCarForward is running ...`);
    this._sendWxReq('car_forward');
  },
  bindCarBackward() {
    // console.log(`${new Date().toString()} ~ _bindCarBackward is running ...`);
    this._sendWxReq('car_backward');
  },
  bindCarLeft() {
    // console.log(`${new Date().toString()} ~ _bindCarLeft is running ...`);
    this._sendWxReq('car_left');
  },
  bindCarRight() {
    // console.log(`${new Date().toString()} ~ _bindCarRight is running ...`);
    this._sendWxReq('car_right');
  },
  bindCarStop() {
    // console.log(`${new Date().toString()} ~ _bindCarStop is running ...`);
    this._sendWxReq('car_stop');
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})

//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)


    var openId = wx.getStorageSync('userOpenID') || '';
    this.globalData.openId = openId;

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      //   var code = res.code;//登录凭证
      //   if (code) {
      //     //2、调用获取用户信息接口
      //     wx.getUserInfo({
      //       success: function (res) {
      //         console.log({ encryptedData: res.encryptedData, iv: res.iv, code: code })
      //         //3.请求自己的服务器，解密用户信息 获取unionId等加密信息
      //         wx.request({
      //           url: 'http://localhost:8080/wesharing-wechat/decodeUserInfo.do',//自己的服务接口地址
      //           method: 'get',
      //           header: {
      //             "Content-Type": "applciation/json"
      //           },
      //           data: { encryptedData: res.encryptedData, iv: res.iv, code: code },
      //           success: function (data) {

      //             //4.解密成功后 获取自己服务器返回的结果
      //             if (data.data.status == 1) {
      //               var userInfo_ = data.data.userInfo;
      //               console.log(userInfo_)
      //             } else {
      //               console.log('解密失败')
      //             }
      //           },
      //           fail: function () {
      //             console.log('系统错误')
      //           }
      //         })
      //       },
      //       fail: function () {
      //         console.log('获取用户信息失败')
      //       }
      //     })
      //   } else {
      //     console.log('获取用户登录态失败！' + r.errMsg)
      //   }
       },
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    openId:""
  }
})
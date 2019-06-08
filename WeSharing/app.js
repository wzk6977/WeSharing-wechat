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
    // 
    
  
  },
  globalData: {
    userInfo: null,
    openId:"",
    // 服务器地址和项目名称
    httpID: 'http://127.0.0.1:8080/wesharing-wechat/'
    // 'http://120.92.182.201:8686/wesharing/'
     
    
    
  }
})
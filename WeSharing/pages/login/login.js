const app = getApp()
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo'] && app.globalData.openId != '') {
          wx.getUserInfo({
            success: function (res) {
              //从数据库获取用户信息
              that.queryUsreInfo();
              //用户已经授权过
              wx.switchTab({
                url: '../home/home'
              })
            }
          });
        }
      }
    })
  },
  bindGetUserInfo: function (e) {
    
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo;
      console.log(e.detail.userInfo);
      wx.login({
        success: res => {
          //发送 res.code 到后台换取 openId, sessionKey, unionId
            var code = res.code;//登录凭证
            if (code) {
              //2、调用获取用户信息接口
              wx.getUserInfo({
                success: function (res) {
                  console.log({ encryptedData: res.encryptedData, iv: res.iv, code: code })
                  //3.请求自己的服务器，解密用户信息 获取unionId等加密信息
                  wx.request({
                    url: app.globalData.httpID+'decodeUserInfo.do',//自己的服务接口地址
                    method: 'get',
                    header: {
                      "Content-Type": "applciation/json"
                    },
                    data: { encryptedData: res.encryptedData, iv: res.iv, code: code },
                    success: function (data) {

                      //4.解密成功后 获取自己服务器返回的结果
                      if (data.data.status == 1) {
                        var userInfo_ = data.data.userInfo;
                        console.log("userInfo  = "+userInfo_)
                        app.globalData.openId = userInfo_.openId
                        console.log("openid = "+userInfo_.openId)
                        //将openid保存进storage
                        wx.setStorageSync("userOpenID", userInfo_.openId)
                        wx.request({
                          url: app.globalData.httpID+"saveUser.do",
                          data: {
                            uuid: app.globalData.openId,
                            name: app.globalData.userInfo.nickName,
                            gender: app.globalData.userInfo.gender,
                            country: app.globalData.country,
                            province: app.globalData.userInfo.province,
                            city: app.globalData.userInfo.city,
                            image_url: app.globalData.userInfo.avatarUrl,
                          },
                          header: {
                            'content-type': 'application/json'
                          },
                          success: function (res) {
                            //从数据库获取用户信息
                            that.queryUsreInfo();
                            console.log("插入小程序登录用户信息成功！");
                          }
                        });
                      } else {
                        console.log('解密失败')
                      }
                    },
                    fail: function () {
                      console.log('系统错误')
                    }
                  })
                },
                fail: function () {
                  console.log('获取用户信息失败')
                }
              })
            } else {
              console.log('获取用户登录态失败！' + r.errMsg)
            }
        },
      })
      
    
      var that = this;
      //插入登录的用户的相关信息到数据库
      // wx.request({
      //   url: "http://localhost:8080/wesharing-wechat/saveUser.do",
      //   data: {
      //     uuid: app.globalData.openId,
      //     name: app.globalData.userInfo.nickName,
      //     gender: app.globalData.userInfo.gender,
      //     country:app.globalData.country,
      //     province: app.globalData.userInfo.province,
      //     city: app.globalData.userInfo.city,
      //     image_url: app.globalData.userInfo.avatarUrl,
      //   },
      //   header: {
      //     'content-type': 'application/json'
      //   },
      //   success: function (res) {
      //     //从数据库获取用户信息
      //     that.queryUsreInfo();
      //     console.log("插入小程序登录用户信息成功！");
      //   }
      // });
      //授权成功后，跳转进入小程序首页
      wx.switchTab({
        url: '../home/home'
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },
  // //获取用户信息接口
  queryUsreInfo: function () {
    wx.request({
      url: app.globalData.httpID+"getUserInfoById.do",
      data: {
        openId:app.globalData.openId
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data);
        app.globalData.userInfo = res.data;
      }
    }) 
  },

})
// pages/sharedDetail/sharedDetail.js

//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    sharedDetail:{},
    sharedComments:[],
    // imagesUrl: [{
    //     id: 1
    //   },
    //   {
    //     id: 2
    //   },
    //   {
    //     id: 3
    //   },
    //   {
    //     id: 4
    //   }
    // ],
    activeIndex: 0,
    showOrHidden: true, //true为全文，false为收起
    ellipsis: false, // 文字是否收起，默认收起
    showBtn: false, //是否显示全文按钮
    showSendBtn:false,//是否显示发送评论的确定按钮
    commentCount:0,//评论总数
    comment:"",
    inputValue:"",//输入框内容
    screenWidth: 0,
    checkMoreOrLess:true,//查看更多评论或收起
  },

  // showLength: function() {
  //   return this.imagesUrl.length;
  // },
  changeImg: function(e) {
    var that = this;
    console.log(e.detail)
    that.setData({
      activeIndex: e.detail.current
    })

  },

  ellipsis: function() {
    var value = !this.data.ellipsis;
    var newShowOrHidden = !this.data.showOrHidden;
    this.setData({
      ellipsis: value,
      showOrHidden: newShowOrHidden
    })
  },

  getInput:function(e){

    var that = this;
    console.log(e)
    //如果没有输入内容，隐藏按钮
    var show;
    if(e.detail.value == ''){
      show = false;
    }else{
      show = true;
    }

    that.setData({
      showSendBtn:show,
      comment:e.detail.value
    })
  },

  confirmComment:function(){
    var that = this
    wx.request({
      url: app.globalData.httpID+'insertComment.do',
      data:{
        shared_id: that.data.sharedDetail.uuid,
        user_id: that.data.userInfo.uuid, 
        content: that.data.comment,
      },
      success(res){
        console.log(res)
        if(res.data == 1){
          wx.showToast({
            title: '评论成功',
            duration:1500
          })
          that.setData({
            inputValue:'',
            showSendBtn:false,
            checkMoreOrLess:true
          })
          that.getSharedCommentsFromTo(0,1)
          that.getSharedCommentCount()

        }
      }

    })
  },

  checkMoreComment:function(){
    if (this.data.checkMoreOrLess){
      this.getSharedCommentsFromTo(0, 10)
    }else{
      this.getSharedCommentsFromTo(0, 1)
    }
    this.setData({
      checkMoreOrLess: !this.data.checkMoreOrLess
    })
  },

  getSharedCommentsFromTo:function(start,num){
    var that = this
    wx.request({
      url: app.globalData.httpID+'getSharedCommentsBySharedId.do',
      data: {
        shared_id: that.data.sharedDetail.uuid,
        start: start,
        num: num
      },
      success(res) {
        console.log(res)
        that.setData({
          sharedComments: res.data
        })
      }
    })
  },

  // getUserInfo: function (e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // },

  getSharedCommentCount:function(){
    var that = this
    wx.request({
      url: app.globalData.httpID+'getSharedCommentCountBySharedId.do',
      data: {
        shared_id: that.data.sharedDetail.uuid,

      },
      success(res) {
        console.log(res)
        that.setData({
          commentCount: res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("sharedId = "+options.sharedId);
    var that = this;

    wx.request({
      url: app.globalData.httpID+'getSharedById.do',
      data:{
        id: options.sharedId
      },
      success(res){
        console.log("sharedDetail= "+res)
        that.setData({
          sharedDetail:res.data
        })

        that.getSharedCommentsFromTo(0,1)

        that.getSharedCommentCount();



        wx.getSystemInfo({
          success: function (res) {
            that.setData({
              screenWidth: res.screenWidth
            })
          },
        })

        var query1 = wx.createSelectorQuery();

        query1.select(".detail-content").boundingClientRect(function (rest) {
          console.log(rest.height + "------------")
          var height = rest.height * 750 / that.data.screenWidth
          console.log("文字高度rpx" + height)
          that.setData({
            ellipsis: height > 126 ? true : false,
            showBtn: height > 126 ? true : false
          })
        }).exec()
      }
    })


    // wx.getSystemInfo({
    //   success: function(res) {
    //     that.setData({
    //       screenWidth: res.screenWidth
    //     })
    //   },
    // })

    // var query1 = wx.createSelectorQuery();

    // query1.select(".detail-content").boundingClientRect(function(rest) {
    //   console.log(rest.height + "------------")
    //   var height = rest.height * 750 / that.data.screenWidth
    //   console.log("文字高度rpx"+height)
    //   that.setData({
    //     ellipsis: height > 126 ?true :false,
    //     showBtn: height > 126 ? true : false
    //   })
    // }).exec()

    //获取头像
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
     } 
    //else if (this.data.canIUse) {
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
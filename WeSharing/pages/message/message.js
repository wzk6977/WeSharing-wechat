// pages/message/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    messageList: [
      {
        id: 1,
        sex: 0,
        headImg: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1902767009,2920248927&fm=26&gp=0.jpg",
        name: "啦啦啦",
        time: "刚刚",
        distance: "50米",
        messageDetila: "你好",
      },
      {
        id: 2,
        sex: 1,
        headImg: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=297073658,4148605963&fm=26&gp=0.jpg",
        name: "小花",
        time: "1分钟前",
        distance: "100米",
        messageDetila: "我到了",
      },
      {
        id: 3,
        sex: 1,
        headImg: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3359239509,2526752630&fm=26&gp=0.jpg",
        name: "linda",
        time: "2分钟前",
        distance: "500米",
        messageDetila: "在哪",
      },
      {
        id: 4,
        sex: 0,
        headImg: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3426182008,849684630&fm=26&gp=0.jpg",
        name: "frig",
        time: "5分钟前",
        distance: "1000米",
        messageDetila: "在吗",
      },
      {
        id: 1,
        sex: 0,
        headImg: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1902767009,2920248927&fm=26&gp=0.jpg",
        name: "啦啦啦",
        time: "7分钟前",
        distance: "50米",
        messageDetila: "hello",
      },
      {
        id: 2,
        sex: 1,
        headImg: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=297073658,4148605963&fm=26&gp=0.jpg",
        name: "小花",
        time: "8分钟前",
        distance: "100米",
        messageDetila: "你好，我到约定好的地点了，你好，我到约定好的地点了你好，我到约定好的地点了",
      },
      {
        id: 3,
        sex: 1,
        headImg: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3359239509,2526752630&fm=26&gp=0.jpg",
        name: "linda",
        time: "10分钟前",
        distance: "500米",
        messageDetila: "哈哈哈",
      },
      {
        id: 4,
        sex: 0,
        headImg: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3426182008,849684630&fm=26&gp=0.jpg",
        name: "frig",
        time: "11分钟前",
        distance: "1000米",
        messageDetila: "是的",
      },
      {
        id: 3,
        sex: 1,
        headImg: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3359239509,2526752630&fm=26&gp=0.jpg",
        name: "linda",
        time: "14分钟前",
        distance: "500米",
        messageDetila: "哈哈哈",
      },
      {
        id: 4,
        sex: 0,
        headImg: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3426182008,849684630&fm=26&gp=0.jpg",
        name: "frig",
        time: "30分钟前",
        distance: "1000米",
        messageDetila: "是的",
      }
    ]
  },

  contact:function(){
    console.log("点击了对话")
    wx.navigateTo({
      url: '../dialog/dialog',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
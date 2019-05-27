// pages/home/home.js

var startPoint;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // tab切换
    currentTab: 0,
    scrollHeight: 0,

    //瀑布流
    imgWidth: 0,
    col1: [],
    col2: [],
    hotListLeftHeight: 0,
    hotListRightHeight: 0,

    //按钮可拖动
    searchButtonBottom: 70,
    searchButtonRight: 20,
    publishButtonBottom: 10,
    publishButtonRight: 20,
    windowHeight: '',
    windowWidth: '',

    sharedList: [{
        id: 1,
        imageHeight: 500,
        imageWidth: 500,
        image: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1340512700,3001552909&fm=26&gp=0.jpg",
        name: "雨伞",
        price: "5元/天",
        distance: "天河区500米内",

      },
      {
        id: 2,
        image: "http://qny.smzdm.com/201904/22/5cbcfbd6987935026.jpg_a200.jpg",
        name: "自拍杆",
        price: "8元/天",
        distance: "天河区600米内",
        imageHeight: 300,
        imageWidth: 200,
      },
      {
        id: 3,
        image: "http://img1.imgtn.bdimg.com/it/u=2085346883,2749659504&fm=11&gp=0.jpg",
        name: "三脚架",
        price: "10元/天",
        distance: "天河区700米内",
        imageHeight: 843,
        imageWidth: 500,
      },
      {
        id: 4,
        image: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3950256298,2802603297&fm=26&gp=0.jpg",
        name: "行李箱",
        price: "10元/天",
        distance: "天河区900米内",
        imageHeight: 667,
        imageWidth: 500,
      },
      {
        id: 1,
        image: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1340512700,3001552909&fm=26&gp=0.jpg",
        name: "雨伞",
        price: "5元/天",
        distance: "天河区500米内",
        imageHeight: 500,
        imageWidth: 500,
      },
      {
        id: 2,
        image: "http://qny.smzdm.com/201904/22/5cbcfbd6987935026.jpg_a200.jpg",
        name: "自拍杆",
        price: "8元/天",
        distance: "天河区600米内",
        imageHeight: 800,
        imageWidth: 200,
      },
      {
        id: 3,
        image: "http://img1.imgtn.bdimg.com/it/u=2085346883,2749659504&fm=11&gp=0.jpg",
        name: "三脚架",
        price: "10元/天",
        distance: "天河区700米内",
        imageHeight: 643,
        imageWidth: 500,
      },

    ],

    demandList: [{
        id: 1,
        sex: 0,
        headImg: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1902767009,2920248927&fm=26&gp=0.jpg",
        name: "啦啦啦",
        time: "刚刚",
        distance: "50米",
        demandTitle: "自拍杆",
        demandDetila: "寻求自拍杆，周末两天游玩要用到",
        money: "10"
      },
      {
        id: 2,
        sex: 1,
        headImg: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=297073658,4148605963&fm=26&gp=0.jpg",
        name: "小花",
        time: "1分钟前",
        distance: "100米",
        demandTitle: "行李箱",
        demandDetila: "周末旅游，寻求20寸行李箱一个",
        money: "20"
      },
      {
        id: 3,
        sex: 1,
        headImg: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3359239509,2526752630&fm=26&gp=0.jpg",
        name: "linda",
        time: "2分钟前",
        distance: "500米",
        demandTitle: "自拍杆",
        demandDetila: "寻求自拍杆，周末两天游玩要用到寻求自拍杆，周末两天游玩要用到",
        money: "30"
      },
      {
        id: 4,
        sex: 0,
        headImg: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3426182008,849684630&fm=26&gp=0.jpg",
        name: "frig",
        time: "5分钟前",
        distance: "1000米",
        demandTitle: "行李箱",
        demandDetila: "周末旅游，寻求20寸行李箱一个周末旅游，寻求20寸行李箱一个",
        money: "5"
      },
      {
        id: 1,
        sex: 0,
        headImg: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1902767009,2920248927&fm=26&gp=0.jpg",
        name: "啦啦啦",
        time: "刚刚",
        distance: "50米",
        demandTitle: "自拍杆",
        demandDetila: "寻求自拍杆",
        money: "10"
      },
      {
        id: 2,
        sex: 1,
        headImg: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=297073658,4148605963&fm=26&gp=0.jpg",
        name: "小花",
        time: "1分钟前",
        distance: "100米",
        demandTitle: "行李箱",
        demandDetila: "周末旅游，寻求20寸行李箱一个周末旅游，寻求20寸行李箱一个周末旅游，寻求20寸行李箱一个",
        money: "20"
      },
      {
        id: 3,
        sex: 1,
        headImg: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3359239509,2526752630&fm=26&gp=0.jpg",
        name: "linda",
        time: "2分钟前",
        distance: "500米",
        demandTitle: "自拍杆",
        demandDetila: "寻求自拍杆，周末两天游玩要用到寻求自拍杆，周末两天游玩要用到周末两天游玩要用到",
        money: "30"
      },
      {
        id: 4,
        sex: 0,
        headImg: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3426182008,849684630&fm=26&gp=0.jpg",
        name: "frig",
        time: "5分钟前",
        distance: "1000米",
        demandTitle: "行李箱",
        demandDetila: "周末旅游，寻求20寸行李箱一个周末旅游，寻求20寸行李箱一个寻求20寸行李箱一个",
        money: "5"
      }
    ]

  },

  /**
   * 滑动
   */
  bindChange: function(e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    })
  },

  /**
   * 点击
   */
  swichNav: function(e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },

  // 在JS中找到组件，并调用fillData() 方法。下拉刷新时 isFull 传 true。

  // fillData: function (e) {
  //   let view = this.selectComponent('#waterFallView');
  //   var list = this.data.sharedList;
  //   view.fillData(false, list);
  //   console.log("2432432");
  // },

  //瀑布流图片处理
  getImageList() {
    /*
      第一步计算出每个图片的高度
      第二步判断放置在哪边
    */
    let _this = this;
    let imageList = this.data.sharedList; //假装我们从后台拿到了列表

    for (let i = 0; i < imageList.length; i++) {

      let imgWidth = _this.data.imgWidth;
      let oImgW = imageList[i].imageWidth;
      let scrollHeight = _this.data.scrollHeight * 0.75;


      let col1 = _this.data.col1;
      let col2 = _this.data.col2;
      var hotListLeftHeightTemp = _this.data.hotListLeftHeight;
      var hotListRightHeightTemp = _this.data.hotListRightHeight;

      //比例计算
      let scale = imgWidth / oImgW;
      imageList[i].imageHeight = imageList[i].imageHeight * scale;

      //防止霸屏
      if (imageList[i].imageHeight > scrollHeight) {
        imageList[i].imageHeight = scrollHeight;
      }

      if (hotListLeftHeightTemp <= hotListRightHeightTemp) {
        hotListLeftHeightTemp += imageList[i].imageHeight;
        col1.push(imageList[i]);
      } else {
        hotListRightHeightTemp += imageList[i].imageHeight;
        col2.push(imageList[i]);
      }

      _this.setData({
        hotListLeftHeight: hotListLeftHeightTemp,
        hotListRightHeight: hotListRightHeightTemp,
        col1: col1,
        col2: col2
      })
    }
  },

  publishClick: function(e) {
    console.log("发布按钮被点击了")
    var currentTab = this.data.currentTab;
    var url;
    if (currentTab == 0) {
      url = '../publishShared/publishShared';
    }else if(currentTab == 1){
      url = '../publishDemand/publishDemand';
    }
    wx.navigateTo({
      url: url,
    })
  },

  //按钮可拖动处理
  buttonStart: function(e) {
    startPoint = e.touches[0]

  },
  buttonMove: function(e) {
    var id = e.currentTarget.id
    var endPoint = e.touches[e.touches.length - 1]
    var translateX = endPoint.clientX - startPoint.clientX
    var translateY = endPoint.clientY - startPoint.clientY
    var ButtonBottom
    var ButtonRight
    startPoint = endPoint
    if (id == "search") {
      ButtonBottom = this.data.searchButtonBottom - translateY
      ButtonRight = this.data.searchButtonRight - translateX
    }

    if (id == "publish") {
      ButtonBottom = this.data.publishButtonBottom - translateY
      ButtonRight = this.data.publishButtonRight - translateX
    }

    //判断是移动否超出屏幕
    if (ButtonRight + 70 >= this.data.windowWidth) {
      ButtonRight = this.data.windowWidth - 70;
    }
    if (ButtonRight <= 20) {
      ButtonRight = 20;
    }

    if (id == "search") {
      if (ButtonBottom <= 70) {
        ButtonBottom = 70
      }
    } else {
      if (ButtonBottom <= 10) {
        ButtonBottom = 10
      }
    }

    if (id == "search") {
      if (ButtonBottom + 60 >= this.data.scrollHeight) {
        ButtonBottom = this.data.scrollHeight - 60;
      }
    } else {
      if (ButtonBottom + 120 >= this.data.scrollHeight) {
        ButtonBottom = this.data.scrollHeight - 120;
      }
    }



    if (id == "search") {
      this.setData({
        searchButtonBottom: ButtonBottom,
        searchButtonRight: ButtonRight
      })
    }

    if (id == "publish") {
      this.setData({
        publishButtonBottom: ButtonBottom,
        publishButtonRight: ButtonRight
      })
    }

  },
  buttonEnd: function(e) {

  },

  sharedItemClick: function(e) {
    console.log("sharedItem被点击了");
    wx.navigateTo({
      url: '../sharedDetail/sharedDetail',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this

    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          scrollHeight: res.windowHeight * 0.945,
          imgWidth: res.windowWidth * 0.49,
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      },
    })
    this.getImageList()

    wx.request({
      url: 'http://127.0.0.1:8080/wesharing-wechat/hello.do',
      success(res){
        console.log(res);
      }
    })

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
    // wx.showNavigationBarLoading()
    // console.log('shuaxin')


    // wx.hideNavigationBarLoading()
    // wx.stopPullDownRefresh()

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
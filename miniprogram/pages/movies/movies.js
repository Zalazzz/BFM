// pages/books/books.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieid: 0,
    detail: [],
    score: 5,
    /*默认五分好评 */
    imgUrls: [{
        id: 0,
        url: 'https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2566598269.webp'
      },
      {
        id: 1,
        url: 'https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2566598269.webp'
      },
      {
        id: 2,
        url: 'https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2566598269.webp'
      }
    ],
    descDesc:"desc-desc",
    btn:true
  },
  // 方法
  show() {
    if(this.data.btn){
      this.setData({
        descDesc:"desc-desc-font",
        btn:false
      })
    }else{
      this.setData({
        descDesc: "desc-desc",
        btn:true
      })
    }

  },
  gotocomment(e) {
    var id = this.data.movieid;
    wx.navigateTo({
      url: '/pages/comment/comment?id=' + id,
    })
  },
  loadMore() {
    //功能:发送请求获取云函数返回数据
    //1:接收电影列表传递参数id
    var id = this.data.movieid;
    // console.log(id)
    //2:显示数据加载提示框
    wx.showLoading({
      title: '加载中...',
    })
    //3:调用云函数
    wx.cloud.callFunction({
      name: "getmoviedetail190906", //云函数名字
      data: {
        id: id
      }
    }).then(res => {

      //4:获取云函数返回结果
      //4.1:将云函数返回字符串转js对象
      var obj = JSON.parse(res.result);
      // console.log(obj);
      //4.2:保js对象保存 deail
      this.setData({
        detail: obj
      })
      //4.3:隐藏加载提示框
      wx.hideLoading();
    }).catch(err => {
      console.log(err);
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      movieid: options.id
    });
    this.loadMore()
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
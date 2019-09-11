// pages/profile/profile.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName:"",
  },
  getUser: function(event) {
    // 功能：获取用户信息
    // console.log(event);
    var detail = event.detail.rawData;
    detail=JSON.parse(detail)
    // console.log(typeof detail);
    var nickName = detail.nickName;
    // console.log(nickNames);
    this.setData({
      nickName: nickName
    })
    // console.log(this.data.nickName)

  },
  gotomy(e){
    console.log(e)
    let nickName=this.data.nickName
    wx.navigateTo({
      url: '/pages/my/my',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
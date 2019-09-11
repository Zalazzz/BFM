// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin:true,
    nickName:"",
    avatarUrl:""
  },
//方法
  getUser: function (event) {
    // 功能：获取用户信息
    // console.log(event);
    var detail = event.detail.rawData;
    detail = JSON.parse(detail)
    console.log(detail);
    var nickName = detail.nickName;
    var avatarUrl= detail.avatarUrl;
    console.log(avatarUrl);
    this.setData({
      nickName: nickName,
      isLogin:false,
      avatarUrl
    })


  },
  quite(){
    this.setData({
      isLogin: true,
    })
  },
  gotoprofile(){
    wx.navigateTo({
      url: '/pages/profile/profile',
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
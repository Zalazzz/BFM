// miniprogram/pages/comment.js
const db = wx.cloud.database({
  
})
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: '', //输入框中显示的内容
    score: 0, //电影评分
    movieid: 0, //当前电影id
    detail: {}, //当前电影详细信息
    fileIds: [], //保存上传图片
    images: [] //保存用户选中图片(预览)
  },
//方法
  onContentChange: function (event) {
    //模拟双向绑定
    this.setData({
      content: event.detail
    })
  },
  onScoreChange: function (event) {
    this.setData({
      score: event.detail
    });
  },
  submit: function () {
    // 功能一：将选中的图片上传云存储
    // (1)显示数据加载中提示框
    wx.showLoading({
      title: '评论中',
    })
    // (2)创建数组保存promise对象
    var rows = [];
    // (3)创建循环遍历选中图片数组中内容
    for (var i = 0; i < this.data.images.length; i++) {
      // (4)为每张图片创建promise对象
      rows.push(new Promise((resolve, reject) => {
        // (5)获取数组中当前图片名称
        var item = this.data.images[i];
        // (6)创建正则表达式来解析图片名称后缀
        var suffix = /\.\w+$/.exec(item)[0];
        // var newFile = new Date().getTime() + suffix;
        // 特殊情况：网络非常好
        var newFile = new Date().getTime() + Math.floor(Math.random() * 9999) + suffix;
        // (7)上传图片
        wx.cloud.uploadFile({ //上传函数
          cloudPath: newFile, //新文件名
          filePath: item, //原文件名
          success: (res) => { //上传成功
            // (8)上传成功获取当前图片fileID
            var fid = res.fileID;
            // (9)保存当前fileID在data中
            this.data.fileIds.push(fid);
            // (10)执行成功 解析
            resolve();
          }
        })
      })) //push end
    } //for end
    // 功能二：将留言/打分/fileID添加云数据库
    // (11)等待所有Promise对象执行完毕在回调函数完成功能二
    Promise.all(rows).then(res => {
      // (12)在云数据库创建集合 comment
      // (13)程序开始位置创建数据库实例对象
      // (14)向comment集合添加一条记录
      db.collection("comment").add({
        // content 留言
        // score 分数
        // movieid  哪个电影评论
        // fileIds 上传图片id列表
        data: {
          content: this.data.content, //分数
          score: this.data.score, //分数
          movieid: this.data.movieid, //电影id
          fileIds: this.data.fileIds //图片列表
        }
      }).then(res => {
        // (15)成功回调函数 隐藏加载提示框 提示文字
        wx.hideLoading();
        wx.showToast({
          title: '评论成功',
        })
      })
        .catch(err => {
          // (16)失败回调函数 隐藏加载提示框 提示文字
          wx.hideLoading();
          console.log(err);
        })
    }) //功能二 end
  },
  uploadImg: function () {
    //功能：选中多张图片、并且预览效果
    wx.chooseImage({
      count: 9, //数量9
      // 图片类型 源图 压缩图
      // 注意图片类型中压缩图格式不是数组，不然ISO系统调用不了相册
      sizeType: ["original", "compressed"],
      // 图片来源 相册 相机
      sourceType: ["album", "camera"],
      // 选中成功
      success: res => {
        // res.tempFilePaths[] 选中图片
        var list = res.tempFilePaths;
        // anydata.images
        this.setData({
          images: list
        })
      }
    })
    // 在wxml循环显示images图片 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      movieid:options.id
    })
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
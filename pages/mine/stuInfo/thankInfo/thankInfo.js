// pages/mine/stuInfo/thankInfo/thankInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    thankMes:{},
    content:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let index = options.id
    let str = `thankMes${index}`// 动态获取 不同 本地存储 的字段名
    this.setData({
      thankMes:JSON.parse(wx.getStorageSync(str))
    });
    this.setData({
      content:this.data.thankMes.content.split('++++') ||[]
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
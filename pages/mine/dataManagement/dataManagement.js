// pages/mine/dataManagement/dataManagement.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mes: [
      {
        router: 'search',
        title: '志愿者管理',
        className:'zhi'
      },
      {
        router: 'search',
        title: '共建者管理',
        className:'gong'

      },
      {
        router: 'search',
        title: '学生档案管理',
        className:'xue'
      },
      {
        router: 'search',
        title: '回访记录管理',
        className:'hui'
      },
      {
        router: 'search',
        title: '申请资助学生管理',
        className:'sheng'
      },
      {
        router: 'search',
        title: '学生外出活动管理',
        className:'out'
      }

    ],
  },


  setStorage(){ // 设置 缓存 方便 动态设置 title
     let index = e.currentTarget.dataset.index;
    sessionStorage.setItem('ManIndex',index + 1);
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
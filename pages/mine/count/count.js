// pages/mine/count/count.js
import $ajaxList from '../../../api/ajaxList'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flagX:false,
    flagZ:false,
    params:{}
  },
  setCount (e) {
    // sessionStorage.setItem('countIndex',index); // 动态设置 title
     let index = e.currentTarget.dataset.index;
     if(index == 1){
         wx.redirectTo({
             url:'./weix/weix'
         })
     }else{
         wx.redirectTo({
             url:'./zhif/zhif'
         })
     }
    // index == 1 ? this.$router.push({name: 'weix'}) : this.$router.push({name: 'zhif'})
  },

  getUserAccount () {// 查看 支付宝 或 微信的收款信息
    $ajaxList.getUserAccount().then(res => {
      // this.flagX = res.data.list[0].appid_wa  ? true :false;
      // this.flagZ = res.data.list[0].appid_ali  ? true :false;
      // this.params = res.data.list[0];
       this.setData({
         flagX:res.data.list[0].appid_wa  ? true :false,
         flagZ:res.data.list[0].appid_ali  ? true :false,
         params:res.data.list[0],
       })
      //   设置 缓存
      wx.setStorageSync('count',JSON.stringify(this.data.params ));
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserAccount();
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
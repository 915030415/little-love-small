// pages/mine/count/weix/weix.js
import check from "../../../../utils/check";
import $ajaxList from "../../../../api/ajaxList";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    uploaderList: [],
    uploaderNum: 0,
    showTopTips: false,
    showUpload: true,
    nextFlag: true,
    imgArr: [],
    params:{
      appid_wa: '',
      bus_wa: '',
      app_secret: '',
      api_key: '',
      api_cer: '',
    }

  },
    setDateAll(type,value){
    // 设置 data
    this.setData({
      [type]:value
    })
  },
    showCheckingMes(mes){
      wx.showToast({ icon:'none',title: mes})
      this.setDateAll('nextFlag',false)
    },
    checking(){

      if (!this.data.params.appid_wa) { // 判断地址
        this.showCheckingMes( '请输入Appld')
        return   this.data.nextFlag
      }
      if (!this.data.params.bus_wa) { // 判断生日
        this.showCheckingMes( '请输入商户号')

        return this.data.nextFlag
      }
      if (!this.data.params.app_secret) { // 判断是否上传照片
        this.showCheckingMes( '请输入API密钥')
        return this.data.nextFlag

      }
      if (!this.data.params.api_key) { // 判断是否上传照片
        this.showCheckingMes( '请输入商户号')
        return this.data.nextFlag
      }
      if (!this.data.params.api_cer) { // 判断是否上传照片
        this.showCheckingMes( '请上传证书')
        return this.data.nextFlag
      }
      return this.data.nextFlag // 返回 是否 可以点击 下一步
    },
    submitForm(e) {
      this.setDateAll('nextFlag',true);// 确保每次都可以验证
      let flag =  this.checking();
      if(flag){
        if(Boolean(JSON.parse(wx.getStorageSync('count')))){
          $ajaxList.upDateAccount({
            ...this.data.params
          }).then(res => {
            wx.redirectTo({
             url:'../count'
           })
            wx.showToast({ icon:'none',title: '设置成功'})
          });
        }else{
          $ajaxList.createAccount({
            ...this.data.params
          }).then(res =>{
            wx.redirectTo({
              url:'../count'
            })
            wx.showToast({ icon:'none',title: '创建成功'})
          })
        }
      }
    },
    setStuMes(type,value){ // 设置 学生信息
      this.setData({
        [`params.${type}`]: value
      })
    },
    formInputChange(e) {
      if(e.currentTarget.id == 'appid_wa'){
        this.setStuMes('appid_wa',e.detail.value)
      }
      if(e.currentTarget.id == 'bus_wa'){
        this.setStuMes('bus_wa',e.detail.value)
      }
      if(e.currentTarget.id == 'app_secret'){

        this.setStuMes('app_secret',e.detail.value)
      }
      if(e.currentTarget.id == 'api_key'){
        this.setStuMes('api_key',e.detail.value)
      }
    },

    clearImg(e){
      let nowList = [];//新数据
      let uploaderList = this.data.uploaderList;//原数据
      let imageArr = this.data.params.api_cer.split('++++');
      for (let i = 0; i < uploaderList.length;i++){
        if (i == e.currentTarget.dataset.index){
          imageArr.splice(i,1,);
          continue;
        }else{
          nowList.push(uploaderList[i])
        }
      }
      let imgStr = imageArr.join('++++');
      this.setStuMes('api_cer',imgStr)
      this.setData({
        uploaderNum: this.data.uploaderNum - 1,
        uploaderList: nowList,
        showUpload: true
      })

    },
    //展示图片
    showImg(e){
      let that=this;
      wx.previewImage({
        urls: that.data.uploaderList,
        current: that.data.uploaderList[e.currentTarget.dataset.index]
      })
    },
    //上传图片
    upload(e) {
      let that = this;
      wx.chooseImage({
        count: 6 - that.data.uploaderNum, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          console.log(res)
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          if(that.data.api_cer == ''){
            that.setStuMes('api_cer',res.tempFilePaths[0]);// 存储图片
          }else{
            let urlStr = that.data.params.api_cer + '++++' + res.tempFilePaths[0]
            that.setStuMes('api_cer',urlStr);// 存储图片
          }
          let tempFilePaths = res.tempFilePaths;
          let uploaderList = that.data.uploaderList.concat(tempFilePaths);
          if (uploaderList.length== 6){
            that.setData({
              showUpload:false
            })
          }
          that.setData({
            uploaderList: uploaderList,
            uploaderNum: uploaderList.length,
          })
        }
      })
    },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setDateAll('params', JSON.parse(wx.getStorageSync('count')) || {
      appid_wa:'',
      bus_wa:'',
      app_secret:'',
      api_key:'',
      api_cer:'',
    })
    this.setDateAll('uploaderList',this.data.params.api_cer.split('++++'));
    this.setDateAll('uploaderNum',this.data.uploaderList.length);
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
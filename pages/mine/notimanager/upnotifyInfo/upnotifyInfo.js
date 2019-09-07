// pages/mine/notimanager/upnotifyInfo/upnotifyInfo.js
import check from "../../../../utils/check";
import $ajaxList from "../../../../api/ajaxList";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    stuHelpLength:0,
    uploaderList: [],
    uploaderNum:0,
    showUpload:true,
    array: ['志愿者', '共建者','所有人'],
    index:0,
    noti_title:'',
    noti_text:'',
    noti_addition:'',
    noti_group:'',
    nextFlag:true
  },



  showCheckingMes(mes){
    wx.showToast({ icon:'none',title: mes})
    this.setDateAll('nextFlag',false)
  },
  checking(){
    if (!this.data.noti_title) { // 判断是否上传照片
      this.showCheckingMes( '请输入标题')
      // this.setDateAll('nextFlag',false)
      return this.data.nextFlag
    }
    if (!this.data.noti_text) { // 判断是否上传照片
      this.showCheckingMes( '输入内容')
      return this.data.nextFlag
    }
    if (!this.data.noti_addition) {
      this.showCheckingMes( '请上传附件')
      return this.data.nextFlag
    }
    return this.data.nextFlag // 返回 是否 可以点击 下一步
  },
  submitForm(e) {// 下一步
    this.setDateAll('nextFlag',true);// 确保每次都可以验证
    let flag =  this.checking();
    if(flag){
      $ajaxList.postNotiMes({
        noti_title:this.data.noti_title,
        noti_text:this.data.noti_text,
        noti_addition:this.data.noti_addition,
        noti_group:this.data.noti_group,
      }).then(res =>{
        wx.showToast({ icon:'none',title: '发布成功'})
        wx.redirectTo({
          url:'../notimanager'
        })
      })
    }
  },
  bindPickerChange(e) {
    if(e.currentTarget.id == 'noti_group'){
      this.setDateAll('index',e.detail.value)
      this.setStuMes('noti_group',Number(e.detail.value) + 1);
    }
  },
  setDateAll(type,value){
    // 设置 data
    this.setData({
      [type]:value
    })
  },
  setStuMes(type,value){ // 设置 学生信息
    this.setData({
      [type]: value
    })
  },
  formInputChange(e) { // 设置 所有input textarear 输入框的值
    if(e.currentTarget.id == 'noti_text'){
      this.setStuMes('noti_text',e.detail.value)
    }
    if(e.currentTarget.id == 'noti_title'){
      this.setDateAll('stuHelpLength',e.detail.value.length);
      this.setStuMes('noti_title',e.detail.value)
    }
  },

  // 图片上传的一些方法
  // 删除图片
  clearImg(e){

    let nowList = [];//新数据
    let uploaderList = this.data.uploaderList;//原数据
    let imageArr = this.data.noti_addition.split('++++');
    for (let i = 0; i < uploaderList.length;i++){
      if (i == e.currentTarget.dataset.index){
        imageArr.splice(i,1,);
        continue;
      }else{
        nowList.push(uploaderList[i])
      }
    }
    let imgStr = imageArr.join('++++');
    this.setStuMes('noti_addition',imgStr)
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
      count: 1 - that.data.uploaderNum, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        console.log(res)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片

        if(that.data.noti_addition == ''){
          that.setStuMes('noti_addition',res.tempFilePaths[0]);// 存储图片
        }else{
          let urlStr = that.data.noti_addition + '++++' + res.tempFilePaths[0]
          that.setStuMes('noti_addition',urlStr);// 存储图片
        }
        let tempFilePaths = res.tempFilePaths;
        let uploaderList = that.data.uploaderList.concat(tempFilePaths);
        if (uploaderList.length==9){
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
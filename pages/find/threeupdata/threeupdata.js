// pages/find/threeupdata/threeupdata.js
import check from "../../../utils/check";
import $ajaxList from '../../../api/ajaxList'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    family_addressLength:0,
    family_progressTextLength:0,
    family_noteLength:0,
    // 家庭情况 的图片
    uploaderList1: [],
    uploaderNum1:0,
    showUpload1:true,
    // 感谢信图片
    uploaderList2: [],
    uploaderNum2:0,
    showUpload2:true,
    showTopTips: false,
    family_progressText:'',
    family_progressImg:'',
    region: ['广东省', '广州市', '海珠区'],
    homeMes: {
      student_id:14,
      family_name: '',
      family_id_number: '',
      family_contact: null,
      family_relation: '',
      // family_address: null,
      // family_progress: '',
      family_letter: '',
      family_note: '',
      areaId:'',
      family_address: ''
    },
    nextFlag:true
  },
  showCheckingMes(mes){
    wx.showToast({ icon:'none',title: mes})
    this.setDateAll('nextFlag',false)
  },
  checking(){
    for (let item in this.data.homeMes) { // 验证 信息
      if (!this.data.nextFlag) { // 避免 很多资料 没填 弹出n条弹框
        break
      }
      switch (item) {
        case 'family_id_number':
          if (!check.IdentityCodeValid(this.data.homeMes.family_id_number)) {
            this.showCheckingMes('身份证号不正确')
            //   wx.showToast({ icon:'none',title: '请输入金额'})
            // this.setDateAll('nextFlag',false)
            break;
          }
        case 'family_contact' :
          if (!check.checkTel(this.data.homeMes.family_contact)) {
            this.showCheckingMes('联系方式有误')
            //  wx.showToast({ icon:'none',title: '请填写名字'})
            // this.setDateAll('nextFlag',false)
            break;
          }
          // break;
        case 'family_name' :
          // let obj =  Object.assign({},this.data.homeMes);
          if(this.data.homeMes.family_name == ''){
            this.showCheckingMes('请填写家人姓名')
            // wx.showToast({ icon:'none',title: '请输入正确身份证'})
            // this.data.nextFlag = false
            break;
          }

        case 'family_relation' :
          if (!this.data.homeMes.family_relation) {
            this.showCheckingMes('请填写与学生的关系')
            //  wx.showToast({ icon:'none',title: '请填写学校名称'})
            // this.setDateAll('nextFlag',false)
            break;
          }
          // break;

        case 'family_address' :
          if (this.data.homeMes.family_address == '') {
            this.showCheckingMes('请填写家庭详细地址')
            //  wx.showToast({ icon:'none',title: '请填写资助信息'})
            // this.setDateAll('nextFlag',false)
            break;
          }
      }
    }
    if(!this.data.nextFlag){
      return this.data.nextFlag
    }
    if (!this.data.family_progressText) {
      this.showCheckingMes( '请填写家庭情况')
      return this.data.nextFlag
    }
    if (!this.data.family_progressImg) { // 判断是否上传照片
      this.showCheckingMes( '请上传家庭情况照片')
      this.setDateAll('nextFlag',false)
      return this.data.nextFlag

    }
    if (!this.data.homeMes.areaId) {
      this.showCheckingMes( '请选择家庭住址')
      // wx.showToast({icon:'none',title: '输入家庭详细地址'})
      // this.setDateAll('nextFlag',false)
      return this.data.nextFlag
    }
    // if (!this.data.homeMes.school_address) { // 判断是否上传照片
    //   this.showCheckingMes( '输入学校详细地址')
    //   // wx.showToast({icon:'none',title: '输入家庭详细地址'})
    //   // this.setDateAll('nextFlag',false)
    //   return this.data.nextFlag
    // }
    return this.data.nextFlag // 返回 是否 可以点击 下一步
  },
  submitForm(e) {// 下一步
    this.setDateAll('nextFlag',true);// 确保每次都可以验证
    let flag =  this.checking();
    if(flag){
      let strProgress = this.data.family_progressText + '++++' + this.data.family_progressImg;
      this.setData({
        homeMes:{...this.data.homeMes,family_progress:strProgress}
      })
      $ajaxList.postFindFamilyMes({
        ...this.data.homeMes,
        student_id: this.data.stuId,
      }).then(res => {
        wx.showToast({
          title: '提交审核成功',
          icon: 'none',
          duration: 1000
        })
        wx.redirectTo({
          url:`../information/information?id=${this.data.stuId}`
        })
        // this.$router.replace({name: 'information', params: {id: this.stuId}})
      }, res => {
        wx.showToast({
          title: '提交审核失败',
          icon: 'none',
          duration: 1000
        });
      })
      // let idCard = this.data.homeMes.id_card.substr(this.data.homeMes.id_card.length - 4)
      // let homeMesStr = 'homeMes' + idCard
      // wx.setStorageSync(homeMesStr,JSON.stringify(this.data.homeMes));
      // let that = this
      // wx.navigateTo({
      //   url:`../twoupdata/twoupdata?id=1`,
      //   success(res){ // 当页面成功被打开 传送数据过去
      //     res.eventChannel.emit('posthomeMes',{homeMes:that.data.homeMes});
      //   }
      // })
    }
  },
  bindPickerChange(e) {
    if(e.currentTarget.id == 'region'){
      // 设置地址
      this.setDateAll('region',e.detail.value)
      this.sethomeMes('areaId',Number(e.detail.code[2]))
    }
    // if(e.currentTarget.id == 'sex'){ // 设置性别
    //   this.setDateAll('index',e.detail.value)
    //   this.sethomeMes('sex',Number(e.detail.value) + 1); // 1为男 2 为女
    // }
    // if(e.currentTarget.id == 'date'){ // 设置生日
    //   this.setDateAll('date',e.detail.value);
    //   this.birthday(e.detail.value)
    // }
  },
  setDateAll(type,value){
    // 设置 data
    this.setData({
      [type]:value
    })
  },
  // onConfirm (val) { // 创档日期的值
  //   this.setData({
  //     'homeMes':{...this.data.homeMes,student_date:Time.getNowTime()}
  //   })
  // },
  sethomeMes(type,value){ // 设置 学生信息
    this.setData({
      [`homeMes.${type}`]: value
    })
  },
  formInputChange(e) { // 设置 所有input textarear 输入框的值
    if(e.currentTarget.id == 'family_name'){
      this.sethomeMes('family_name',e.detail.value)
    }
    if(e.currentTarget.id == 'family_id_number'){
      this.sethomeMes('family_id_number',e.detail.value)
    }
    if(e.currentTarget.id == 'family_contact'){
      // this.setDateAll('family_contact',e.detail.value.length)
      this.sethomeMes('family_contact',e.detail.value)
    }
    if(e.currentTarget.id == 'family_address'){
      this.setDateAll('family_addressLength',e.detail.value.length);
      this.sethomeMes('family_address',e.detail.value)
    }
    if(e.currentTarget.id == 'family_progressText'){
      this.setDateAll('family_progressText',e.detail.value);
      this.setDateAll('family_progressTextLength',e.detail.value.length);
      // this.sethomeMes('school_teacher_number',e.detail.value);
    }
    if(e.currentTarget.id == 'family_note'){
      this.sethomeMes('family_note',e.detail.value)
      this.setDateAll('family_noteLength',e.detail.value.length);
    }
    if(e.currentTarget.id == 'family_relation'){
      this.sethomeMes('family_relation',e.detail.value)
    }
  },

  // 图片上传的一些方法
  // 删除图片
  clearImg(e){
    let nowList = [];//新数据
    let typeIndex = e.currentTarget.dataset.type
    let uploaderListType = `uploaderList${typeIndex}`
    let uploaderList = this.data[uploaderListType];//原数据
    let imageArr = [];
    if(typeIndex == '1'){
      imageArr = this.data.family_progressImg.split('++++');
    }else{
      imageArr = this.data.homeMes.family_letter.split('++++');
    }
    for (let i = 0; i < uploaderList.length;i++){
      if (i == e.currentTarget.dataset.index){
        imageArr.splice(i,1,);
        continue;
      }else{
        nowList.push(uploaderList[i])
      }
    }
    let imgStr = imageArr.join('++++');
    if(typeIndex == '1'){
      this.setData({
        uploaderNum1: this.data.uploaderNum1 - 1,
        uploaderList1: nowList,
        showUpload1: true,
        family_progressImg:imgStr
      })
    }else{
      this.sethomeMes('family_letter',imgStr)
      this.setData({
        uploaderNum2: this.data.uploaderNum2 - 1,
        uploaderList2: nowList,
        showUpload2: true
      })
    }

  },
  //展示图片
  showImg(e){
    let that=this;
    let typeIndex = e.currentTarget.dataset.type
    let uploaderList = `uploaderList${typeIndex}`
    wx.previewImage({
      urls: that.data[uploaderList],
      current: that.data[uploaderList][e.currentTarget.dataset.index]
    })
  },
  //上传图片
  upload(e) {
    let that = this;
    let typeIndex =e.currentTarget.dataset.index;
    let uploaderNum = `uploaderNum${typeIndex}`
    wx.chooseImage({
      count: 6 - that.data[uploaderNum], // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        console.log(res)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        if(typeIndex == '1'){
          if(that.data.family_progressImg == ''){
            that.setData({
              family_progressImg:res.tempFilePaths[0]
            });// 存储图片
          }else{
            let urlStr = that.data.family_progressImg + '++++' + res.tempFilePaths[0]
            that.setData({
              family_progressImg:urlStr
            });// 存储图片
          }
          let tempFilePaths = res.tempFilePaths;
          let uploaderList = that.data.uploaderList1.concat(tempFilePaths);
          if (uploaderList.length== 6){
            that.setData({
              showUpload1:false
            })
          }
          that.setData({
            uploaderList1: uploaderList,
            uploaderNum1: uploaderList.length,
          })
        }else{
          if(that.data.homeMes.family_letter === ''){
            that.sethomeMes('family_letter',res.tempFilePaths[0]);// 存储图片
          }else{
            let urlStr = that.data.homeMes.family_letter + '++++' + res.tempFilePaths[0]
            that.sethomeMes('family_letter',urlStr);// 存储图片
          }
          let tempFilePaths = res.tempFilePaths;
          let uploaderList = that.data.uploaderList2.concat(tempFilePaths);
          if (uploaderList.length== 6){
            that.setData({
              showUpload2:false
            })
          }
          that.setData({
            uploaderList2: uploaderList,
            uploaderNum2: uploaderList.length,
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setDateAll('stuId',Number(options.id))
    // this.stuId = this.$route.params.id
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
// pages/mine/myinfo/myinfo.js
import check from '../../../utils/check'
import $ajaxList from '../../../api/ajaxList'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    myaddrXLength:0,
    array: ['共建者', '志愿者'],
    index:0,
    array1: ['男', '女'],
    index1:0,
    array2: ['未婚', '已婚'],
    index2:0,
    uploaderList: [],
    uploaderNum:0,
    showUpload:true,
    region: ['广东省', '广州市', '海珠区'],
    param: {
      role: 1,
      name: '',
      sex: 1,
      phone: '',
      job: '',
      marriage: 1,
      address: '',
      email: '',
      firm: '',
      contact: '',
      rec: '',
      recContact: '',
      photo: '',
      idcard: '',
      vol_areaid: '',
    },
    nextFlag:true,
    id: '',
    flag: true,
  },

  getVolunteerInfo() { // 获取 我的信息
    $ajaxList.getVolunteerInfo({
      id: 2
    }).then(data => {
      let mes = data.data.one
      this.setData({
        param:{
          role: mes.role,
          name: mes.name,
          sex: mes.sex,
          phone: mes.phone,
          idcard: mes.idcard,
          job: mes.job,
          marriage: mes.marriage,
          address: mes.address,
          email: mes.email,
          firm: mes.firm,
          contact: mes.contact,
          rec: mes.rec,
          recContact: mes.recContact,
          photo:mes.photo,
          vol_areaid:mes.vol_areaid
        },
        index : mes.role == 1 ? 0 : 1,
        index1 :mes.sex == 1 ? 0 : 1,
        index2 :mes.marriage == 1 ? 0 : 1,
        uploaderList:mes.photo && [mes.photo] || '',
        showUpload:mes.photo && false || true,
        uploaderNum:mes.photo && 1 || 0,
        myaddrXLength:mes.address && mes.address.length || 0,
        region:[mes.province,mes.city,mes.district]
      });
      //  for(let item in this.data.param){
      //    this.formInputChange({currentTarget:{id:item},detail:{value:this.data.param[item]}});// 主动触发 输入框函数
      //    // this.bindPickerChange({currentTarget:{id:item},detail:{value:this.data.param[item]}});
      // }
      if(!this.data.param.phone){
        // 如果没有 重新设置 就为登录的手机号
        this.setData({
          [`param.phone`]:wx.getStorageSync('phone')
        })
         console.log(this.param,'s')
        // this.param.phone =  wx.getStorageSync('phone');
        // this.formInputChange({currentTarget:{id:'phone'},detail:{value:wx.getStorageSync('phone')}});// 主动触发 输入框函数
      }
      if (mes.status == 3) {
        this.setData({
          flag:true,
          attrFlag:false
        })
        wx.showToast({ icon:'none',title: '资料审核失败,请重新提交'})
      } else if(mes.status ==2) {
        this.setData({
          flag:false,
          attrFlag:true
        })
         wx.setStorageSync('VolunMesSubmitAddr', '');
         wx.setStorageSync('VolunMesSubmit', '');
        wx.showToast({ icon:'none',title: '资料审核通过'})
      } else if(mes.status == 1){
        let str = 'SubmitProgress' + mes.id;
        if( Number( wx.getStorageSync(str)) !== 1){
          this.setData({
            flag:true,
            attrFlag:false,
            region:['广东省', '广州市', '海珠区'],
          });
        }else{
          this.setData({
            flag:false,
            attrFlag:true
          })
          wx.showToast({ icon:'none',title: '资料审核中'})
        }
      }
    })
  },
  postMessage() { // 提交审核
   $ajaxList.upDataAccount({
      ...this.data.param,
      status: 1,
    }).then(res => {
       let role = this.data.role;
       wx.setStorageSync('hiddenFlag',true);// 关闭 弹窗的
       wx.setStorageSync('VolunMesSubmit', JSON.stringify(this.data.param));
       wx.setStorageSync('VolunMesSubmitAddr', JSON.stringify(this.data.region));
       wx.setStorageSync('ImgArr', this.data.param.photo);
       wx.setStorageSync('helpFlag',true);// 表示提交了审核
       let str = 'SubmitProgress' + res.data.id
       wx.setStorageSync(str, 1);// 提交了资料 在审核中
       wx.setStorageSync('subMitRole',role);
       wx.showToast({ icon:'success',title: '提交成功'})
       wx.switchTab({
       url: '../mine'
         })
    })
  },
  checkEmail(str) { // 验证邮箱

  let re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
  if (re.test(str)) {
    return true
  } else {
    return false
  }
   },

  // 43018119980109257X
  showCheckingMes(mes){
    wx.showToast({ icon:'none',title: mes})
    this.setDateAll('nextFlag',false)
  },
  checking(){
    if (!this.data.param.name) {
      this.showCheckingMes( '请输入名字')
      // this.setDateAll('nextFlag',false)
      return  this.data.nextFlag
    }
    if (!check.IdentityCodeValid(this.data.param.idcard)) {
      // this.setDateAll('nextFlag',false)
      this.showCheckingMes( '请输入正确身份证')
      return this.data.nextFlag
    }
    if (!check.checkTel(this.data.param.phone)) {
      this.showCheckingMes( '请输入正确电话号码')
      // this.setDateAll('nextFlag',false)
      return this.data.nextFlag
    }
    if (!this.data.param.job) {
      this.showCheckingMes( '输入职业')
      // this.setDateAll('nextFlag',false)
      return this.data.nextFlag
    }
    if (!this.data.param.photo) {
      this.showCheckingMes( '请上传个人照片')
      // this.setDateAll('nextFlag',false)
      return this.data.nextFlag
    }

    if (!this.data.param.vol_areaid) {
      this.showCheckingMes( '请选择个人地址')
      // this.setDateAll('nextFlag',false)
      return this.data.nextFlag
    }
    if (!this.data.param.address) {
      this.showCheckingMes( '请输入详细地址')
      // this.setDateAll('nextFlag',false)
      return this.data.nextFlag
    }

    if (!this.checkEmail(this.data.param.email)) {
      this.showCheckingMes( '请正确邮箱')
      // this.setDateAll('nextFlag',false)
      return this.data.nextFlag
    }

    if (!this.data.param.firm) {
      this.showCheckingMes( '请输入单位地址')
      // this.setDateAll('nextFlag',false)
      return this.data.nextFlag
    }

    if (!check.checkTel(this.data.param.contact)) {
      this.showCheckingMes( '请输入正确单位电话号码')
      // this.setDateAll('nextFlag',false)
      return this.data.nextFlag
    }

    if (!this.data.param.rec) {
      this.showCheckingMes( '请输入推荐人')
      // this.setDateAll('nextFlag',false)
      return this.data.nextFlag
    }
    if (!check.checkTel(this.data.param.recContact)) {
      this.showCheckingMes( '请输入正确推荐人电话号码')
      // this.setDateAll('nextFlag',false)
      return this.data.nextFlag
    }


    return this.data.nextFlag // 返回 是否 可以点击 下一步
  },
  submitForm(e) {// 下一步
    this.setDateAll('nextFlag',true);// 确保每次都可以验证
    let flag =  this.checking();
    if(flag){
      wx.showModal({
        title: '提示',
        content: '是否提交审核,一旦提交资料不可修改',
        success:(res)=>{
          if (res.confirm) {
            this.postMessage();
          } else if (res.cancel) {

          }
        }
      })
    }
  },
  bindPickerChange(e) {
    if(e.currentTarget.id == 'role'){
      // 角色
      this.setDateAll('index',e.detail.value)
      this.setStuMes('role',Number(e.detail.value +1))
    }
    if(e.currentTarget.id == 'mysex'){ // 设置性别
      this.setDateAll('index1',e.detail.value)
      this.setStuMes('sex',Number(e.detail.value) + 1); // 1为男 2 为女
    }
    if(e.currentTarget.id == 'marriage'){ // 婚姻状况
      this.setDateAll('index2',e.detail.value)
      this.setStuMes('marriage',Number(e.detail.value) + 1); // 1为男 2 为女
    }
    if(e.currentTarget.id == 'myaddr'){
      // 设置地址
      this.setDateAll('region',e.detail.value)
      this.setStuMes('vol_areaid',Number(e.detail.code[2]))
    }


  },
  getMesSexAndage(){ //根据身份证 获取生日 和 性别
    let sex = 1;
    if(check.IdentityCodeValid(this.data.param.idcard)){
      sex =  check.getSexFromIDCard(this.data.param.idcard);
      let  index = sex == '男' ? 0 : 1;
      this.setDateAll('index1',index);
      console.log(this.data.index1)
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
      [`param.${type}`]: value
    })
  },
  formInputChange(e) { // 设置 所有input textarear
    if(e.currentTarget.id == 'name'){// 名字
      this.setStuMes('name',e.detail.value)
    }
    if(e.currentTarget.id == 'idcard'){ // 身份证
      this.setStuMes('idcard',e.detail.value)
    }
    if(e.currentTarget.id == 'phone'){ // 电话号码
      this.setStuMes('phone',e.detail.value);
    }
    if(e.currentTarget.id == 'job'){ // 职业
      this.setStuMes('job',e.detail.value);
    }

    if(e.currentTarget.id == 'address') {// 详细地址
      this.setDateAll('myaddrXLength',e.detail.value && e.detail.value.length);
      this.setStuMes('address',e.detail.value)
    }

    if(e.currentTarget.id == 'email') {// 邮箱
      this.setStuMes('email',e.detail.value)
    }

    if(e.currentTarget.id == 'firm') {// 单位地址
      this.setStuMes('firm',e.detail.value)
    }

    if(e.currentTarget.id == 'contact') {// 单位联系人电话
      this.setStuMes('contact',e.detail.value)
    }
    if(e.currentTarget.id == 'rec') {// 推荐人
      this.setStuMes('rec',e.detail.value)
    }
    if(e.currentTarget.id == 'recContact') {// 推荐人电话
      this.setStuMes('recContact',e.detail.value)
    }




  },

  // 图片上传的一些方法
  // 删除图片
  clearImg(e){
    let nowList = [];//新数据
    let uploaderList = this.data.uploaderList;//原数据

    for (let i = 0; i < uploaderList.length;i++){
      if (i == e.currentTarget.dataset.index){
        continue;
      }else{
        nowList.push(uploaderList[i])
      }
    }
    this.setData({
      uploaderNum: this.data.uploaderNum - 1,
      uploaderList: nowList,
      showUpload: true
    })
    this.setStuMes('photo','');// 删除存储的图片
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
        that.setStuMes('photo',res.tempFilePaths[0]);// 存储图片
        let tempFilePaths = res.tempFilePaths;
        let uploaderList = that.data.uploaderList.concat(tempFilePaths);
        if (uploaderList.length==1){
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
    // this.setData({
    //   roleLongin:Number(wx.getStorageSync('roleMan'))
    // })
        let roleLongin = Number(wx.getStorageSync('roleMan'))
    console.log(roleLongin)
        if(roleLongin == 1 || roleLongin == 2 || roleLongin == 0){
      this.getVolunteerInfo();
    }
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
// pages/login/login.js
import $ajaxList from "../../api/ajaxList";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    register:true,
    mobile: '',
    code: '',
    nextFlag:true,
    loginMes:'没有账号，去注册',
    phoneTitle:'登录壹点爱助学服务'
  },
  // 注册
  registerWay(){
    this.setData({
      nextFlag:true
    })
    let flag = this.checking()
    if(flag){
      $ajaxList.createAccountregister({
        account:this.data.mobile,
        password:this.data.code
      }).then(res=>{
        if(res.code == 100){
          wx.showToast({
            title: '注册成功',
            icon: 'success',
            duration:1500
          })

          this.login();
          // this.toLogin();
        }else{
          wx.showToast({
            title: res.message,
            icon: 'none',
            duration:1500
          })
        }
      },res =>{
        wx.showToast({
          title: '注册出错',
          icon: 'none',
          duration:1500
        })
      })
    }
  },

  toLogin(){
    this.setData({
      register:!this.data.register,
      loginMes:this.data.loginMes == '没有账号，去注册' ? '已经有账号，去登录' : '没有账号,去注册',
      phoneTitle:this.data.phoneTitle == '注册账号' ? '登录壹点爱助学服务' : '注册账号'

    })
  },
  checking () { // 验证 表单
    if (!this.data.mobile) {
      wx.showToast({ icon:'none',title: '请输入账户'})
      this.setData({
        nextFlag:false
      })
      return this.data.nextFlag
    }
    if (!this.data.code) { // 判断是否上传照片
      wx.showToast({ icon:'none',title: '请输入密码'})
      this.setData({
        nextFlag:false
      })
      return this.data.nextFlag
    }
    // if(!this.checkPhone(this.mobile)){
    //     this.showToast({msg: '请输入正确手机号'})
    //     this.nextFlag = false
    //   return this.nextFlag
    // }
    // if (!this.code) {
    //   this.showToast({msg: '请输入密码'})
    //   this.nextFlag = false
    //   return this.nextFlag
    // }else if(this.code.length < 6){
    //   this.showToast({msg: '密码必须大于6位数'})
    //   this.nextFlag = false
    //   return this.nextFlag
    // }
    return this.data.nextFlag // 返回 是否 可以点击 下一步
  },
  inputchange(e){
    if(e.currentTarget.id == 'text'){
          this.setData({
            mobile:e.detail.value
          })
    }
    if(e.currentTarget.id == 'password'){ // 设置性别
      this.setData({
        code:e.detail.value
      })
    }
  },
  login(){
    //  设置 缓存 或 放到 vux 里面
    this.setData({
      nextFlag:true
    })
    let flag = this.checking()
    if (flag) {
      $ajaxList.loginFirst({
        account:this.data.mobile,
        password:this.data.code
      }).then(res =>{
        if(res.code == 100){
          wx.showToast({
            title: '登录成功',
            icon: 'success',
            duration:1500
          })
          // sessionStorage.setItem('ID',res.data.user.id);
          wx.setStorageSync("ID",res.data.user.id)
          // base64 加密
          //Base64.encode(res.data.one.role)
          // 解密Base64.decode();
          // let str ='token' + res.data.user.id
          // let id = res.data.user.id;
          // window.id = id;
          // let account = res.data.user.account;
          // let worker = new Worker('../../api/index.js')
          // worker.postMessage(id) // 给 拦截器传入 id 传入了
          // worker.onmessage = function(e){
          //   worker.terminate();// 断开链接
          // }
          // localStorage.setItem('id',id);
          // localStorage.setItem('account',account);
          // localStorage.setItem(str,res.data.token);
          // localStorage.setItem('token',res.data.token);
          // // 设置 每个不同用户的 token 解决多用户登录问题
          // sessionStorage.setItem('roleMan',res.data.user.role);
          // sessionStorage.setItem('phone',this.mobile)
          wx.setStorageSync("token",res.data.token)
          wx.setStorageSync('roleMan',res.data.user.role)
          wx.setStorageSync('phone',this.data.mobile)
          wx.reLaunch({
            url: '../index/index?id=1'
          })
        }else if(res.code = -1){
          let mes = res.message
          wx.showToast({
            title: mes,
            icon: 'none',
            duration:1500
          })
          // this.showToast({msg: mes})
        }
      },resp =>{
        // this.showToast({msg: '登录出错'})
        wx.showToast({
          title: '登录出错',
          icon: 'none',
          duration:1500
        })
      });
    }
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
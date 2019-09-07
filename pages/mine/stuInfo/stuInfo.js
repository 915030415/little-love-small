// pages/mine/stuInfo/stuInfo.js
import $ajaxList from '../../../api/ajaxList';
import {Time as time} from '../../../utils/time'
let Time = new time()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flagTab0:true,// 控制 导航栏 显示 什么 内容
    flagTab1:false,
    flagTab2:false,
    flagTab3:false,
    flagTab4:false,
    student_id:1,
    user_id:1,
    mes: ['+确认收款', '+回访记录', '+感谢信'],
    mes1: [ '打款', '外出活动申请'],
    mes3:'',
    stuId:1,
    roleMes:'stu',
    flagH: false, // 帮助
    flagR: false, // 驳回
    flag: false, // 调查
    flagV: false, // 取消 志愿者
    flagM:false,// 是否为管理员
    flagSwi:true,// 我资助学生 申请中的不能 看见滚动条
    slide: [
      {title: '基本信息', router: 'mes'},
      {title: '到款记录', router: 'backMoney'},
      {title: '回访记录', router: 'backVisit'},
      {title: '感谢信', router: 'thank'},
      {title: '外出活动记录', router: 'outdoor'}
    ],
    ClassFlag: [true,false,false,false,false],
    routerID: 3, // 志愿者的id


    stuInfo:{

    },// 学生头部信息及基本信息
    moneyHistory:[

    ],//收资历史记录
    familyInfo:{},// 家庭信息

    //到款记录
    framesClass:true, // 动画 控制
    flagApply1:false,// 控制 有无信息
    hiddenPhoto:false, // 图片遮罩层
    photo:'', // 放大图片展示
    stu: [
      // {
      //   proof: 'AAAAAAAA',
      //   student: 234324,
      //   time: 10000
      // },
      // {
      //   proof: 'AAAAAAAA',
      //   student: 123423432,
      //   time: 10000
      // }
    ],
    moneyImageArr:[],


  //   回访记录

    flagApply2:false,
    id: 1,
    flagVF:false,
    visit: [
    ],


  //   感谢信

    flagApply3:false,
    thankList: [],

  //   外出活动
    outdoorContent:[],
    flagApply4:false,


  },
  //共用的一些方法
  routeReplace (e) { // 更改 类名  路由跳转
    let name  = e.currentTarget.dataset.name;
    let id = e.currentTarget.dataset.id;
    let index = id = e.currentTarget.dataset.index;
    this.setData({
      ClassFlag:[false,false,false,false,false],
    })
    let classArr = this.data.ClassFlag;
    classArr.splice(index,1,true);
    this.setData({
      ClassFlag:classArr,
    });
    for(let i =0;i<5;i++){
      this.setflagTab(i,false);
    }
    this.setflagTab(index,true);

    this.getContent(index);// 根据tab 切换显示不同的信息


  },
  setflagTab(index,value){ // 设置 tab 显示
    this.setData({
      [`flagTab${index}`]:value
    })
  },
  judeg() { // 判断是 志愿者 还是 共建者 进来的页面 或者是 我调查的 我帮助的 或 学生档案
    this.setData({
      role:String(wx.getStorageSync('roleStuInfo'))
    })
    if(this.data.role == 'M'){
      wx.setStorageSync('RefuseMes','stuInfo');//设置缓存 表明为 管理员 进入的学生详情页面
      this.setData({
        flagM:true,
      })
    }else if(this.data.role == 'inq' && this.data.stuInfo.student_stats == 2 ){
      this.setData({
        flag:true,
      })
    }else if(this.data.role == 'help' && this.data.stuInfo.status3 == 2){
      this.setData({
        flagH:true,
      })
    }
    if(this.data.role == 'help' && this.data.stuInfo.status3 == 0){
      this.setData({
        flagSwi:true,
      })
    }
  },
  getContent(index){

    if(index==0){
      this.getStuInfoByIdAndHistoryAndFamily()
    }
    if(index==1){
      this.getStuMoney()
    }
    if(index==2){
      this.getStuVisit()
    }
    if(index==3){
      this.getStuThank()
    }
    if(index==4){
      this.getOutMesByStuId()
    }


  },

  // 学生基本信息
  getStuInfoByIdAndHistoryAndFamily () {
    let Info = $ajaxList.getStuInfoById( // 查看学生个人信息
        {
          id: this.data.stuId
        }
    )
    let money = $ajaxList.getMoneyHistory( // 查看学生受资助历史信息
        {
          Id: this.data.stuId
        }
    )
    let familyArrAjax = $ajaxList.getFamilyInfo( // 查看学生家庭情况
        {
          Id: this.data.stuId
        }
    )
    Promise.all([Info, money, familyArrAjax]).then(resp => {
      this.setData({
        stuInfo: resp[0].data.one
      })
      if(this.data.stuInfo.student_stats == 2 &&  this.data.flagM){ // 表示 已经通过 并且是管理者
        this.setData({
          flagV:true,
          flagR:false,
        })
      }else if(this.data.stuInfo.student_stats == 3 && this.data.flagM){
        this.setData({
          flagV:false,
          flagR:false,
        })
      }else if(this.data.stuInfo.student_stats == 1 && this.data.flagM){
        this.setData({
          flagR:true,
          flagV:false,
        })
      }
      this.judeg();
      this.setData({
        moneyHistory:resp[1].data.one,
        familyInfo:resp[2].data.one[0]
      })
    })
  },

  // 到款记录
  getStuMoney () {
    $ajaxList.getStuMoney(
        {
          student: this.data.stuId
        }
    ).then(res => {
      let stuMoney = res.data.one;
      let moneyImageArr = [];
      stuMoney.forEach((ele, index) => {
        let newDate = Time.getTimeMinute  (ele.time)// 处理时间格式
        ele.time = newDate;
        moneyImageArr.push(ele.proof)
      })
      this.setData({
        stu:stuMoney,
        flagApply1:true,
        moneyImageArr:moneyImageArr
      })
      console.log(this.data.flagApply1)
    })
  },
  //展示图片
  showImg(e){
    let that=this;
    wx.previewImage({
      urls: that.data.moneyImageArr,
      current: that.data.moneyImageArr[e.currentTarget.dataset.index]
    })
  },


  // 回访记录
  getStuVisit () {
   $ajaxList.getStuVisit(
        {
          student:  this.data.stuId
        }
    ).then(res => {
      // 存储数据 详细页面 可以获取

      let stuVisitArr = res.data.one;
      this.setData({
        flagVF:true,
        flagApply2:true,
      })
      if(res.data.one[0] == undefined){
        this.setData({
          flagVF:false,
          flagApply2:false,
        })
      }
      stuVisitArr.forEach((ele, index) => {
        let newDate = Time.getTime(ele.date)// 处理时间格式
        ele.date = newDate// 详细页面也需要 该 所以 不需要 克隆
        let newele = Object.assign({}, ele)// 克隆保存 截取后数据
        newele.study.slice(0, 30)// 截取 部分内容
        // this.$set(this.stu, index, newele)
        let eleObj = JSON.stringify(ele)
        wx.setStorageSync(`stuVisit${index}`, eleObj)
        //   设置的 回访记录 名称 为 学生 的 信息的下标
      })
     this.setData({
       visit:stuVisitArr
     })
    })
  },
  //  查看详细页
  seeVisitInfo(e){
  let index = e.currentTarget.dataset.index;
  wx.navigateTo({
    url:`./backVisitInfo/backVisitInfo?id=${index}`
  })
  },


  // 感谢信
  getStuThank () {
    $ajaxList.getStuThank({
      student: this.data.stuId
    }).then(res => {
      let thankMes = res.data.one
      this.setData({
        flagApply3:true,
      })
      if(res.data.one[0] == undefined){
        this.setData({
          flagApply3:false,
        })
      }
      thankMes.forEach((ele, index) => {
        let newDate = Time.getTime(ele.time)// 处理时间格式
        ele.time = newDate
        let eleObj = JSON.stringify(ele)
       wx.setStorageSync(`thankMes${index}`, eleObj)
        //   设置的 感谢信息名称 为 学生 的 信息的下标
      })
      this.setData({
        thankList:thankMes,
      })
    })
  },
  seeThankInfo(e){
    let index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url:`./thankInfo/thankInfo?id=${index}`
    })
  },


  // 外出活动
  getOutMesByStuId () {
    $ajaxList.getOutMesByStuId({
      student:this.data.stuId
    }).then(res => {
      res.data.one.forEach(ele =>{
        ele.time = Time.getTime(Number(ele.out_time));
      });
      this.setData({
        outdoorContent:res.data.one,
        flagApply4:true,
      })
      if(res.data.one[0] == undefined){
        this.setData({
          outdoorContent:res.data.one,
          flagApply4:false,
        })
      }
    })
  },


  //  上传信息的方法

  refuse () { // 驳回
    // if(this.roleMes == 'visi'){ // 表示 回访记录管理
    //   this.$router.push({name: 'VisiRefuse', params: {id: this.$route.params.id}})
    // }else{
    //   this.$router.push({name: 'stuRefuse', params: {id: this.$route.params.id}})
    // }
    // this.$router.push({name: 'refuse', params: {id:this.id}})
  },
  pass(){

    if(this.mes == 'stuInfo')  {
      this.$ajaxList.PostStuPass({
        student_id:this.id,
        student_stats:2
      }).then(res =>{
        this.showToast({msg: '审核已通过'})
        this.$router.go(-1);
      })
    }else if(this.mes == 'visi'){
      this.$ajaxList.PostVisitePass({
        id:this.id,
        status:2,
      }).then(res=>{
        this.showToast({msg: '通过成功'})
        this.$router.go(-1);
      })
    }
  },

  post (e) {// 确认收款 上传 感谢信 上传回访记录
    let index = e.currentTarget.dataset.index
    switch (index) {
      case 0:
        wx.navigateTo({
          url:`./confirmMoney/confirmMoney?id=${this.data.stuId}`
        })
        break
      case 1:
        wx.navigateTo({
          url:`./upBackVisit/upBackVisit?id=${this.data.stuId}`
        })
        break
      case 2:
        wx.navigateTo({
          url:`./upThank/upThank?id=${this.data.stuId}`
        })
        break
    }

  },

  post1(e){// 外出活动申请
    let index = e.currentTarget.dataset.index
    switch (index) {
      case 0:
        wx.navigateTo({
          url:`./askOut/askOut?id=${this.data.stuId}`
        })
        break
      case 1:
        wx.navigateTo({
          url:`./askOut/askOut?id=${this.data.stuId}`
        })
        break
    }
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.setData({
     stuId:Number(options.id),
     mes3:wx.getStorageSync('RefuseMes'), // 获取缓存 判断是 那种界面 进来的
   })

    this.judeg();
    this.getStuInfoByIdAndHistoryAndFamily()
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
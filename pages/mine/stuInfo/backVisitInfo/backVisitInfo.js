// pages/mine/stuInfo/backVisitInfo/backVisitInfo.js
import $ajaxList from '../../../../api/ajaxList'
import {Time as time} from '../../../../utils/time.js';
const Time = new time();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flagVisi:true,
    flagManage:true, // 控制 回访记录 通过 和 驳回的显示
    stuVisit:{
      score:'',
    },
    stuMes:{},
    roleMes:'visi',
    stuId:1,
    index:1,// 回访记录表id
    score:[],
  },


  getAge (time) { // 获取岁数
    let now = Date.now()
    let nowDate = new Date(now)
    let nowYear = nowDate.getFullYear()
    let lastNow = new Date(time * 1000)
    let lastYear = lastNow.getFullYear()
    return nowYear - lastYear
  },

  //获取回访记录详细信息
  getVisiteMesM(){
    $ajaxList.getVisiteMesM(
        {
          id: this.data.index
        }
    ).then(res =>{
      this.setData({
        stuVisit:res.data.one,
      })
      let date = Time.getTime( res.data.one.date);
      let score = res.data.one.score.split('++++') || []
      this.setData({
        [`stuVisit.date`]:date,
        score:score
      })
    })
  },

// 查看学生个人信息
  getStuInfoById(){
    $ajaxList.getStuInfoById(
        {
          id: this.data.stuId
        }
    ).then(res =>{
      this.setData({
        stuMes:res.data.one,
      })
      this.setData({
        [`stuMes.student_birthday`]:this.getAge(this.data.stuMes.student_birthday),
      })
      // this.stuMes = res.data.one;
      // this.stuMes.student_birthday =this.getAge(this.stuMes.student_birthday);
    })
  },



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


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //  设置 缓存 表示 是 管理员 回访记录 的 驳回 通过界面
    let id = options.id + ''

    wx.setStorageSync('RefuseMes','visi');//设置缓存 表明为 回访记录管理
    this.setData({
      index:Number(id.split('/')[0].split('+')[0]),
      stuId: id.split('/')[0].split('+')[1],
      flagManage:id.split('/')[1]== 'flagManage' ? true :false,
      flagVisi:id.split('/')[2] == '1' ? true :false,
    })
    // this.index = Number(id.split('/')[0].split('+')[0]);
    // this.stuId = id.split('/')[0].split('+')[1]
    let str = `stuVisit${this.data.index}`// 动态获取 不同 本地存储 的字段名
    // this.flagManage = id.split('/')[1]== 'flagManage' ? true :false;
    // this.flagVisi = id.split('/')[2] == '1' ? true :false;
    if (!this.data.flagManage) { // 当不上管理员时
      this.setData({
        stuVisit:JSON.parse(wx.getStorageSync(str)),
      })
      let score =this.data.stuVisit.score.split('++++') || []
      this.setData({
        score:score
      })

      // this.stuVisit = JSON.parse(sessionStorage.getItem(str))// 设置 数据
    } else { // 管理员
      this.getVisiteMesM();
      this.getStuInfoById();
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
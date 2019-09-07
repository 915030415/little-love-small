// pages/mine/history/history.js
import $ajaxList from '../../../api/ajaxList'
import {Time as time} from '../../../utils/time'
let Time = new time()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    accounts: [
      {
        title: '收到 共建者：刘先生 资助金额',
        money: '+1000',
        time: '2012-01-02 12:30',
        spreadFlag: false,
        progress: [
          // {
          //   time: '2019-01-03',
          //   mes: '学生：小明 已收到资助金额'
          // },
          // {
          //   time: '2019-01-03',
          //   mes: '志愿者已领取资助金额，正在送往途中'
          // },
          // {
          //   time: '2019-01-03',
          //   mes: '湖南壹点爱公益基金平台已到账'
          // }
        ]
      },
      {
        title: '收到 共建者：刘先生 资助金额',
        number: '+1000',
        time: '2012-01-02 12:30',
        spreadFlag: false,
        progress: [
          {
            time: '2019-01-03',
            mes: '学生：小明 已收到资助金额'
          },
          {
            time: '2019-01-03',
            mes: '志愿者已领取资助金额，正在送往途中'
          },
          {
            time: '2019-01-03',
            mes: '湖南壹点爱公益基金平台已到账'
          }
        ]
      },
      {
        title: '收到 共建者：刘先生 资助金额',
        number: '+1000',
        time: '2012-01-02 12:30',
        spreadFlag: false,
        progress: [
          {
            time: '2019-01-03',
            mes: '学生：小明 已收到资助金额'
          },
          {
            time: '2019-01-03',
            mes: '志愿者已领取资助金额，正在送往途中'
          },
          {
            time: '2019-01-03',
            mes: '湖南壹点爱公益基金平台已到账'
          }
        ]
      }
    ],
    totalArr: []
  },


  spread (e) { // 点击展开 账目
    // 关闭之前的
    // this.accounts.forEach(ele =>{
    //   ele.spreadFlag = false;
    // });
    let index = e.currentTarget.dataset.index;
    let code = e.currentTarget.dataset.code;
    let accounts = this.data.accounts;
    accounts[index].spreadFlag = !accounts[index].spreadFlag
    this.setData({
      accounts:accounts
    })
    this.getHistoryMes(index, code)
  },
  getHistory () { // 获取账目历史
    $ajaxList.getHistory({
      id: 1
    }).then(res => {
      // this.totalArr = this.accounts // 保存副本
      this.setData({
        totalArr:this.data.accounts
      })
      res.data.one.forEach((ele, index) => {
        ele.time = Time.getTime(ele.time);
        ele.title = ele.money >= 0 ? `收到 共建者${ele.code} 资助金额`: `资助学生${ele.code}`
      })
      this.setData({
        accounts:res.data.one
      })
      console.log(this.data.accounts)

    })
  },
  getHistoryMes (index, code) {
    //  获取 账目详情  根据 每条 不同的id 设置 payment  获取详情
    $ajaxList.getHistoryMes({
      payment: code
    }).then(res => { // 设置 accounts
      let progressArr = []
      res.data.one.forEach(ele => {
        progressArr.push({
          time: Time.getTime(ele.time),
          mes: ele.status
        })
      })
      // let totalArr = this.data.totalArr;
      // totalArr[index].progress  = progressArr

      // console.log( totalArr,this.data.totalArr)
      // this.setData({
      //   totalArr:totalArr// 把 详细记录 添加到总书记里
      // });
      // let accounts = this.data.accounts;
      // this.data.accounts[index] = this.data.totalArr[index]

      let account = this.data.accounts;
      account[index].progress = progressArr

      this.setData({
        accounts:account
      })
      // this.totalArr[index].progress = progressArr // 把 详细记录 添加到总书记里
      // this.accounts.splice(index, 1, this.totalArr[index])

      // this.setData({
      //   accounts:this.data.totalArr
      // })
    })
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHistory()
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
import http from './config'

export default {
  // 获取用戶賬號信息
  getUserAccount (params, config) {
    return http.promise_get('userAccount', params, config)
  },
  // 注册
  createAccountregister(params, config){
    return http.promise_post('createAccountregister', params, config)
  },
  // 填写 个人信息
  postVolunteerInfoMess (params, config) {
    return http.promise_post('postVolunteerInfoMess', params, config)
  },
  // 设置 账户信息
  postAccount (params, config) {
    return http.promise_post('postAccount', params, config)
  },
  // 管理员 更新修改 账户信息
  upDateAccount (params, config) {
    return http.promise_post('upDateAccount', params, config)
  },

  // 管理员 创建 收款账户
  createAccount (params, config) {
    return http.promise_post('createAccount', params, config)
  },

  // 更新个人 信息  或者 是 管理员 驳回 取消 通过 志愿者的资格
  upDataAccount (params, config) {
    return http.promise_post('upDataAccount', params, config)
  },
  // 获取志願者信息
  getVolunteerInfo (params, config) {
    return http.promise_get('volunteerInfo', params, config)
  },
  // 获取奖章信息
  getMedalInfo (params, config) {
    return http.promise_get('MedalInfo', params, config)
  },
  getHistory (params, config) {
    return http.promise_get('getHistory', params, config)
  },
  // 获取 户外活动信息
  getOutdoorMes (params, config) {
    return http.promise_get('getOutdoorMes', params, config)
  },
  // 获取回访记录
  getStuVisit (params, config) {
    return http.promise_get('getStuVisit', params, config)
  },
  // 获取感谢信
  getStuThank (params, config) {
    return http.promise_get('getStuThank', params, config)
  },
  //   上传感谢信
  postStuThank (params, config) {
    return http.promise_post('postStuThank', params, config)
  },
  //  获取回款记录
  getStuMoney (params, config) {
    return http.promise_get('getStuMoney', params, config)
  },
  //  确认  收款
  postMoneyRecord (params, config) {
    return http.promise_post('postMoneyRecord', params, config)
  },
  //  上传回访记录
  postVisitRecord (params, config) {
    return http.promise_post('postVisitRecord', params, config)
  },
  // 获得 管理员 志愿者 的列表
  getVolunteerList (params, config) {
    return http.promise_get('getVolunteerList', params, config)
  },
  //  获得所有共建者或志愿者
  getVolunteerOrGonjian (params, config) {
    return http.promise_get('getVolunteerOrGonjian', params, config)
  },
  //  发现列表 学生信息

  getFindMesByStates (params, config) {
    return http.promise_get('getFindMesByStates', params, config)
  },

  //  发现列表 学生信息
  getFindMes (params, config) {
    return http.promise_get('getFindMes', params, config)
  },

  //  上传学生资料
  postFindStudentMes (params, config) {
    return http.promise_post('postFindStudentMes', params, config)
  },
  //   上传家人资料
  postFindFamilyMes (params, config) {
    return http.promise_post('postFindFamilyMes', params, config)
  },

  //  根据学生的ID 查看基本信息
  getStuInfoById (params, config) {
    return http.promise_get('getStuInfoById', params, config)
  },
  // 获得 受资助 记录
  getMoneyHistory (params, config) {
    return http.promise_get('getMoneyHistory', params, config)
  },
  // 获取受资助历史
  postStopMoneyReason (params, config) {
    return http.promise_post('postStopMoneyReason', params, config)
  },
  // 获取学生家人信息
  getFamilyInfo (params, config) {
    return http.promise_get('getFamilyInfo', params, config)
  },
  // 上传 资助申请
  postTradeAsk (params, config) {
    return http.promise_post('postTradeAsk', params, config)
  },
  // 获取 资金报表
  getReportForms (params, config) {
    return http.promise_get('getReportForms', params, config)
  },
  // 获取轮播图 图片
  getHomePic (params, config) {
    return http.promise_get('getHomePic', params, config)
  },
  //  上传轮播图 图片
  postHomePic (params, config) {
    return http.promise_post('postHomePic', params, config)
  },
  // 获取 志愿者风采
  getVolunteerGraceful (params, config) {
    return http.promise_get('getVolunteerGraceful', params, config)
  },
  //  获取总共的统计
  getProvince (params, config) {
    return http.promise_get('getProvince', params, config)
  },
  //  获取总共的统计
  uploadFile (params, config) {
    return http.uploadFile('uploadUrl', params, config)
  },
  //   获取 我我调查的学生
  getMyinquire (params, config) {
    return http.promise_get('getMyinquire', params, config)
  },
  // 获取 我资助的学生
  getMyhelp (params, config) {
    return http.promise_get('getMyhelp', params, config)
  },
  // 停止资助
  stopHelp (params, config) { // 上 传 停止 资助原因
    return http.promise_post('stopHelp', params, config)
  },
  // 外出活动申请
  postOutAsk (params, config) {
    return http.promise_post('postOutAsk', params, config)
  },
  getTotalNum (params, config) {
    // 获取 我调查 或资学生的总数
    return http.promise_get('getTotalNum', params, config)
  },
  // 获取我调查的学生数量
  getTotalNumV(params, config){
    return http.promise_get('getTotalNumV', params, config)
  },

  // 获取头部信息
  getHeaderMes (params, config) {
    return http.promise_get('getHeaderMes', params, config)
  },
  // 获取受资助 历史 点开详细
  getHistoryMes (params, config) {
    return http.promise_get('getHistoryMes', params, config)
  },
  //   审核资助申请
  manageVolun (params, config) {
    return http.promise_post('getHistoryMes', params, config)
  },
  //   根据 审核状态 获取 共建者
  getGongjian (params, config) {
    return http.promise_get('getGongjian', params, config)
  },
  // 获取 管理者界面 各状态下 学生档案的学生列表
  getManStuArr (params, config) {
    return http.promise_get('getManStuArr', params, config)
  },
  //   管理员 获取 学生记录
  getStuVisiteBackM (params, config) {
    return http.promise_get('getStuVisiteBackM', params, config)
  },

  // 管理员 资金 审核管理
  getStuAidApply (params, config) {
    return http.promise_get('getStuAidApply', params, config)
  },
  // 管理员 外出管理
  getStuOutApply (params, config) {
    return http.promise_get('getStuOutApply', params, config)
  },

  // 获取 共建者 详细 信息
  volunteerInfo (params, config) {
    return http.promise_get('volunteerInfo', params, config)
  },

  // 获取 详细回访记录表
  getVisiteMesM (params, config) {
    return http.promise_get('getVisiteMesM', params, config)
  },

  //   审核 外出活动
  getOutDoorMesM (params, config) {
    return http.promise_get('getOutDoorMesM', params, config)
  },

  //  审核学生档案 通过接口
  PostStuPass (params, config) {
    return http.promise_post('PostStuPass', params, config)
  },

  //  管理 回访记录

  PostVisitePass (params, config) {
    return http.promise_post('PostVisitePass', params, config)
  },

  //   管理 资金资助申请
  PostMoneyPass (params, config) {
    return http.promise_post('PostMoneyPass', params, config)
  },

  //  管理 外出申请

  PostOutPass (params, config) {
    return http.promise_post('PostOutPass', params, config)
  },

  //   用户 根据自己 id 查看 通知

  getNotiById (params, config) {
    return http.promise_get('getNotiById', params, config)
  },

  //   管理员发布通知 接口
  postNotiMes (params, config) {
    return http.promise_post('postNotiMes', params, config)
  },

  //   管理员查看所有 的通知
  getAllnotiMes (params, config) {
    return http.promise_get('getAllnotiMes', params, config)
  },

  // 首页省统计
  getTotalprovince (params, config) {
    return http.promise_get('getTotalprovince', params, config)
  },

  loginFirst (params, config) {
    return http.promise_get('loginFirst', params, config)
  },
  // 更改 学生 的资料
  postUpdataStuMes (params, config) {
    return http.promise_post('postUpdataStuMes', params, config)
  },

  //   根据学生 id 获取 回访记录

  getOutMesByStuId (params, config) {
    return http.promise_get('getOutMesByStuId', params, config)
  },

  // 停止资助  改变 student_states2 变为 待资助
  postStudMoneyStop2 (params, config) {
    return http.promise_post('postStudMoneyStop2', params, config)
  },

  //  申请停止资助 更改 资助状态

  StopMoneyStatus (params, config) {
    return http.promise_post('StopMoneyStatus', params, config)
  },

  // 验证学生身份证 是否存在
  CheackIdCard(params, config){
    return http.promise_get('CheackIdCard', params, config)
  }

}

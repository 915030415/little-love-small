/*
 * 小程序配置文件
 */
let app = getApp();
import apiList from './apiList.js'

let config = {

  // 使用promise对象的post请求
  promise_post: function(url, data = {}, configs) {
    return new Promise((resolve, reject) => {
      config.httpRequest("POST", url, data, configs, (res) => resolve(res), (err) => reject(err));
    });
  },

  // 使用promise对象的get请求
  promise_get: function(url, data = {}, configs) {
    return new Promise((resolve, reject) => {
      config.httpRequest("GET", url, data, configs, (res) => resolve(res), (err) => reject(err));
    });
  },

  /**
   * 将函数转变为promise方法
   * @param fn
   * @returns {Function}
   */
  wxPromisify(fn) {
    return function(obj = {}) {
      return new Promise((resolve, reject) => {
        obj.success = function(res) {
          //成功
          resolve(res)
        };
        obj.fail = function(res) {
          //失败
          reject(res)
        };
        fn(obj)
      })
    }
  },
  /**
   * 判断是否需要刷新token
   */
  needRefreshToken: function() {
    try {
      var token = app.globalData.token;
      if (!token) return false;
      var payload = token.split(".")[1];
      var nowTime = Date.parse(new Date()) / 1000;
      if (nowTime > payload.rat && nowTime < payload.exp) return true;
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  // 发起网络请求，传method
  httpRequest: function(method, url, data, configs, success, fail) {
    let contentType = "application/json";
    if (configs && configs.contentType) {
      contentType = configs.contentType
    }
    // 在当前页面显示导航条加载动画。
    wx.showNavigationBarLoading();
    wx.showLoading({
      mask:true,
      title:'加载中'
    });

      let gateway = 'http://47.96.235.102:7070' + apiList[url];
      let token = '';
      let header = {
        // 跨域请求 这个配置不能少
        "Content-Type": contentType,
        'Accept': 'application/json'
      };
      let value = wx.getStorageSync('token')
      if(value){
        // token = wx.getStorageSync('token')
        header = {
          ...header,
          'token':value
        }
      }
    // let atr = apiArr[0].split('.')[0];
    // let gateway = (apiList.hostObj[atr] || apiList.hostObj.host) + '/gateway'
    wx.request({
      url: gateway,
      data: data,
      dataType: 'json',
      method: method,
      header:header,
      success: function(res) {
        success(res.data);
        // if (res.data.success) {
        //
        // } else {
        //   setTimeout(function() {
        //     wx.showToast({
        //       title: res.data.msg ? res.data.msg : '网络错误',
        //       icon: 'none'
        //     })
        //   }, 100)
        // }
      },
      fail: function(msg) {
        fail(msg);
        config.wxPromisify(wx.getNetworkType)().then(res => {
            if (res.networkType == 'none') {
              wx.showToast({
                title: '网络连接失败，请检查网络是否断开！',
                icon: 'none',
                duration: 2000
              });
            } else {
              if (msg.errMsg === 'request:fail timeout' || msg.errMsg === 'request:fail 请求超时。') {
                setTimeout(function() {
                  wx.showToast({
                    title: '网络超时',
                    icon: 'none',
                    mask: true,
                    duration: 3000
                  })
                }, 100)
              } else {
                if (fail) {
                  // fail(msg);
                } else {
                  setTimeout(function() {
                    wx.showToast({
                      title: '网络错误',
                      icon: 'none'
                    })
                  }, 100)
                }
              }
            }
          }).catch(err => {
            wx.showToast({
              title: '网络错误',
              icon: 'none',
              duration: 2000
            });
            console.log(err);
          })
          .finally(() => {});
      },
      complete: function() {
        wx.hideNavigationBarLoading();
        wx.hideLoading();
      }
    })
  }
};

module.exports = config;
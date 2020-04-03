//index.js
const app = getApp();
var api = require('../../config/api.js');
var util = require('../utils/util.js');

Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: false
  },

  onLoad: function () {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
             // if (res.authSetting['scope.userInfo']) {
                wx.getUserInfo({
                  success: function (res) {
                    //从数据库获取用户信息
                    //that.queryUsreInfo();
                    //用户已经授权过
                    wx.redirectTo({
                      url: '/pages/share/share',
                      fail(ex) {
                        console.log(ex)//fail can not redirectTo a tabbar page"
                        wx.switchTab({
                          url: '/pages/share/share',
                        })
                      }
                    })
                  }
                });
             // }
            }
          });
        } else {
          // 用户没有授权
          // 改变 isHide 的值，显示授权页面
          that.setData({
            isHide: true
          });
        }
      }
    });
  },

  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      // 获取到用户的信息了，打印到控制台上看下
      console.log("用户的信息如下：");
      console.log(e.detail.userInfo);
      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      that.setData({
        isHide: false
      });
      wx.redirectTo({
        url: '/pages/share/share',
        fail(ex) {
          console.log(ex)//fail can not redirectTo a tabbar page"
          wx.switchTab({
            url: '/pages/share/share',
          })
        }
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
  },

  //保存用户信息
  insertUserInfo: function (res) {
    console.log(8888);
    var data = {
      openid: app.globalData.openid,
      nickName: res.detail.userInfo.nickName,
      avatarUrl: res.detail.userInfo.avatarUrl,
      province: res.detail.userInfo.province,
      city: res.detail.userInfo.city
    };
    util.request(api.UserAdd, data, 'POST').then(function (res) {
      if (res.code === 0) {
        console.log("小程序登录用户信息成功！");

        //授权成功后，跳转进入小程序首页(正式环境应该在这里)
        wx.switchTab({
          url: '/pages/share/share'
        })
      } else {
        that.insertUserInfo(data);
      }
    });
    //授权成功后，跳转进入小程序首页(展示效果用)
    wx.redirectTo({
      url: '/pages/share/share'
    })
  },
  //获取用户信息接口
  queryUsreInfo: function () {
    console.log(9999);
    util.request(api.AuthUserInfo, { openid: app.globalData.openid }).then(function (res) {
      if (res.code === 0) {
        app.globalData.userInfo = res.data;
      }
    })
  },



})

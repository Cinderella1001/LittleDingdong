//app.js


App({
   globalData: {
  
  },
  onLaunch: function () {
    /*微信云初始化 */
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'dev-qt1a0',
        traceUser: true,
      })
    }
    /*知晓云 */
    wx.BaaS = requirePlugin('sdkPlugin')
    //让插件帮助完成登录、支付等功能
    wx.BaaS.wxExtend(wx.login,
      wx.getUserInfo,
      wx.requestPayment)
    wx.BaaS.init('314b62ebe7658af1a050')
    wx.BaaS.auth.loginWithWechat() // 静默登录

  }
})

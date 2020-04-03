Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 'word',
    select: false,
    number: 30,
    openid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type: options.name
    });
    let page=this;
    wx.cloud.callFunction({
        name:'getOpenid',
        complete:res=>{
          page.setData({
            openid:res.result.openid
          })
        }
      })
  },
  bindShowMsg() {
    this.setData({
      select: !this.data.select
    })
  },
  mySelect(e) {
    var name = e.currentTarget.dataset.name
    this.setData({
      number: name,
      select: false
    })
  },
  Reciting(){
   wx.navigateTo({
     url: '../reciting/reciting?type=' + this.data.type + '&openid=' + this.data.openid + '&number=' + this.data.number ,
   })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})

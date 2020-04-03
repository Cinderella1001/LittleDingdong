
const db = wx.cloud.database().collection('userInfo');
Page({
  data: {
    PageCur: 'recite',
    openid: ''
  },
  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
  },
  onLoad: function (options) {
    let page = this;
   /*获取openid */
    wx.cloud.callFunction({
      name: 'getOpenid',
      complete: res => {
        page.setData({
         openid: res.result.openid
        })
       
        // 实例化查询对象
        let query = new wx.BaaS.Query()
        // 设置查询条件（比较、字符串包含、组合等）
        query.contains('openid', page.data.openid)
        // 应用查询对象
        let Product = new wx.BaaS.TableObject('userInfo')
        Product.setQuery(query).find().then(res => {
          // success
        if(res.data.length==0)
        {
          let product = Product.create()
          product.set('openid', page.data.openid)
          product.set('drop', 0)
          product.save().then(res => {
            // success
            
          }, err => {
            // Error 对象
          })
        }
        }, err => {
          // err
        })
      }
    });
   
  
  }
})


Page({

  /**
   * 页面的初始数据
   */
  data: {
   openid:'',
   type:'',
   number:30,
   wordnumber:100,
   pagenumber:0,
   currentOrder:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取从前一个页面传来的用户的openid、背诵的单词表、要背诵的单词数
    this.setData({
      openid:options.openid,
      type: options.type,
      number:options.number
    });
   

    var openid = this.data.openid;
    var type = this.data.type;
   
    var that=this;
  
    let query = new wx.BaaS.Query()
    query.contains('type',type)
    let Product = new wx.BaaS.TableObject('word_number')
    Product.setQuery(query).find().then(res => {
      /*根据单词表上的单词数计算数据表的页数 */
      var zheng=0;
      var yu = res.data.objects[0].count;
      while(yu>=125)
      {
          yu=yu-125;
           zheng++;
      }
      if (yu== 0) {
        that.setData({
          wordnumber: res.data.objects[0].count,
          pagenumber: zheng
        })
      }
      else {
        that.setData({
          wordnumber: res.data.objects[0].count,
          pagenumber: zheng+ 1
        })
      }
      /*数据表名称kanyan_zhengfa_command_1,记录每个用户对单词的掌握程度，每张表上有125个单词， 第一次背诵将用户添加到表*/
      var i;
      for (i = 1; i <= that.data.pagenumber; i++) {
        let quer = new wx.BaaS.Query()
        // 设置查询条件（比较、字符串包含、组合等）
        quer.contains('openid', openid)
        // 应用查询对象
        let P = new wx.BaaS.TableObject(type + '_command_' + i)
        P.setQuery(quer).find().then(res => {
          // success
        
          if (res.data.objects.length == 0) {
            let p = P.create()
            p.set('openid', openid)
            p.save().then(res => {
              // success
            }, err => {
              // Error 对象
            })
          }
        })
          , err => ({
            // err
          })
      }
      /*查看用户目前背诵到的位置*/
        let qu = new wx.BaaS.Query()
        // 设置查询条件（比较、字符串包含、组合等）
        qu.contains('openid', openid)
        // 应用查询对象
        let Q = new wx.BaaS.TableObject(type + '_command_1')
        Q.setQuery(qu).find().then(res => {
          // success
          that.setData({
            currentOrder: res.data.objects[0].order,
          })
        })
          , err => ({
            // err
          })
        /*根据用户选取本次背诵的单词数量，按照1：1的比例（熟悉单词：未背诵单词）向用户推荐单词*/
       if(that.data.wordnumber-that.data.currentOrder>=number*0.5)
       {
            
            that.data.currentOrder+number*0.5;
       }
       else if (that.data.wordnumber - that.data.currentOrder < number * 0.5 && that.data.wordnumber - that.data.currentOrder>0)
       {

       }
       else if (that.data.wordnumbe - that.data.currentOrder==0)
       {

       }
    })

      , err => ({
        // err
      })
      
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
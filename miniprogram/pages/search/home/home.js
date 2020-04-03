// pages/search/home/home.js

  Page({
    data: {
      voteTitle:null,
      flag:false,
      detail:false,
      

      cardCur: 0,
      swiperList: [{
        id: 0,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    }, {
          id: 1,
          type: 'image',
          url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
        }, {
          id: 2,
          type: 'image',
          url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    }, {
          id: 3,
          type: 'image',
          url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
    }, {
          id: 4,
          type: 'image',
          url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
    }, {
          id: 5,
          type: 'image',
          url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
    }, {
          id: 6,
          type: 'image',
          url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
    }],
    
    },
    /**
  * 生命周期函数--监听页面加载
  */
    onLoad: function (options) {

    },

    inputWord: function (e) {
      //数据绑定
      this.setData({ 
        flag: true, 
        inputWord: e.detail.value })
    },
    onClick() {
      var that = this
      wx.request({
        url: 'https://api.shanbay.com/bdc/search/?word=' + this.data.inputWord,
        data: {},
        method: 'GET',
        success: function (res) {
          console.log(res)
          that.setData({
            word: res.data.data.content,
            audio: res.data.data.pronunciation,
            definition: res.data.data.definition,
            pron_audio: res.data.data.audio
          })
          that.get_sams(res.data.data.conent_id)
        },
        fail: function () {
        },
        complete: function () {
        }
      })

      this.setData({
        detail: true,
        flag: false
      })
    },

    read() {
      const innerAudioContext = wx.createInnerAudioContext()
      innerAudioContext.autoplay = true
      innerAudioContext.src = this.data.pron_audio
      innerAudioContext.onPlay(() => {
      })
      innerAudioContext.onError((res) => {
        console.log(res.errMsg)
        console.log(res.errCode)
      })
    },

    get_sams(id) {
      var that = this
      wx.request({
        url: 'https://api.shanbay.com/bdc/example/?vocabulary_id=' + id,
        data: {},
        method: 'GET',
        success: function (res) {
          console.log(res)
          that.setData({
            defen: [res.data.data[0], res.data.data[4]]
          })
        },
        fail: function () {
        },
        complete: function () {
        }
      })
    },


    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },



    onLoad() {
    this.towerSwiper('swiperList');
    // 初始化towerSwiper 传已有的数组名即可
  },
  DotStyle(e) {
    this.setData({
      DotStyle: e.detail.value
    })
  },
  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  // towerSwiper
  // 初始化towerSwiper
  towerSwiper(name) {
    let list = this.data[name];
    for(let i = 0; i<list.length; i++) {
  list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
  list[i].mLeft = i - parseInt(list.length / 2)
}
this.setData({
  swiperList: list
})
  },
// towerSwiper触摸开始
towerStart(e) {
  this.setData({
    towerStart: e.touches[0].pageX
  })
},
// towerSwiper计算方向
towerMove(e) {
  this.setData({
    direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
  })
},
// towerSwiper计算滚动
towerEnd(e) {
  let direction = this.data.direction;
  let list = this.data.swiperList;
  if (direction == 'right') {
    let mLeft = list[0].mLeft;
    let zIndex = list[0].zIndex;
    for (let i = 1; i < list.length; i++) {
      list[i - 1].mLeft = list[i].mLeft
      list[i - 1].zIndex = list[i].zIndex
    }
    list[list.length - 1].mLeft = mLeft;
    list[list.length - 1].zIndex = zIndex;
    this.setData({
      swiperList: list
    })
  } else {
    let mLeft = list[list.length - 1].mLeft;
    let zIndex = list[list.length - 1].zIndex;
    for (let i = list.length - 1; i > 0; i--) {
      list[i].mLeft = list[i - 1].mLeft
      list[i].zIndex = list[i - 1].zIndex
    }
    list[0].mLeft = mLeft;
    list[0].zIndex = zIndex;
    this.setData({
      swiperList: list
    })
  }
}
})
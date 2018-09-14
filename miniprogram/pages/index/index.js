//index.js
const app = getApp()

Page({
  data: {
    current:"homepage",
    scrollViewHeight:0
  },
  onLoad(){
    var self = this;
    wx.getSystemInfo({
      success (res) {
        self.setData({
          scrollViewHeight: `${res.windowHeight-50}px`
        })
      }
    })

  },
  handleChange(data){
    this.setData({
      current: data.detail
    })
  }

})

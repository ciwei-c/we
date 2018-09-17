//index.js
const app = getApp()

Page({
  data: {
    current:"homepage",
    scrollViewHeight:0
  },
  onLoad(){
    wx.getSystemInfo({
      success: res => {
        this.setData({
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

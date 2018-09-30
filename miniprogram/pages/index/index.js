const db = wx.cloud.database()
Page({
  data: {
    userInfo: {},
    isShowDrawer: false
  },
  onLoad(){
    const _userInfo = getApp().globalData.userInfo
    if (_userInfo) {
      this.setUserInfo(_userInfo)
    } else {
      wx.getUserInfo({
        success: ret => {
          getApp().globalData.userInfo = ret.userInfo
          this.setUserInfo(ret.userInfo)
        }
      })
    }
  },
  setUserInfo(info) {
    this.setData({
      userInfo: info
    })
  },
  onClickTravel() {
    wx.navigateTo({ url: '/pages/travel/travel' })
  },
  onShowDrawer(show) {
    this.setData({
      isShowDrawer: show
    })
  },
  onClickSetup() {
    wx.navigateTo({ url: '/pages/setup/setup' })
  },
  onClickMine() {
    this.onShowDrawer(true)
  },
  onToggleDrawer(data) {
    this.onShowDrawer(!this.data.isShowDrawer)
  }
})

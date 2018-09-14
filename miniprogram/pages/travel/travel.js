const db = wx.cloud.database()
const $Toast = getApp().globalData.$toast
Page({
  data: {
    isConfirmShow: false,
    travelData:[],
    customItem:"全部",
    isLoading:false
  },
  onLoad(){
    this.loading(true)
  },
  onShow() {
    this.getTravelData()
  },
  loading(isLoading){
    this.setData({
      isLoading: isLoading
    })
  },
  getTravelData(){
    db.collection('travel').get().then(res => {
      this.setData({
        travelData: res.data
      })
      this.loading(false)
    })
  },
  bindRegionChange(data){
    let detail = data.detail
    if(this.data.travelData.findIndex(item => item.city === detail.value[1])>=0){
      return $Toast({
        content: '已添加过的城市',
        type: 'warning'
      })
    }
    this.loading(true)
    let setData = {
      code: detail.code,
      postcode: detail.postcode,
      value: detail.value,
      city: detail.value[1]
    }
    db.collection('travel').add({
      data: {
        travelData: setData
      }
    }).then(res => {
      this.getTravelData()
    })
  }
})
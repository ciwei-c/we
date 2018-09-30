const db = wx.cloud.database()
Page({
  data: {
    healthData: [],
    isConfirmShow: false,
    isLoading:false
  },
  onLoad: function (options) {
    this.loading(true)
  },
  onShow() {
    this.getHealthData()
  },
  loading(isLoading) {
    this.setData({
      isLoading: isLoading
    })
  },
  getHealthData() {
    db.collection('health').get().then(res => {
      this.setData({
        healthData: res.data
      })
      this.loading(false)
    })
  },
  onAdd(){
    this.setData({
      isConfirmShow:true
    })
  },
  onConfirm(data){
    console.log(data)
  }
})
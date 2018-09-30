Page({
  data: {
    travelData: {}
  },
  onLoad: function(options) {
    var options = JSON.parse(options.travelData)
    this.setData({
      travelData: options.travelData,
      _id: options._id,
      _openid: options._openid
    })
    this.setData({
      "markers.accommodation": this.getMarkers(options.travelData.accommodation)
    })
  },
  getMarkers(item){
    return [{
      latitude: item.latitude,
      longitude: item.longitude,
      iconPath: "/images/location.png",
      width: 32,
      height: 32
    }]
  },
  onTapMap(data){
    var location = data.target.dataset.location
    const latitude = location.latitude
    const longitude = location.longitude
    wx.openLocation({
      latitude,
      longitude
    })
    console.log(location)
  }
})
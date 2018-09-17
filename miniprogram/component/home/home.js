const db = wx.cloud.database()
Component({
  properties: {
    
  },
  data: {
    travelData:[]
  },
  attached() {
    db.collection('travel').get().then(res => {
      let _travelData = res.data
      _travelData.sort((a, b) => {
        let t1 = this.getTime(a.travelData.startDate)
        let t2 = this.getTime(b.travelData.startDate)
        return t2-t1
      })
      let nowDate = this.getNowDate()
      _travelData.map(item=>{
        let t = this.getTime(item.travelData.startDate)
        let disTime = t - nowDate.time
        item.travelData.days = disTime / (24 * 60 * 60 * 1000)
        return item
      })
      console.log(_travelData)
      this.setData({
        travelData: _travelData
      })
    })
  },
  methods: {
    getTime(time){
      return new Date(time).getTime()
    },
    getNowDate() {
      let date = new Date()
      let y = date.getFullYear()
      let m = date.getMonth() + 1
      m = m > 10 ? m : "0" + m
      let d = date.getDate()
      d = d > 10 ? d : "0" + d
      return {
        date: `${y}-${m}-${d}`,
        time: new Date(`${y}-${m}-${d}`).getTime()
      }
    }
  }
})

const db = wx.cloud.database()
const $Toast = getApp().globalData.$toast
let getDbByTravelId = null
Page({
  data: {
    current:"",
    _id:"",
    isModalShow:false,
    travelData:{},
    actions: [
      {
        name: '取消'
      },
      {
        name: '删除',
        color: '#ed3f14',
        loading: false
      }
    ]
  },
  onLoad: function (options) {
    this.setData({
      _id:options._id
    })
    getDbByTravelId = db.collection("travel").doc(this.data._id)
    this.getTravelData()
  },
  getTravelData(){
    getDbByTravelId.get().then(res=>{
      this.setData({
        travelData:res.data.travelData
      })
    })
  },
  onChooseStartDate(data) {
    let _endDate = this.data.travelData.endDate
    if(_endDate){
      _endDate = _endDate.split("-").join("")
      let _startDate = data.detail.value.split("-").join("")
      if (_endDate < _startDate){
        return $Toast({
          content: '出行日期不能大于返程',
          type: 'warning'
        }) 
      }
    }
    this.setData({
      'travelData.startDate': data.detail.value
    })
  },
  onChooseEndDate(data) {
    let _startDate = this.data.travelData.startDate
    if (_startDate) {
      _startDate = _startDate.split("-").join("")
      let _endDate = data.detail.value.split("-").join("")
      if (Number(_endDate) < Number(_startDate)) {
        return $Toast({
          content: '返程日期不能小于出行日期',
          type: 'warning'
        })
      }
    }
    this.setData({
      'travelData.endDate': data.detail.value
    })
  },
  onClickBtn(data){
    if(data.detail.key == "right"){
      this.onSave()
    }else{
      this.setData({
        isModalShow: true
      })
    }
  },
  onSave(){
    getDbByTravelId.update({
      data:{
        travelData:this.data.travelData
      }
    }).then(res=>console.log(res))
  },
  onDel(){
    const action = [...this.data.actions]
    action[1].loading = true;

    this.setData({
      actions: action
    });

    getDbByTravelId.remove().then(res => {
      wx.navigateBack()
    })
  },
  onClickModal({ detail }){
    if (detail.index === 0) {
      this.setData({
        isModalShow: false
      });
    } else {
      this.onDel()
    }
  }
})
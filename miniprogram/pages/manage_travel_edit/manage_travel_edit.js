const db = wx.cloud.database()
const $Toast = getApp().globalData.$toast
let getDbByTravelId = null
Page({
  data: {
    current:"",
    _id:"",
    scrollViewHeight:0,
    isLoading:false,
    isModalShow: false,
    swipeAction1: [{
      name: '修改',
      color: '#fff',
      fontsize: '20',
      width: 100,
      background: '#F48438'
    },{
        name: '删除',
        color: '#fff',
        fontsize: '20',
        width: 100,
        background: '#ed3f14'
      }],
    swipeAction2: [{
      name: '删除',
      color: '#fff',
      fontsize: '20',
      width: 100,
      background: '#ed3f14'
    }],
    travelData:{},
    travelWays:["飞机","动车","火车","大巴"],
    customItem:"全部",
    actions: [{
        name: '取消'
      },{
        name: '删除',
        color: '#ed3f14',
        loading: false
    }]
  },
  loading(isLoading) {
    this.setData({
      isLoading: isLoading
    })
  },
  onLoad: function (options) {
    this.loading(true)
    wx.getSystemInfo({
      success: res => {
        this.setData({
          scrollViewHeight: `${res.windowHeight - 50}px`
        })
      }
    })
    this.setData({
      _id:options._id
    })
    getDbByTravelId = db.collection("travel").doc(this.data._id)
    this.getTravelData()
  },
  getTravelData(){
    getDbByTravelId.get().then(res=>{
      let _travelData = res.data.travelData
      if (_travelData && !_travelData.touristList){
        _travelData.touristList = []
      }
      this.setData({
        travelData:_travelData
      })
      this.loading(false)
    })
  },
  onAddLocation(data,id){
    let _id = id || data.target.id
    wx.chooseLocation({
      type:"gcj02",
      success:res =>{
        if(!res.address || !res.name){
          $Toast({
            content:"未选中地址，请选择详细地址",
            type:"warning"
          })
        }else{
          if (_id === "touristList") {
            let _touristList = this.data.travelData.touristList
            _touristList.push(res)
            this.setData({
              "travelData.touristList": _touristList
            })
          }else{
            this.setData({
              "travelData.accommodation": res
            })
          }
        }
      }
    })
  },
  onClickAction1(data) {
    if(data.detail.index == 0){
      this.onAddLocation(null, "accommodation")
    } else {
      this.setData({
        "travelData.accommodation": null
      })
    }
  },
  onClickAction2(data) {
    let _touristList = this.data.travelData.touristList
    _touristList.splice(data.target.dataset.index, 1)
    this.setData({
      "travelData.touristList": _touristList
    })
  },
  onChooseTravelWay(data){
    this.setData({
      'travelData.travelWay': this.data.travelWays[Number(data.detail.value)]
    })
  },
  onChooseFromCity(data){
    let value = data.detail.value[1]
    if(value === "全部"){
      return $Toast({
        content:"请选择省市",
        type:"warning"
      })
    }
    this.setData({
      'travelData.fromCity': value
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
    this.loading(true)
    getDbByTravelId.update({
      data:{
        travelData:this.data.travelData
      }
    }).then(res => {
      $Toast({
        content: '保存成功',
        type: 'success'
      })
      this.loading(false)
    })
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
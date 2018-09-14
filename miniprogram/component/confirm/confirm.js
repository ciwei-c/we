const { $Toast } = require('../../iview/base/index');

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show:{
      type:Boolean,
      value:false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    inputValue:"上海"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCancel(){
      this.setData({
        show:false
      })
    },
    onInput(e){
      this.setData({
        inputValue: e.detail.detail.value
      })
    },
    onConfirm(){
      if (this.data.inputValue) {
        this.triggerEvent('confirm', this.data.inputValue);
        this.onCancel();
      }else{
        $Toast({
          content: '地名不能为空',
          type: 'warning'
        });
      }
    }
  }
})

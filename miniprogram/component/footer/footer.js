// component/footer/footer.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    current:{
        type: String,
        value: 'homepage'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleChange(data){
      this.triggerEvent('change', data.detail.key);
    }
  }
})

Component({
  properties: {
    placeholder: {
      type: String,
      value: ""
    },
    visible: {
      type: Boolean,
      value: true
    },
    value:{
      type:String,
      value:''
    }
  },
  data: {
    _value: ""
  }, 
  methods: {
    confirm() {
      console.log('传入', this.data._value)
      this.triggerEvent('confirm', this.data._value)
      this.data._value = ''
    },
    cancel() {
      console.log('传入', this.data._value)
      this.triggerEvent('cancel', this.data._value)
      this.data._value = ''
    },
    watchValue(event) {
      this.data._value = event.detail.value  
      
    }
  }
})

// pages/tomoto/tomoto.js
const {http} =require('../../lib/http.js')
Page({
  timer:'',
  data: {
    defalutSecond: 10,
    time: '',
    timerStatus: 'stop',
    finishConfirmVisible: false,
    againButtonVisible: false,
    confirmVisible: false,
    tomato: {}
  },
  onShow(){
    this.startTimer()
    http.post('/tomatoes').then(response => {
      console.log(response)
      this.tomato = response.data.resource
    })
  },
  startTimer() {
    this.setData({ timerStatus: 'stop' })
    this.changeTime()
    this.timer = setInterval(() => {
      this.data.defalutSecond = this.data.defalutSecond - 1
      this.changeTime()
      if (this.data.defalutSecond <= 0) {
        this.setData({ againButtonVisible: true })
        this.setData({ finishConfirmVisible: true })
        return this.clearTimer()
      }
    }, 1000)
  },
  clearTimer(){
    clearInterval(this.timer)
    this.timer = null
    this.setData({ timerStatus : 'start'})
  },
  showConfirm(){//放弃时弹出
    this.setData({confirmVisible : true})
    this.clearTimer()
  },
  confirmFinish(event){
    let content = event.detail
    this.setData({ finishConfirmVisible :false})
    //将完成的任务传到后端，修改对应id的description
    http.put(`/tomatoes/${this.tomato.id}`, {
      description: content,
      aborted: false
    })
      .then(response => {
        console.log(response)
        wx.navigateBack({ to: -1 })
      })
   
  }, 
  confirmCancel() {
    this.setData({ finishConfirmVisible: false })
  },
  confirmAbandon(event){
    console.log(event)
    this.setData({ confirmVisible: false })
    this.setData({time: '00 : 00'})
    this.setData({ againButtonVisible  : true})
    let content = event.detail
    
   
  },
  hideAbandon() {
    this.setData({ confirmVisible: false })
    this.startTimer()
  },
  againTimer(){
    this.defalutSecond = 1500
    this.setData({defalutSecond: this.defalutSecond})
    this.startTimer()
    this.setData({ againButtonVisible : false})
  },
  changeTime(){
    let m = Math.floor(this.data.defalutSecond/60)
    let s =Math.floor(this.data.defalutSecond%60)
    if(s === 0){
      s = '00'
    }
    if((s + '').length === 1){
      s = '0' + s
    }
    if((m + '').length === 1 ){
      m = '0' +m
    }
    this.setData({time  : `${m} : ${s}`})
  }
})
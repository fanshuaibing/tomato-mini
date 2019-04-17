// pages/me/me.js
const { http } = require('../../lib/http.js');

Page({
  data: {
    tab:'0',
    tomatoes: {},
    todos: {},
  },
  onShow: function () {
    this.fetchTomatoes()
    this.fetchTodos()
  },
  fetchTomatoes() { //完成的任务
    http.get('/tomatoes', { is_group: "yes" })
      .then(response => {
        this.setData({ tomatoes: response.data.resources })
      })
  },
  fetchTodos() {//番茄历史 
    http.get('/todos',{
      is_group: 'yes'
    })
      .then(response => {
        this.setData({ todos: response.data.resources })
      })
  },
  swiperChange(event){
    this.setData({tab : event.detail.current })

  },
  changeTomato(event) {
    let name = event.currentTarget.dataset.name
    this.setData({ tab: '0'})
    
  },
  changeTask(event){
    let name = event.currentTarget.dataset.name
    this.setData({ tab: '1'})
  }

})
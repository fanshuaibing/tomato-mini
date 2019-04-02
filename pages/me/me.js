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
  fetchTomatoes() {
    http.get('/tomatoes', { is_group: "yes" })
      .then(response => {
        this.setData({ tomatoes: response.data.resources })
      })
  },
  fetchTodos() {
    http.get('/todos',{
      is_group: 'yes'
    })
      .then(response => {
        console.log(response)
        this.setData({ todos: response.data.resources })
      })
  },
  swiperChange(event){
    console.log(event)
    this.setData({tab : event.detail.current })

  },
  changeTomato(event) {
    console.log(event)
    let name = event.currentTarget.dataset.name
    this.setData({ tab: '0'})
    
  },
  changeTask(event){
    console.log(event)
    let name = event.currentTarget.dataset.name
    this.setData({ tab: '1'})
  }

})
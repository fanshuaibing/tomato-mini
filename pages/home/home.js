// pages/home/home.js
const {http} = require('../../lib/http.js')
Page({
  updateId: '',
  description:'',
  data: {
    lists: [] ,
    visibleConfirm: false,
    newTodos:'',
    visibleUpdate: false,
    aftercompleted: false,
    selectCompleted:'',
    selectTab: '',
  },
  onShow(){
    this.getLists()
    if(!this.data.lists.length){
      this.setData({selectTab: ''})
    }
    
  },
  getLists(){//初始化
    http.get('/todos?completed = false').then(res => {
      if (res.data.resources) {
        this.data.lists = res.data.resources
        this.setData({ lists: this.data.lists })
        this.hideConfirm()
      }
    })
  },//确认创建
  confirmCreate(event){
    let content = event.detail
    if(content){
      http.post('/todos',{
          completed: false, description: content 
      }).then( res => {
          let todo = [res.data.resource]
          this.data.lists = todo.concat(this.data.lists)
          this.setData({ lists: this.data.lists })
          this.hideConfirm()
      })
    }
  
  }, 
  updateTodos(event){//更新
    let { id, index } = event.currentTarget.dataset
    this.updateId =id
    let description = this.data.lists[index].description
    this.setData({ newTodos: description,visibleUpdate : true})
  },
  confirmUpdate(event) {//确认更新
    let description = event.detail
    if (description){
     let description = event.detail
     http.put(`/todos/${this.updateId}`, {
      description: description
     }).then(res => {
       this.getLists()
       this.hideUpdate()
       wx.showToast({
         title: '修改成功',
         icon: 'success',
         duration: 1000
       })
     })
   }
  this.hideUpdate()
   
  },
  hideUpdate(){
    this.setData({ visibleUpdate : false})
  },
  destroyTodo(event){//删除
    let id = event.currentTarget.dataset.id
    let index = event.currentTarget.dataset.index
    this.setData({ selectTab : index})
    setTimeout(()=>{
      http.put(`/todos/${id}`, {
        completed: true
      }).then(res => {
        let todo = res.data.resource
        this.data.lists[index] = todo
        this.setData({ lists: this.data.lists })
        this.setData({selectTab : ''})
        wx.showToast({
          title: '确认完成',
          icon: 'success',
          duration: 1000
        })
      })
    },1000)
    
    
    
  },
  showConfirm(){ //显示创建confirm
    this.setData({ visibleConfirm : true})
  },
  cancelCreate(){//取消创建
    this.hideConfirm()
  },
  hideConfirm() {
    this.setData({ visibleConfirm: false })
  }

})
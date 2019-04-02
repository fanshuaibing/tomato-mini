Page({
  data: {
    poster: 'https://upload-images.jianshu.io/upload_images/1450255-0967e6b0de0796f5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240',
    name: '清白之年',
    author: '朴树',
    src: 'https://6d6f-momo-891ab6-1258735301.tcb.qcloud.la/清白之年.mp3?     sign=d3233a4177852273d6353ee9b03975ef&t=1554187195',

  },
  onReady: function (e) {

    // 使用 wx.createAudioContext 获取 audio 上下文 context

    let innerAudioContext = wx.createAudioContext('myAudio')
    innerAudioContext.autoplay = true
    innerAudioContext.play()
  }




})
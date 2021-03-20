// pages/history/history.js
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    votes: [{
      createdAt: util.formatTime(new Date()),
      title: '是否同意该队伍执行任务',
      createdUser: '1',
      process: [{
        value: '同意',
        users: ['1', '2', '3'].join(',')
      }, {
        value: '反对',
        users: ['4', '5', '6'].join(',')
      }],
      result: '同意',
      subVote: {
        title: '执行任务',
        createdAt: util.formatTime(new Date()),
        process: [{
          value: '成功',
          count: 2
        }, {
          value: '失败',
          count: 1
        }],
        result: '成功'
      }
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
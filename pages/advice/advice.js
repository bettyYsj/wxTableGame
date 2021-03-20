// pages/advice/advice.js
import { wxRequest } from '../../utils/util';
import { config } from '../../config/index';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    email: '',
    content: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  submit(e) {
    console.log(e);
    const data = e.detail.value;
    wxRequest({
      url: config.url + '/advice',
      data: data,
      method: 'POST',
      success(res) {
        if (res && res.data) {
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            complete() {
              new Promise((resolve) => setTimeout(resolve, 1000))
              .then(() => {
                wx.navigateTo({
                  url: '/pages/index/index'
                });
              });
            }
          });
        }
      }
    });
  }
})
// pages/index/index.js
import { wxLogin } from '../../utils/util';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
    games: [{
      name: '谁是卧底',
      value: 'wodi'
    }, {
      name: '阿瓦隆',
      value: 'Avalon'
    }, {
      name: '狼人杀(未完成)',
      value: 'langrensha'
    }, {
      name: '你画我猜(未完成)',
      value: 'nihuawocai'
    }, {
      name: '不要做挑战(未完成)',
      value: 'buyaozuo'
    }, {
      name: 'UNO(未完成)',
      value: 'uno'
    }, {
      name: '斗地主(未完成)',
      value: 'doudizhu'
    }]
  },
  async onLoad() {
    await this.checkLogin();
  },
  async checkLogin(callback) {
    await wxLogin(res => {
      if (!res.successful) {
        wx.showToast({
          title: '登录失败，尝试提交反馈吧ଘ(੭ˊᵕˋ)੭',
          icon: 'none',
          mask: true
        });
      }
      this.setData({
        isLogin: res.successful
      });
    });
  },

  async goGame(e) {
    console.log(e);
    if (this.data.isLogin) {
      const value = e.currentTarget.dataset.value;
      console.log(value);
      wx.navigateTo({
        url: '/pages/hall/hall?game='+value
      });
    }
  },

  goAdvice() {
    wx.navigateTo({
      url: '/pages/advice/advice'
    });
  }
});
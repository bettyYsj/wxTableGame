// pages/hall/hall.js
import { wxRequest, wxLogin } from '../../utils/util';
import { config } from '../../config/index';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    configuration: {
      wodi: {
        value: [],
        range: [],
        vIndex: [],
        total: 5,
        names: ['平民', '卧底', '白板'],
        content: [{
          name: '平民',
          min: 1,
          max: 10
        }, {
          name: '卧底',
          min: 0,
          max: 5
        }, {
          name: '白板',
          min: 0,
          max: 5
        }]
      },
      Avalon: {
        checkIndex: 0,
        total: 5,
        contentName: [['5人局-莫甘娜', '5人局-爪牙', '6人局', '7人局', '8人局-无湖仙', '8人局-有湖仙', '9人局', '10人局']],
        content: [{
          name: '5-莫甘娜',
          hasLady: false,
          content: {
            red: [{
              name: '梅林',
              count: 1
            }, {
              name: '派西维尔',
              count: 1
            }, {
              name: '亚瑟的忠臣',
              count: 1
            }],
            blue: [{
              name: '莫甘娜',
              count: 1
            }, {
              name: '刺客',
              count: 1
            }]
          }
        }, {
          name: '5-爪牙',
          hasLady: false,
          content: {
            red: [{
              name: '梅林',
              count: 1
            }, {
              name: '派西维尔',
              count: 1
            }, {
              name: '亚瑟的忠臣',
              count: 1
            }],
            blue: [{
              name: '爪牙',
              count: 1
            }, {
              name: '刺客',
              count: 1
            }]
          }
        }, {
          name: '6',
          hasLady: false,
          content: {
            red: [{
              name: '梅林',
              count: 1
            }, {
              name: '派西维尔',
              count: 1
            }, {
              name: '亚瑟的忠臣',
              count: 2
            }],
            blue: [{
              name: '莫甘娜',
              count: 1
            }, {
              name: '刺客',
              count: 1
            }]
          }
        }, {
          name: '7',
          hasLady: false,
          content: {
            red: [{
              name: '梅林',
              count: 1
            }, {
              name: '派西维尔',
              count: 1
            }, {
              name: '亚瑟的忠臣',
              count: 2
            }],
            blue: [{
              name: '莫甘娜',
              count: 1
            }, {
              name: '刺客',
              count: 1
            }, {
              name: '奥伯伦',
              count: 1
            }]
          }
        }, {
          name: '8-无湖仙',
          hasLady: false,
          content: {
            red: [{
              name: '梅林',
              count: 1
            }, {
              name: '派西维尔',
              count: 1
            }, {
              name: '亚瑟的忠臣',
              count: 3
            }],
            blue: [{
              name: '莫甘娜',
              count: 1
            }, {
              name: '刺客',
              count: 1
            }, {
              name: '爪牙',
              count: 1
            }]
          }
        }, {
          name: '8-有湖仙',
          hasLady: true,
          content: {
            red: [{
              name: '梅林',
              count: 1
            }, {
              name: '派西维尔',
              count: 1
            }, {
              name: '亚瑟的忠臣',
              count: 3
            }],
            blue: [{
              name: '莫甘娜',
              count: 1
            }, {
              name: '刺客',
              count: 1
            }, {
              name: '爪牙',
              count: 1
            }]
          }
        }, {
          name: '9',
          hasLady: true,
          content: {
            red: [{
              name: '梅林',
              count: 1
            }, {
              name: '派西维尔',
              count: 1
            }, {
              name: '亚瑟的忠臣',
              count: 4
            }],
            blue: [{
              name: '莫甘娜',
              count: 1
            }, {
              name: '刺客',
              count: 1
            }, {
              name: '莫德雷德',
              count: 1
            }]
          }
        }, {
          name: '10',
          hasLady: true,
          content: {
            red: [{
              name: '梅林',
              count: 1
            }, {
              name: '派西维尔',
              count: 1
            }, {
              name: '亚瑟的忠臣',
              count: 4
            }],
            blue: [{
              name: '莫甘娜',
              count: 1
            }, {
              name: '刺客',
              count: 1
            }, {
              name: '莫德雷德',
              count: 1
            }, {
              name: '奥伯伦',
              count: 1
            }]
          }
        }],
      },
      langrensha: {
        total: 5,
        content: [],
        hasGod: false,
        hasPolice: true
      },
      buyaozuo: {
        total: 5,
        checkIndex: 3,
        content: [2, 3, 4, 5, 6, 7, 8, 9, 10]
      },
      homeId: ''
    },
    game: 'wodi',
    users: [{
      avator: '',
      nickname: 'user'
    }],
    isShowPicker: false
  },
  async onLoad(e) {
    const self = this;
    if (e.homeId) {
      await wxLogin(wres => {
        if (wres.successful) {
          this.setData({
            game: e.game,
            homeId: e.homeId
          });
          if (e.game === 'wodi') {
            const range = self.data.configuration.wodi.content.map(item => {
              const arr = Array.apply(Array, Array(item.max - item.min + 1)).map((_, k) => k + item.min);
              return arr;
            });
            this.setData({
              ['configuration.wodi.range']: range
            })
          }
          wxRequest({
            url: config.url + '/homes/' + e.homeId + '/addUser',
            method: 'POST',
            success(res) {
              console.log(res);
              if (res && res.data) {
                self.refreshData(self, res);
              }
            },
            fail(e) {
              console.log(e);
            }
          });
        }
        else {
          // wx.navigateTo({
          //   url: '/pages/index/index'
          // });
        }
      });
      return;
    }
    const game = e.game;
    let configuration = [];
    let AvalonIndex = -1;
    if (game === 'wodi') {
      const wodi = this.data.configuration.wodi;
      wodi.value = [4, 1, 0];
      wodi.vIndex = [3, 1, 0];
      wodi.total = 5;
      wodi.range = wodi.content.map((item, index) => {
        const arr = Array.apply(Array, Array(item.max - item.min + 1)).map((_, k) => k + item.min);
        configuration.push({
          name: item.name,
          count: wodi.value[index]
        });
        return arr;
      });
      
      this.setData({
        game,
        'configuration.wodi': wodi
      });
    }
    else {
      this.setData({
        game: 'Avalon'
      });
      AvalonIndex = this.data.configuration.Avalon.checkIndex;
      const AvalonContent = this.data.configuration.Avalon.content[AvalonIndex].content;
      configuration = AvalonContent.red.concat(AvalonContent.blue);
    }
    
    await wxRequest({
      url: config.url + '/homes',
      data: {
        type: game,
        configuration,
        confIndex: game === 'Avalon' ? AvalonIndex : -1,
        total: this.data.configuration[game].total
      },
      method: 'POST',
      success(res) {
        if (res && res.data) {
          self.setData({
            homeId: res.data._id,
          });
          self.refreshData(self, res);
          console.log(res.data);
        }
      }
    });
  },
  refreshHome() {
    const self = this;
    wxRequest({
      url: config.url + '/homes/' + this.data.homeId,
      method: 'GET',
      success(res) {
        if (res && res.data) {
          self.refreshData(self, res);
          console.log(res.data);
        }
      }
    });
  },
  refreshData(self, res) {
    if (res.data.status === 'ongoing') {
      wx.navigateTo({
        url: '/pages/gaming/gaming?homeId=' + res.data._id,
      });
    }
    if (res.data.type === 'Avalon') {
      const confIndex = res.data.confIndex;
      console.log(confIndex);
      self.setData({
        homeId: res.data._id,
        'configuration.Avalon.checkIndex': [confIndex],
        'configuration.Avalon.total': res.data.total,
        users: res.data.users
      });
    }
    else {
      const wodi = self.data.configuration.wodi;
      wodi.value = res.data.configuration.map((item, index) => {
        wodi.vIndex[index] = index ? item.count : item.count - 1;
        return item.count;
      });
      console.log(wodi);
      wodi.total = res.data.total;
      self.setData({
        homeId: res.data._id,
        'configuration.wodi': wodi,
        users: res.data.users
      });
    }
  },
  showPicker() {
    this.setData({
      isShowPicker: true
    });
  },
  sureAvalonCallBack(e) {
    const total = e.detail.choosedIndexArr < 7 ? Number(e.detail.choosedData[0][0]) : 10;
    const AvalonIndex = e.detail.choosedIndexArr[0];
    const AvalonContent = this.data.configuration.Avalon.content[AvalonIndex].content;
    this.setData({
      isShowPicker: false,
      'configuration.Avalon.checkIndex': [AvalonIndex],
      'configuration.Avalon.total': total
    });
    wxRequest({
      url: config.url + '/homes/' + this.data.homeId + '/configuration',
      data: {
        configuration: AvalonContent.red.concat(AvalonContent.blue),
        confIndex: AvalonIndex,
        total: total
      },
      method: 'POST',
      success(res) {
        console.log(res);
      }
    });
  },
  sureWodiCallBack(e) {
    const wodi = this.data.configuration.wodi;
    wodi.value = e.detail.choosedData;
    wodi.vIndex = e.detail.choosedIndexArr;
    wodi.total = e.detail.choosedData.reduce((prev,cur) => {
      return prev + cur;
    }, 0);
    this.setData({
      isShowPicker: false,
      'configuration.wodi': wodi
    });
    wxRequest({
      url: config.url + '/homes/' + this.data.homeId + '/configuration',
      data: {
        configuration: wodi.content.map((item, index) => {
          return {
            name: item.name,
            count: wodi.value[index]
          }
        }),
        total: wodi.total
      },
      method: 'POST',
      success(res) {
        console.log(res);
      }
    });
  },
  cancleCallBack(e) {
    this.setData({
      isShowPicker: false
    });
  },
  updateNickname(e) {
    const nickname = e.detail.value;
    const index = e.currentTarget.dataset.idx;
    this.setData({
      [`users[${index}].nickname`]: nickname
    });
    wxRequest({
      url: config.url + '/homes/' + this.data.homeId + '/nickname',
      method: 'POST',
      data: {
        nickname
      },
      success(res) {
        console.log(res);
      }
    })
  },
  onShareAppMessage(res) {
    return {
      path: '/pages/hall/hall?game=' + this.data.game + '&homeId=' + this.data.homeId
    };
  },
  startGame() {
    const self = this;
    wxRequest({
      url: config.url + '/homes/' + this.data.homeId + '/status',
      data: {
        status: 'ongoing'
      },
      method: 'POST',
      success(res) {
        if (res && res.data) {
          wx.navigateTo({
            url: '/pages/gaming/gaming?homeId=' + self.homeId,
          });
        }
      }
    });
  },
  outHome() {
    wxRequest({
      url: config.url + '/homes/' + this.data.homeId + '/removeUser',
      method: 'POST',
      success(res) {
        if (res && res.data) {
          wx.navigateTo({
            url: '/pages/index/index',
          });
        }
      }
    });
  }
})
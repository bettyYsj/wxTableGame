const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

import { config } from '../config/index';

function wxLogin(callback) {
  wx.checkSession({
    success() {
      callback({
        successful: true
      });
    },
    fail () {
      wx.login({
        success (res) {
          if (res.code) {
            //发起网络请求
            wx.request({
              url: config.url + '/api/weapplogin',
              data: {
                code: res.code
              },
              success(loginRes) {
                wx.removeStorageSync('sessionid');
                wx.setStorageSync("sessionid", loginRes.header["Set-Cookie"]);
                callback({
                  successful: true
                });
              },
              fail() {
                callback({
                  successful: false
                });
              }
            });
          } else {
            console.log('登录失败！' + res.errMsg);
            allback({
              successful: false
            });
          }
        },
        fail() {
          allback({
            successful: false
          });
        }
      });
    }
  });
}

async function wxRequest({
  url, 
  data, 
  method, 
  success, 
  fail
}) {
  const sessionid = wx.getStorageSync('sessionid');
  if (!sessionid) await wxLogin();
  const res = await wx.request({
    url,
    data,
    method,
    header: {
      'Cookie': sessionid
    },
    success: function (res) {
      success(res);
    },
    fail: function (err) {
      fail(err);
    }
  });
  console.log(res);
  return res;
}

module.exports = {
  formatTime,
  wxLogin,
  wxRequest
}

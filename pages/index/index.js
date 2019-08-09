//index.js
//获取应用实例
const app = getApp();

Page({
    data: {

    },
    onLoad: function (options) {

    },
    slideTrigger: function(e){
        var that = this;
        that.setData({
            val: e.detail.curVal
        });
        console.log('当前选择的值',e.detail.curVal);
    }
})

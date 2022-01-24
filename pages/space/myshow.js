var app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        title: '租地详情',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;

        that.setData({
            opentype: app.getOpentype(),
        });

        if (!wx.getStorageSync('userId')) {
            wx.navigateTo({
                url: '/pages/user/login',
            });
            return false;
        }

        wx.showLoading({
            title: '加载中...',
        });

        wx.request({
            url: app.globalData.domain + '/space/myshow.html',
            method: 'POST',
            data: {
                app_id: app.globalData.app_id,
                uid: wx.getStorageSync('userId'),
                id: options.id,
            },
            success: function (res) {
                wx.hideLoading();
                if (res.data.state) {
                    that.setData({
                        copyright: res.data.data.copyright,
                        data: res.data.data.data,
                        space: res.data.data.space,
                        farm: res.data.data.farm,
                        video: res.data.data.video,
                    });
                }
            },
        });
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

    },
    handle: function (e) {
        var that = this;
        wx.showActionSheet({
            itemList: ['浇水', '申请代种植', '申请代收割', '申请代配送'],
            success: function (res) {
                if (!res.cancel) {
                    wx.request({
                        url: app.globalData.domain + '/space/handle.html',
                        method: 'POST',
                        data: {
                            app_id: app.globalData.app_id,
                            uid: wx.getStorageSync('userId'),
                            id: that.data.data.id,
                            handle: res.tapIndex,
                        },
                        success: function (res) {
                            wx.hideLoading();
                            if (res.data.state) {
                                that.setData({
                                    space: res.data.data.space,
                                });
                            } else {
                                wx.showToast({
                                    title: res.data.msg,
                                    icon: 'none',
                                    duration: 3000
                                });
                            }
                        },
                    });
                }
            }
        });
    },
})

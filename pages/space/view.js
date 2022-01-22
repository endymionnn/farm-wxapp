var app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;

        if (!options.id) {
            wx.navigateTo({
                url: '/pages/index/index',
            });
            return false;
        }

        that.setData({
            opentype: app.getOpentype(),
            id: options.id,
        });

        wx.showLoading({
            title: '加载中...',
        });

        wx.request({
            url: app.globalData.domain + '/space/view.html',
            method: 'POST',
            data: {
                app_id: app.globalData.app_id,
                id: options.id,
                uid: wx.getStorageSync('userId'),
            },
            success: function (res) {
                wx.hideLoading();
                if (res.data.state) {
                    that.setData({
                        title: res.data.data.title,
                        copyright: res.data.data.copyright,
                        data: res.data.data.data,
                        order_day: res.data.data.order_day,
                        order_time: res.data.data.order_time,
                        day_str: res.data.data.day_str,
                        position_list: res.data.data.position_list,
                        space_free_num: res.data.data.space_free_num,
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
    order: function () {
        var that = this;

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
            url: app.globalData.domain + '/space/order.html',
            method: 'POST',
            data: {
                app_id: app.globalData.app_id,
                uid: wx.getStorageSync('userId'),
                id: that.data.data.id,
                day: that.data.day,
                time: that.data.time,
                position_id: that.data.position_check.id,
            },
            success: function (res) {
                wx.hideLoading();
                if (res.data.state == 100) {
                    wx.navigateTo({
                        url: '/pages/user/mobile',
                    });
                    return false;
                }

                if (res.data.state == 1) {
                    if (res.data.data.id) {
                        wx.navigateTo({
                            url: '/pages/pay/index?id=' + res.data.data.id,
                        });
                    } else {
                        wx.navigateTo({
                            url: '/pages/space/my',
                        });
                    }
                } else {
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none',
                        duration: 3000
                    });
                }
            },
        });
    },
})

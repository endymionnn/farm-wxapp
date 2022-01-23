var app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        load: 0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;

        that.setData({
            opentype: app.getOpentype(),
        });

        wx.showLoading({
            title: '加载中...',
        });

        wx.request({
            url: app.globalData.domain + '/space/index.html',
            method: 'POST',
            data: {
                app_id: app.globalData.app_id,
                farm_id: options.farm_id,
            },
            success: function (res) {
                wx.hideLoading();
                that.setData({
                    load: 1,
                });
                if (res.data.state) {
                    that.setData({
                        title: res.data.data.title,
                        copyright: res.data.data.copyright,
                        list: res.data.data.list,
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

    }
})

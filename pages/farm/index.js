var app = getApp();

Page({

    data: {
        
    },

    onLoad: function (options) {
        var that = this;

        that.setData({
            opentype: app.getOpentype(),
            farm_id: wx.getStorageSync('FarmId'),
        });

        if (!options.id) {
            wx.navigateTo({
                url: '/pages/index/index',
            });
            return false;
        }
        that.pageLoad(options.id);
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

    pageLoad(id) {
        var that = this;

        wx.showLoading({
            title: '加载中...',
        });

        wx.request({
            url: app.globalData.domain + '/farm/index.html',
            method: 'POST',

            data: {
                app_id: app.globalData.app_id,
                uid: wx.getStorageSync('userId'),
                id: id,
                lat: wx.getStorageSync('lat'),
                lng: wx.getStorageSync('lng'),
            },
            success: function (res) {
                wx.hideLoading();
                if (res.data.state) {
                    if (!res.data.data.farm) {
                        wx.navigateTo({
                            url: '/pages/index/index',
                        });
                        return false;
                    }
                    that.setData({
                        title: res.data.data.title,
                        copyright: res.data.data.copyright,
                        farm: res.data.data.farm,
                        space: res.data.data.space
                    });
                    wx.setStorageSync('FarmId', res.data.data.farm.id);
                }
            },
        });
    },
    phoneCall: function (e) {
        wx.makePhoneCall({
            phoneNumber: e.currentTarget.dataset.phone,
        });
    },
    openPosition:function (e) {
        wx.openLocation({
            latitude: e.currentTarget.dataset.lat,
            longitude: e.currentTarget.dataset.lng,
            name: e.currentTarget.dataset.name,
            scale: 17
        })
    }
})

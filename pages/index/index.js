var app = getApp();

Page({
    data: {
        load: 0,
        statusBarHeight: app.globalData.statusBarHeight,
        titleBarHeight: app.globalData.titleBarHeight,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
        var that = this;

        that.setData({
            opentype: app.getOpentype(),
        });
        this.pageLoad();
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
    pageLoad() {
        var that = this;

        wx.getLocation({
            type: 'gcj02',
            success: function (res) {
                wx.setStorageSync('lat', res.latitude);
                wx.setStorageSync('lng', res.longitude);
                that.getPageLoad(res.latitude, res.longitude);
            },
            fail: function (res) {
                that.getPageLoad(0, 0);
            }
        });
    },
    getPageLoad(lat, lng) {
        var that = this;
        wx.showLoading({
            title: '加载中...',
        });
        wx.request({
            url: app.globalData.domain + '/index/index.html',
            method: 'POST',
            data: {
                app_id: app.globalData.app_id,
                lat: lat,
                lng: lng,
            },
            success: function (res) {
                wx.hideLoading();
                that.setData({
                    load: 1,
                    title: res.data.data.title,
                    copyright: res.data.data.copyright,
                    list: res.data.data.list,
                }); 
            },
        });
    },
})

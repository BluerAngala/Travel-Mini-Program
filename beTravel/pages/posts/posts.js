// pages/posts/posts.js
/**
 * Author : 丸子团队（波波、Chi、ONLINE.信）
 * Github 地址: https://github.com/dchijack/Travel-Mini-Program
 * GiTee 地址： https://gitee.com/izol/Travel-Mini-Program
 */
const API = require('../../utils/api')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    posts:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      options: options
    })
    if (options.id == 1) {
      this.setData({
        category: '我的点赞'
      })
      swan.setNavigationBarTitle({
        title: '我的点赞'
      })
      this.getLikePosts();
    } else if (options.id == 2) {
      this.setData({
        category: '我的收藏'
      })
      swan.setNavigationBarTitle({
        title: '我的收藏'
      })
      this.getFavPosts();
    } else if (options.id == 3) {
      this.setData({
        category: '我的评论'
      })
      swan.setNavigationBarTitle({
        title: '我的评论'
      })
      this.getCommentsPosts();
    }
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
    if (this.data.options.id == 1) {
      let title = app.globalData.user.nickName + ' 的点赞文章'
      this.getPageInfo(title)
    } else if (this.data.options.id == 2) {
      let title = app.globalData.user.nickName + ' 的收藏文章'
      this.getPageInfo(title)
    } else if (this.data.options.id == 3) {
      let title = app.globalData.user.nickName + ' 的评论文章'
      this.getPageInfo(title)
    }
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
    this.setData({
      page:1,
      posts:[],
      isPull: true,
      isLastPage: flase
    })
    if (this.data.options.id == 1) {
      this.getLikePosts();
    } else if (this.data.options.id == 2) {
      this.getFavPosts();
    } else if (this.data.options.id == 3) {
      this.getCommentsPosts();
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({isBottom:true})
    if(!this.data.isLastPage) {
      if (this.data.options.id == 1) {
        this.getLikePosts({page:this.data.page});
      } else if (this.data.options.id == 2) {
        this.getFavPosts({page:this.data.page});
      } else if (this.data.options.id == 3) {
        this.getCommentsPosts({page:this.data.page});
      }
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  getLikePosts: function(args) {
    API.getLikePosts(args).then(res => {
      let args = {}
      if (res.length < 10) {
        this.setData({
          isLastPage: true,
          loadtext: '到底啦',
          showloadmore: false
        })
      }
      if (this.data.isPull) {
        args.posts = [].concat(this.data.posts, res)
        args.page = this.data.page + 1
      } else if (this.data.isBottom) {
        args.posts = [].concat(this.data.posts, res)
        args.page = this.data.page + 1
      } else {
        args.posts = [].concat(this.data.posts, res)
        args.page = this.data.page + 1
      }
      this.setData(args)
    })
  },

  getFavPosts: function(args) {
    API.getFavPosts(args).then(res => {
      let args = {}
      if (res.length < 10) {
        this.setData({
          isLastPage: true,
          loadtext: '到底啦',
          showloadmore: false
        })
      }
      if (this.data.isPull) {
        args.posts = [].concat(this.data.posts, res)
        args.page = this.data.page + 1
      } else if (this.data.isBottom) {
        args.posts = [].concat(this.data.posts, res)
        args.page = this.data.page + 1
      } else {
        args.posts = [].concat(this.data.posts, res)
        args.page = this.data.page + 1
      }
      this.setData(args)
    })
  },

  getCommentsPosts: function(args) {
    API.getCommentsPosts(args).then(res => {
      let args = {}
      if (res.length < 10) {
        this.setData({
          isLastPage: true,
          loadtext: '到底啦',
          showloadmore: false
        })
      }
      if (this.data.isPull) {
        args.posts = [].concat(this.data.posts, res)
        args.page = this.data.page + 1
      } else if (this.data.isBottom) {
        args.posts = [].concat(this.data.posts, res)
        args.page = this.data.page + 1
      } else {
        args.posts = [].concat(this.data.posts, res)
        args.page = this.data.page + 1
      }
      this.setData(args)
    })
  },

  getPageInfo: function(title) {
    API.getSiteInfo().then(res => {
      swan.setPageInfo({
				title: title + ' - ' + res.name,
				keywords: res.keywords,
				description: res.description,
				image: 'https://cxcat.com/wp-content/uploads/2019/10/2019101511214592.jpg',
				success: function () {
					console.log('小程序 Web 化信息设置成功');
				},
				fail: function (err) {
					console.log('小程序 Web 化信息设置失败', err);
				}
			})
    })
    .catch(err => {
      console.log(err)
    })
  },

  bindDetail: function (e) {
    let id = e.currentTarget.id;
    swan.navigateTo({
      url: '/pages/detail/detail?id=' + id,
    })
  }
})
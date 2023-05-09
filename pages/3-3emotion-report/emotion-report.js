// pages/motion-report/motion-report.js
import * as echarts from '../../components/ec-canvas/echarts'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec: {
      lazyLoad: true // 延迟加载
    },
    dateString: "",// 当前日期的string形式
    spot: ['2023/4/29','2023/4/30'],// 特殊标识的日期
    nowDate : '',// 当前日期
    MoodsRecord : 0,// 共记录心情
    MoodsGenerated : 0,// 共产生心情
    MostMood : '开心',// 产生最多心情
    MostMoodIcon : '',// 产生最多心情对应的icon
    Positive : '38.6',// 正面情绪占比
    Negative : '18.2', // 负面情绪占比
    Normal : '18.2', // 中性程序占比
    moodList : [{
      icon: "icon_happy",
      name: "开心",
      count : 1,
    },
    ],
    wmoodList:[],
    reasonsList : [
      {text : '想玩的嘞',
        count : 2, // 次数
      },
      {text : '想玩的嘞',
        count : 2, // 次数
      },
    ],
    wreasonsList:[],
    activeReportType: 'month',
    echartData:[],
    //记录心情次数
    wemotionTimes:0,
    //产生心情种数
    wemotionSpecies:0,
    //原因总数
    wreasonTimes:0
  },

  onLoad: function () {
    this.initialData();
    let nowDate = new Date().toLocaleDateString();
    this.setData({
      nowDate : nowDate,
    })
    // 初始化echarts图表
    this.initChart();
  },
  initialData(){
    //月度心情分布
    wx.request({
      url: 'http://175.178.90.196:7779/moodRequest/monthDistribution',
      data: {
        openId:'test',
        month:5
      },
      success:(res)=>{ 
        this.setData({
          moodList:res.data
        })
      }
    })
    //周度心情分布
    wx.request({
      url: 'http://175.178.90.196:7779/moodRequest/weekDistribution',
      data: {
        openId:'test',
      },
      success:(res)=>{ 
        this.setData({
          wmoodList:res.data
        })
        const totalCount2 = this.data.wmoodList.reduce((sum, item) => {
          return sum + item.count;
        }, 0);
        this.setData({
          wemotionTimes:totalCount2,
          wemotionSpecies:this.data.wmoodList.length,
        })
      }
    })
    //月度心情原因分布
    wx.request({
      url: 'http://175.178.90.196:7779/moodRequest/monthReason',
      data: {
        openId:'test',
        month:5
      },
      success:(res)=>{ 
        this.setData({
          reasonsList:res.data
        })
      }
    })
    //周度心情原因分布
    wx.request({
      url: 'http://175.178.90.196:7779/moodRequest/weekReason',
      data: {
        openId:'test',
      },
      success:(res)=>{ 
        console.log(res.data)
        this.setData({
          wreasonsList:res.data
        })
        this.setData({
          wreasonTimes:this.data.wreasonsList.length
        })
      }
    })
    //月度心情数据
    wx.request({
      url: 'http://175.178.90.196:7779/moodRequest/monthStatistic',
      data: {
        openId:'test',
        month:5
      },
      success:(res)=>{
        console.log(res.data)
        this.setData({
          MoodsRecord:res.data.moodsRecord,
          MoodsGenerated:res.data.moodsGenerated,
          MostMood:res.data.moodMost,
          MostMoodIcon:res.data.moodMostUrl
        })
      }
    })
    //月度心情百分比
    wx.request({
      url: 'http://175.178.90.196:7779/moodRequest/monthPercent',
      data: {
        openId:'test',
        month:5
      },
      success:(res)=>{ 
        this.setData({
          Positive:Math.round(res.data.positive*100),
          Negative:Math.round(res.data.negative*100),
          Normal:Math.round(res.data.normal*100)
        })
      }
    })
    //月度折线图数据
    wx.request({
      url: 'http://175.178.90.196:7779/moodRequest/monthData',
      data: {
        openId:'test',
        month:5
      },
      success:(res)=>{
        console.log(res.data)
        this.setData({
          echartData:res.data
        })
      }
    })
    //心情记录日期
    wx.request({
      url: 'http://175.178.90.196:7779/moodRequest/allDate',
      data: {
        openId:'test',
      },
      success:(res)=>{ 
        this.setData({
          spot:res.data
        })
      }
    })
  },
  onMonthReportTap: function() {
    this.setData({
      activeReportType: 'month',
    });
  },

  onWeekReportTap: function() {
    this.setData({
      activeReportType: 'week',
    });
  },

  // 初始化图表
  initChart: function () {
    // 使用组件方式初始化图表
    this.selectComponent('#mychart').init((canvas, width, height) => {
      // 初始化echarts实例
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });

      // 设置数据
      // const data = [
      //   { day: '1', value: 0 },
      //   { day: '2', value: 1 },
      //   { day: '3', value: 2 },
      //   { day: '4', value: 1.4 },
      // ];
      const data=this.data.echartData;

      // 配置图表选项
      const option = {
        xAxis: {
          type: 'category',
          data: data.map(item => item.day),
          boundaryGap: false
        },
        yAxis: {
          type: 'value',
          min: 0,
          max: 2,
          interval: 1,
          axisLabel: {
            formatter: function (value) {
              switch (value) {
                case 0:
                  return '负面';
                case 1:
                  return '中性';
                case 2:
                  return '正面';
              }
            }
          }
        },
        series: [{
          type: 'line',
          data: data.map(item => item.point),
          smooth: true
        }],
        lineStyle: {
          color: '#000000'
        },
 
      };

      // 使用刚指定的配置项和数据显示图表
      chart.setOption(option);

      // 将图表实例绑定到页面的data中，以便后续调用
      this.chart = chart;

      // 手动触发图表的resize事件，使得图表能够自适应大小
      setTimeout(function () {
        chart.resize();
      }, 100);
    });
  },
  dateChange(e) {
    this.setData({
      dateString: e.detail.dateString
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
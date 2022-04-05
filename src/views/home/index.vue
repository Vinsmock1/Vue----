<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top: 20px">
      <el-card shadow="hover">
        <div class="user">
          <img :src="userImg" />
          <div>
            <p class="name">山治</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录的时间:<span>2022-3-31</span></p>
          <p>上次登录的地点:<span>深圳</span></p>
        </div>
      </el-card>
      <!-- table表格 -->
      <el-card style="margin-top: 20px; height: 460px">
        <el-table :data="tableData">
          <el-table-column
            v-for="(val, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="val"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>

    <el-col :span="16" style="margin-top: 20px">
      <!-- 订单统计 -->
      <div class="num">
        <el-card
          v-for="item in countData"
          :key="item.name"
          :body-style="{ display: 'flex', padding: 0 }"
        >
          <i
            class="icon"
            :class="`el-icon-${item.icon}`"
            :style="{ background: item.color }"
          ></i>
          <div class="detail">
            <p class="num">￥{{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>

      <!-- 折线图 -->
      <el-card style="height: 280px">
        <div style="height: 280px" ref="echarts"></div>
      </el-card>
      <div class="graph">
        <!-- 柱状图 -->
        <el-card style="height: 260px">
          <div style="height: 240px" ref="userEcharts"></div>
        </el-card>
        <!-- 饼状图 -->
        <el-card style="height: 260px">
          <div style="height: 240px" ref="videoEcharts"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getData } from "../../api/data";
import * as echarts from "echarts";
export default {
  name: "home",
  data() {
    return {
      userImg: require("../../assets/images/user.png"),
      tableData: [],
      tableLabel: {
        name: "课程",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
    };
  },
  mounted() {
    getData().then((res) => {
      const { code, data } = res.data;
      if (code === 20000) {
        this.tableData = data.tableData;

        //折线图
        /* 将mock模拟数据中的orderData赋值给order */
        const order = data.orderData;
        /* 将模拟数据中的X坐标赋值给xData */
        const xData = order.date;
        /* 通过Object.keys方法获取模拟数据中的mock对象 */
        const keyArray = Object.keys(order.data[0]);
        /* 提前准备个series空数组存放 */
        const series = [];
        /* 遍历所有的键(key)和属性,并添加到sercies中 */
        keyArray.forEach((key) => {
          series.push({
            name: key,
            /* 使用map方法保存mock对象中所有的key */
            data: order.data.map((item) => item[key]),
            type: "line",
          });
        });
        const option = {
          /* 将模拟数据中的X坐标传入 */
          xAxis: {
            data: xData,
          },
          yAxis: {},
          /* 存放属性 */
          legend: {
            data: keyArray,
          },
          series,
        };
        /* 将要渲染的DOM节点用init连接到echarts中赋值给E */
        const E = echarts.init(this.$refs.echarts);
        /* 将要绘图的配置option传入 */
        E.setOption(option);

        //柱状图
        const userOption = {
          legend: {
            // 图例文字颜色
            textStyle: {
              color: "#333",
            },
          },
          grid: {
            left: "20%",
          },
          // 提示框
          tooltip: {
            trigger: "axis",
          },
          xAxis: {
            type: "category", // 类目轴
            //获取模拟数据中的date(周几)
            data: data.userData.map((item) => item.date),
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
            axisLabel: {
              interval: 0,
              color: "#333",
            },
          },
          yAxis: [
            {
              type: "value",
              axisLine: {
                lineStyle: {
                  color: "#17b3a3",
                },
              },
            },
          ],
          color: ["#2ec7c9", "#b6a2de"],
          series: [
            {
              name: "新增用户",
              /* 获取模拟数据中的new值 */
              data: data.userData.map((item) => item.new),
              type: "bar",
            },
            {
              name: "活跃用户",
              /* 获取模拟数据中的active值 */
              data: data.userData.map((item) => item.active),
              // bar 表示柱状图
              type: "bar",
            },
          ],
        };
        const U = echarts.init(this.$refs.userEcharts)
        U.setOption(userOption)

        //饼状图
        const videoOption={
          tooltip: {
            trigger: "item",
          },
          color: [
            "#0f78f4",
            "#dd536b",
            "#9462e5",
            "#a6a6a6",
            "#e1bb22",
            "#39c362",
            "#3ed1cf",
          ],
          series: [
              {
                  data:data.videoData,
                  type:'pie'
              }
          ],
        }
        const V = echarts.init(this.$refs.videoEcharts)
        V.setOption(videoOption)
      }
      /* console.log(res); */
    });
  },
};
</script>

<template>
  <div class="trend-charts">
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="chart-container">
          <h3>营收趋势</h3>
          <div ref="revenueChart" style="height:400px;"></div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="chart-container">
          <h3>利润趋势</h3>
          <div ref="profitChart" style="height:400px;"></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const revenueChart = ref(null)
const profitChart = ref(null)

onMounted(() => {
  initCharts()
})

function initCharts() {
  // 营收趋势图
  const revenueInstance = echarts.init(revenueChart.value)
  revenueInstance.setOption({
    xAxis: {
      type: 'category',
      data: ['Q1', 'Q2', 'Q3', 'Q4']
    },
    yAxis: { type: 'value' },
    series: [{
      data: [320, 450, 380, 510],
      type: 'line',
      smooth: true
    }]
  })

  // 利润趋势图
  const profitInstance = echarts.init(profitChart.value)
  profitInstance.setOption({
    xAxis: {
      type: 'category',
      data: ['Q1', 'Q2', 'Q3', 'Q4']
    },
    yAxis: { type: 'value' },
    series: [{
      data: [80, 120, 95, 150],
      type: 'bar'
    }]
  })
}
</script>

<style scoped>
.chart-container {
  background: #fff;
  padding: 20px;
  border-radius: 4px;
  margin-bottom: 20px;
}
.chart-container h3 {
  margin: 0 0 15px 0;
}
</style>
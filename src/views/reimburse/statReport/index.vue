<template>
  <div class="p-4">
    <div class="flex gap-4 mb-6">
      <el-date-picker
        v-model="dateRange"
        type="monthrange"
        range-separator="至"
        start-placeholder="开始月份"
        end-placeholder="结束月份"
        value-format="YYYY-MM"
      />
      <el-select v-model="chartType" placeholder="选择图表类型">
        <el-option label="趋势分析" value="line" />
        <el-option label="类型分布" value="pie" />
        <el-option label="部门对比" value="bar" />
      </el-select>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <el-card class="chart-card">
        <template #header>
          <div class="font-medium">月度报销趋势</div>
        </template>
        <div ref="trendChart" class="h-80"></div>
      </el-card>

      <el-card class="chart-card">
        <template #header>
          <div class="font-medium">报销类型分布</div>
        </template>
        <div ref="typeChart" class="h-80"></div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import { debounce } from 'lodash-es'

const dateRange = ref(['2023-01', '2023-06'])
const chartType = ref('line')
const trendChart = ref(null)
const typeChart = ref(null)

let trendInstance = null
let typeInstance = null

// 智能图表初始化函数
const safeInitChart = (chartRef, instanceVar) => {
  return new Promise((resolve) => {
    const checkSize = () => {
      requestAnimationFrame(() => {
        if (chartRef.value && 
            chartRef.value.clientWidth > 0 && 
            chartRef.value.clientHeight > 0) {
          if (!instanceVar) {
            instanceVar = echarts.init(chartRef.value)
            instanceVar.resize()
          }
          resolve(instanceVar)
        } else {
          checkSize()
        }
      })
    }
    checkSize()
  })
}

// 初始化图表实例
const initCharts = async () => {
  trendInstance = await safeInitChart(trendChart, trendInstance)
  typeInstance = await safeInitChart(typeChart, typeInstance)
  updateCharts()
}

// 更新图表数据（保持不变）
const updateCharts = () => {
  // 原有数据更新逻辑...
}

// 防抖的resize处理
const handleResize = debounce(() => {
  trendInstance?.resize()
  typeInstance?.resize()
}, 300)

onMounted(async () => {
  await nextTick()
  await initCharts()
  
  window.addEventListener('resize', handleResize)
})

watch([dateRange, chartType], async () => {
  await nextTick()
  updateCharts()
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  trendInstance?.dispose()
  typeInstance?.dispose()
})
</script>

<style lang="less" scoped>
.chart-card .el-card__body {
  padding: 16px;
}

.chart-card {
  /* 确保卡片有有效尺寸 */
  min-height: 400px;
}
.h-80 {
  /* 明确高度定义 */
  height: 320px;
  min-height: 320px;
}
</style>
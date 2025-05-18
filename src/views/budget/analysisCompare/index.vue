<template>
    <div class="analysis-compare">
        <div class="filter-container">
            <el-select v-model="selectedPeriod" placeholder="选择对比期间">
                <el-option v-for="period in periods" :key="period" :label="period" :value="period" />
            </el-select>
        </div>

        <div class="chart-container">
            <div ref="compareChart" style="height: 500px;"></div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'

const periods = ref(['2023-01', '2023-02', '2023-03', '2023-04'])
const selectedPeriod = ref('2023-04')

const compareChart = ref(null)
let chartInstance = null

const initChart = () => {
    if (!chartInstance) {
        chartInstance = echarts.init(compareChart.value)
    }

    const option = {
        title: { text: '预算执行趋势分析' },
        tooltip: { trigger: 'axis' },
        legend: { data: ['预算金额', '实际支出'] },
        xAxis: { type: 'category', data: periods.value },
        yAxis: { type: 'value' },
        series: [
            {
                name: '预算金额',
                type: 'line',
                data: [500, 600, 700, 800]
            },
            {
                name: '实际支出',
                type: 'line',
                data: [450, 580, 680, 750]
            }
        ]
    }

    chartInstance.setOption(option)
}

onMounted(initChart)
watch(selectedPeriod, initChart)

onBeforeUnmount(() => {
    if (chartInstance) {
        chartInstance.dispose()
    }
})
</script>

<style scoped>
.filter-container {
    margin: 20px 0;
}
</style>
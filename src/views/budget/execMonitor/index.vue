<template>
    <div class="exec-monitor">
        <el-table :data="executionData" stripe style="width: auto">
            <el-table-column prop="department" label="部门" />
            <el-table-column prop="budgetAmount" label="预算金额" />
            <el-table-column prop="usedAmount" label="已用金额" />
            <el-table-column label="执行率">
                <template #default="{ row }">
                    <el-progress 
                        :percentage="(row.usedAmount / row.budgetAmount * 100).toFixed(2)"
                        :color="getProgressColor(row)" 
                    />
                </template>
            </el-table-column>
        </el-table>

        <div class="chart-container">
            <div ref="chart" style="height: 400px;"></div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'

const executionData = ref([
    { department: '财务部', budgetAmount: 500000, usedAmount: 320000 },
    { department: '市场部', budgetAmount: 800000, usedAmount: 750000 },
    { department: '研发部', budgetAmount: 1000000, usedAmount: 680000 }
])

const chart = ref(null)
let chartInstance = null

const getProgressColor = (row) => {
    const rate = row.usedAmount / row.budgetAmount
    return rate > 0.9 ? '#f56c6c' : rate > 0.7 ? '#e6a23c' : '#67c23a'
}

onMounted(() => {
    chartInstance = echarts.init(chart.value)
    const option = {
        title: { text: '预算执行情况' },
        tooltip: {},
        xAxis: { data: executionData.value.map(d => d.department) },
        yAxis: {},
        series: [{
            name: '预算金额',
            type: 'bar',
            data: executionData.value.map(d => d.budgetAmount)
        }, {
            name: '已用金额',
            type: 'bar',
            data: executionData.value.map(d => d.usedAmount)
        }]
    }
    chartInstance.setOption(option)
})

onBeforeUnmount(() => {
    if (chartInstance) {
        chartInstance.dispose()
    }
})
</script>

<style lang="less" scoped>
.exec-monitor {
    background-color: #fff;
    .el-table {
        padding: 15px 0;
    }
    .chart-container {
        padding: 0 20px;
    }
}
</style>
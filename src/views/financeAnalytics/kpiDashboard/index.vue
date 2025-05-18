<template>
  <div class="kpi-dashboard">
    <el-row :gutter="20">
      <el-col :span="6" v-for="(item, index) in kpiList" :key="index">
        <el-card class="kpi-card">
          <div class="kpi-title">{{ item.title }}</div>
          <div class="kpi-value">{{ item.value }}</div>
          <div class="kpi-trend">
            <span :class="item.trend >= 0 ? 'up' : 'down'">
              {{ item.trend >= 0 ? '+' : '' }}{{ item.trend }}%
            </span>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const kpiList = ref([
  { title: '营业收入', value: '¥1,234万', trend: 12.5 },
  { title: '净利润', value: '¥234万', trend: 8.2 },
  { title: '毛利率', value: '35.6%', trend: -2.1 },
  { title: '资产负债率', value: '45.2%', trend: -1.3 }
])
</script>

<style lang="less" scoped>
.kpi-card {
  text-align: center;
  margin-bottom: 20px;
}
.kpi-title {
  color: #666;
  font-size: 14px;
}
.kpi-value {
  font-size: 24px;
  font-weight: bold;
  margin: 10px 0;
}
.kpi-trend .up {
  color: #67c23a;
}
.kpi-trend .down {
  color: #f56c6c;
}
</style>
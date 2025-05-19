<template>
  <div class="financial-statements">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="资产负债表" name="balance">
        <financial-table :data="balanceData" />
      </el-tab-pane>
      <el-tab-pane label="利润表" name="income">
        <financial-table :data="incomeData" />
      </el-tab-pane>
      <el-tab-pane label="现金流量表" name="cashflow">
        <financial-table :data="cashflowData" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import FinancialTable from '@/components/financialTable.vue'

const activeTab = ref('balance')

// 模拟数据
// 资产负债表数据
const balanceData = ref({
  columns: [
    { prop: 'item', label: '项目' },
    { prop: 'value', label: '金额' }
  ],
  rows: [
    { item: '流动资产合计', value: '¥1,234万' },
    { item: '固定资产', value: '¥567万' },
    { item: '无形资产', value: '¥89万' },
    { item: '流动负债合计', value: '¥654万' },
    { item: '长期负债', value: '¥321万' },
    { item: '所有者权益', value: '¥915万' }
  ]
})

// 利润表数据
const incomeData = ref({
  columns: [
    { prop: 'item', label: '项目' },
    { prop: 'value', label: '金额' }
  ],
  rows: [
    { item: '营业收入', value: '¥2,500万' },
    { item: '营业成本', value: '¥1,200万' },
    { item: '营业利润', value: '¥800万' },
    { item: '销售费用', value: '¥300万' },
    { item: '管理费用', value: '¥200万' },
    { item: '净利润', value: '¥450万' }
  ]
})

// 现金流量表数据
const cashflowData = ref({
  columns: [
    { prop: 'item', label: '项目' },
    { prop: 'value', label: '金额' }
  ],
  rows: [
    { item: '经营活动现金流入', value: '¥1,800万' },
    { item: '经营活动现金流出', value: '¥1,300万' },
    { item: '经营活动净流量', value: '¥500万' },
    { item: '投资活动净流量', value: '¥-200万' },
    { item: '筹资活动净流量', value: '¥300万' },
    { item: '现金净增加额', value: '¥600万' }
  ]
})

// 其他表格数据类似...
</script>
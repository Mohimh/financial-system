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
const balanceData = ref({
  columns: [
    { prop: 'item', label: '项目' },
    { prop: 'value', label: '金额' }
  ],
  rows: [
    { item: '流动资产', value: '¥1234万' },
    { item: '非流动资产', value: '¥567万' },
    // 更多数据...
  ]
})

// 其他表格数据类似...
</script>
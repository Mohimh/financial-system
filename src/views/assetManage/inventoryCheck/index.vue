<template>
  <div class="inventory-check">
    <el-form :inline="true" :model="searchForm" class="search-form">
      <el-form-item label="资产名称">
        <el-input v-model="searchForm.name" placeholder="请输入资产名称" clearable />
      </el-form-item>
      <el-form-item label="资产编号">
        <el-input v-model="searchForm.code" placeholder="请输入资产编号" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">查询</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border style="width: 100%; margin-top: 20px;">
      <el-table-column prop="code" label="资产编号" width="120" />
      <el-table-column prop="name" label="资产名称" width="180" />
      <el-table-column prop="bookQty" label="账面数量" width="120" />
      <el-table-column prop="actualQty" label="实际数量" width="120">
        <template #default="scope">
          <el-input-number v-model="scope.row.actualQty" :min="0" @change="calcDiff(scope.row)" />
        </template>
      </el-table-column>
      <el-table-column prop="diff" label="盘盈/盘亏" width="120">
        <template #default="scope">
          <span :style="{color: scope.row.diff > 0 ? 'green' : (scope.row.diff < 0 ? 'red' : '#333')}" >
            {{ scope.row.diff > 0 ? '盘盈' : (scope.row.diff < 0 ? '盘亏' : '无差异') }} ({{ scope.row.diff }})
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注">
        <template #default="scope">
          <el-input v-model="scope.row.remark" placeholder="可填写备注" />
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 24px; text-align: right;">
      <el-button type="primary" @click="onSubmit">提交盘点结果</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

const searchForm = reactive({
  name: '',
  code: ''
})

// 示例数据，实际可从接口获取
const tableData = ref([
  { code: 'A001', name: '电脑', bookQty: 10, actualQty: 10, diff: 0, remark: '' },
  { code: 'A002', name: '打印机', bookQty: 5, actualQty: 5, diff: 0, remark: '' },
  { code: 'A003', name: '投影仪', bookQty: 2, actualQty: 2, diff: 0, remark: '' }
])

const onSearch = () => {
  // 实际应调用接口，这里仅做本地过滤演示
  tableData.value = tableData.value.filter(item => {
    return (
      (!searchForm.name || item.name.includes(searchForm.name)) &&
      (!searchForm.code || item.code.includes(searchForm.code))
    )
  })
}

const onReset = () => {
  searchForm.name = ''
  searchForm.code = ''
  // 这里应重新拉取数据，演示用初始数据
  tableData.value = [
    { code: 'A001', name: '电脑', bookQty: 10, actualQty: 10, diff: 0, remark: '' },
    { code: 'A002', name: '打印机', bookQty: 5, actualQty: 5, diff: 0, remark: '' },
    { code: 'A003', name: '投影仪', bookQty: 2, actualQty: 2, diff: 0, remark: '' }
  ]
}

function calcDiff(row) {
  row.diff = row.actualQty - row.bookQty
}

tableData.value.forEach(row => calcDiff(row))

const onSubmit = () => {
  // 实际应提交到后端
  ElMessage.success('盘点结果已提交！')
}
</script>

<style lang="less" scoped>
.inventory-check {
  max-width: 900px;
  margin: 40px auto;
  background: #fff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 8px #f0f1f2;
  .search-form {
    margin-bottom: 16px;
  }
}
</style>
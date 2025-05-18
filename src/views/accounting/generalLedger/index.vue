<template>
    <div class="general-ledger">
        <el-form :inline="true">
            <el-form-item label="科目">
                <el-select v-model="query.subjectId" style="width: 200px;" placeholder="">
                    <el-option v-for="item in subjectList" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
            </el-form-item>
            <el-form-item label="日期">
                <el-date-picker v-model="query.dateRange" type="daterange" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSearch">查询</el-button>
            </el-form-item>
        </el-form>

        <el-tabs v-model="activeTab">
            <el-tab-pane label="总账" name="general">
                <el-table :data="generalData">
                    <el-table-column prop="subjectCode" label="科目编码" />
                    <el-table-column prop="subjectName" label="科目名称" />
                    <el-table-column prop="debitAmount" label="借方金额" />
                    <el-table-column prop="creditAmount" label="贷方金额" />
                    <el-table-column prop="balance" label="余额" />
                </el-table>
            </el-tab-pane>

            <el-tab-pane label="明细账" name="detail">
                <el-table :data="detailData">
                    <el-table-column prop="voucherDate" label="日期" />
                    <el-table-column prop="voucherNo" label="凭证号" />
                    <el-table-column prop="summary" label="摘要" />
                    <el-table-column prop="debitAmount" label="借方金额" />
                    <el-table-column prop="creditAmount" label="贷方金额" />
                </el-table>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

const query  = reactive ({
    subjectId: '',
    dateRange: '',
})

const activeTab = ref('general')

const subjectList = ref([
  { id: 1, name: '现金' },
  { id: 2, name: '银行存款' },
  { id: 3, name: '应收账款' }
])


const generalData = ref([
    {
        subjectCode: '123',
        subjectName: '钱',
        debitAmount: 123,
        creditAmount: 123,
        balance: 0,
    }

])
const detailData = ref([])

const handleSearch = () => {}

</script>

<style lang="less" scoped>

.general-ledger {
    background-color: #fff;
    .el-form {
        padding: 15px 20px;
    }
    .el-tabs {
        margin: 0 20px;
        .el-link {
            margin: 0 10px;
        }
    }
}
</style>
<template>
    <div class="voucher-entry">
        <!-- 查询条件 -->
        <el-form :inline="true">
            <el-form-item label="日期">
                <el-date-picker v-model="query.dateRange" type="daterange" />
            </el-form-item>
            <el-form-item label="凭证号">
                <el-input v-model="query.voucherNo" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSearch">查询</el-button>
            </el-form-item>
        </el-form>

        <!-- 凭证列表 -->
        <el-table :data="tableData.list" border stripe style="width: auto">
            <el-table-column prop="voucherDate" label="日期"/>
            <el-table-column prop="voucherNo" label="凭证号"/>
            <el-table-column prop="summary" label="摘要"/>
            <el-table-column label="操作">
                <template #default="{ row }">
                    <el-link :underline="false" type="primary" @click="edit(row)">
                        <el-icon><EditPen /></el-icon>
                        编辑
                    </el-link>
                    <el-link :underline="false" type="danger">
                        <el-icon><Delete /></el-icon>
                        删除
                    </el-link>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <div class="pagination-info">
            <el-pagination 
                v-model:current-page="paginationData.pageNum" 
                v-model:page-size="paginationData.pageSize"
                :page-sizes="[5, 10]" 
                size="small" 
                :background="false" 
                layout="total, sizes, prev, pager, next, jumper"
                :total="tableData.total" 
                @size-change="handleSizeChange" 
                @current-change="handleCurrentChange" 
            />
        </div>

        <el-dialog
            v-model="dialogFormVisable"
            :before-close="beforeClose"
            title="会计凭证查询"
            width="400"
        >
            <el-form
                ref="formRef"
                label-width="100px"
                label-position="left"
                :model="form"
                :rules="rules"
            >
            <el-form-item prop="voucherDate" label="日期">
                <el-date-picker
                    v-model="form.voucherDate"
                    type="date"
                    placeholder="选择日期"
                />
            </el-form-item>
            <el-form-item prop="voucherNo" label="凭证号">
                <el-input v-model="form.voucherNo" label="凭证号"/>
            </el-form-item>
            <el-form-item prop="summary" label="摘要">
                <el-input
                    v-model="form.summary"
                    style="width: 240px"
                    :rows="2"
                    type="textarea"
                    placeholder="输入摘要"
                />
            </el-form-item>

            </el-form>
        </el-dialog>
    </div>
</template>

<script setup>
// import VoucherEditDialog from './VoucherEditDialog'
import { ref, reactive, nextTick } from 'vue';

const query = reactive({
    dateRange: [],
    voucherNo: '',
})

const paginationData = reactive({
    pageNum: 1,
    pageSize: 10
})

const tableData = ({
    list: [
        {
            voucherNo: 123,
            voucherDate: '2024-1-9',
            summary: '无',
        }
    ],
    total: 10
})

const dialogFormVisable = ref(false)

const beforeClose = () => {
    dialogFormVisable.value = false
    formRef.value.resetFields()
}


const open = (rowData = {}) => {
    dialogFormVisable.value = true
    nextTick(() => {
        if (rowData) {
            console.log('ok')
            Object.assign(form, JSON.parse(JSON.stringify(rowData)))
        } else {
            form.enter = new Date().toLocaleString();
        }   
    })
} 

const edit = (rowData) => {
    dialogFormVisable.value = true
    open(rowData)
}

const cancel = (rowData) => {

}

const formRef = ref()
const form = reactive({
    voucherNo: null,
    voucherDate: null,
    summary: '',
})

const handleSearch = () => {

}

</script>

<style lang="less" scoped>
.voucher-entry {
    background-color: #fff;
    .el-form {
        padding: 15px 20px;
    }
    .el-table {
        margin: 0 20px;
        .el-link {
            margin: 0 10px;
        }
    }
}
</style>
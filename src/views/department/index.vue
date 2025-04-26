<template>
    
    <div class="department-table">
        <el-button type="primary" round size="small">
            <el-icon><CirclePlus/></el-icon>
            新增
        </el-button>
        <el-table :data="tableData.list" border stripe="true" style="width: auto;">
            <el-table-column prop="name" label="名称"/>
            <el-table-column prop="notes" label="备注"/>
            <el-table-column prop="enter" label="录入时间"/>
            <el-table-column label="操作">
                <el-link :underline="false" type="primary">
                    <el-icon><EditPen /></el-icon>
                    编辑
                </el-link>
                <el-link :underline="false" type="danger">
                    <el-icon><Delete /></el-icon>
                    删除
                </el-link>
            </el-table-column>
        </el-table>
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
    </div>

</template>

<script setup>
import { reactive } from 'vue'

// 分页
const paginationData = reactive({
    pageNum: 1,
    pageSize: 10
})

// 测试数据
const tableData = ({
    list: [
        {
            name: '销售部',
            notes: '销售部',
            enter: '2024-11-16 20:35:38'
        },
        {
            name: '研发部',
            notes: '研发部',
            enter: '2024-11-16 20:35:29'
        }
    ],
    total: 10
})

const handleSizeChange = () => {

}
const handleCurrentChange = () => {
    
}
</script>

<style lang="less" scoped>

.department-table {
    background-color: #fff;
    .el-button {
        margin: 15px 20px;
    }
    .el-table {
        margin: 0 20px;
        .el-link {
            margin: 0 10px;
        }
    }
}

</style>
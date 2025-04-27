<template>
    <div class="salary-table">
        <el-button type="primary" round size="small">
            <el-icon><CirclePlus/></el-icon>
            新增
        </el-button>
        <el-table :data="tableData.list" border stripe="true" style="width: auto">
            <el-table-column prop="month" label="月份"/>
            <el-table-column prop="department" label="部门"/>
            <el-table-column prop="stuff" label="员工"/>
            <el-table-column prop="basicSalary" label="基本工资"/>
            <el-table-column prop="meritSalary" label="绩效工资"/>
            <el-table-column prop="insurance" label="五险一金"/>
            <el-table-column prop="extra" label="额外奖励"/>
            <el-table-column prop="deduct" label="其他扣除"/>
            <el-table-column prop="total" label="工资合计"/>
            <el-table-column label="状态">
                <template #default="scoped">
                    <el-tag :type="scoped.row.state === '0' ? 'info' : 'success'">
                        {{ scoped.row.state === '0' ? '待发放' : '已发放' }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="notes" label="备注"/>
            <el-table-column prop="submitDate" label="提交日期"/>
            <el-table-column label="操作" width="200px">
                <el-link :underline="false" type="primary">
                    <el-icon><EditPen /></el-icon>
                    编辑
                </el-link>
                <el-link :underline="false" type="warning">
                    <el-icon><CircleCheck /></el-icon>
                    发放
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
import { reactive } from 'vue';

// 分页
const paginationData = reactive({
    pageNum: 1,
    pageSize: 10
})

const tableData = ({
    list: [
        {
            month: '2024-10',
            department: '研发部',
            stuff: '王小二',
            basicSalary: 10000,
            meritSalary: 2000,
            insurance: 500,
            extra: 200,
            deduct: 0,
            total: 11700,
            state: '0',
            notes: '无',
            submitDate: 2024-9-10
        },
        {
            month: '2024-10',
            department: '销售部',
            stuff: '李思思',
            basicSalary: 8000,
            meritSalary: 1000,
            insurance: 500,
            extra: 200,
            deduct: 0,
            total: 8700,
            state: '1',
            notes: '无',
            submitDate: 2024-9-10
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

.salary-table {
    background-color: #fff;
    .el-button {
        margin: 15px 20px;
    }
    .el-table {
        margin: 0 20px;
        .el-link {
            margin: 0 5px;
        }
    }
}
</style>
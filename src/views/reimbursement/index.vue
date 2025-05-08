<template>
    <div class="reimbursement-table">
        <el-button type="primary" round size="small">
            <el-icon><CirclePlus/></el-icon>
            新增
        </el-button>
        <el-table :data="tableData.list" border stripe style="width: auto">
            <el-table-column prop="department" label="部门"/>
            <el-table-column prop="topic" label="主题"/>
            <el-table-column prop="type" label="类型"/>
            <el-table-column prop="certificate" label="凭证">
                <template #default="scoped">
                    <!-- 占位 -->
                </template>
            </el-table-column>
            <el-table-column prop="money" label="金额"/>
            <el-table-column prop="content" label="内容"/>
            <el-table-column prop="applicant" label="申请人"/>
            <el-table-column prop="state" label="状态">
                <template #default="scoped">
                    <el-tag :type="scoped.row.state === '0' ? 'info' : 'success'">
                        {{ scoped.row.state === '0' ? '待发放' : '已发放' }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="审核意见">
                <template #default="scoped">
                    {{ scoped.row.examine === '0' ? '--' : '同意' }}
                </template>
            </el-table-column>
            <el-table-column prop="submitDate" label="提交时间"/>
            <el-table-column label="操作" width="150px">
                <template #default="scoped">
                    <el-link :underline="false" type="warning">
                        <el-icon><CircleCheck /></el-icon>
                        审核
                    </el-link>
                    <el-link :underline="false" type="danger">
                        <el-icon><Delete /></el-icon>
                        删除
                    </el-link>
                </template>
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

const DEPARTMENT_OPTIONS = [
    { value: 1, label: '研发部' },
    { value: 2, label: '销售部' }
]

const tableData = ({
    list: [
        {
            department: '研发部',
            topic: '团建费用报销',
            type: '1',
            certificate: '图片',
            money: 2000,
            content: '无',
            applicant: '张小斐',
            state: '0',
            examine: '0',
            submitDate: '2024-11-17'
        },
        {
            department: '研发部',
            topic: '采购电脑',
            type: '2',
            certificate: '图片',
            money: 50000,
            content: '无',
            applicant: '张小斐',
            state: '1',
            examine: '1',
            submitDate: '2024-11-17'
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

.reimbursement-table {
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
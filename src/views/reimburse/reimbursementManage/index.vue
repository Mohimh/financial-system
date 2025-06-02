<template>
    <div class="reimbursement-table">
        <el-button type="primary" round size="small">
            <el-icon><CirclePlus/></el-icon>
            新增
        </el-button>
        <el-table :data="tableData.list" border stripe style="width: auto">
            <!-- <el-table-column prop="department" label="部门"/> -->
            <el-table-column prop="topic" label="主题"/>
            <el-table-column prop="type" label="类型"/>
            <!-- <el-table-column prop="certificate" label="凭证"><template #default="scoped"></template></el-table-column> -->
            <el-table-column prop="total_amount" label="报销总金额"/>
            <!-- <el-table-column prop="content" label="内容"/> -->
            <el-table-column prop="applicant_id" label="申请人"/>
            <el-table-column prop="approve_by" label="审批人"/>
            <el-table-column label="审核意见">
                <template #default="{row}">
                    {{ row.status === '0' ? '--' : '同意' }}
                </template>
            </el-table-column>
            <el-table-column prop="created_at" label="提交时间"/>
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
                v-model:current-page="paginationData.page"
                v-model:page-size="paginationData.page_size"
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
            v-model="dialogFormVisible"
            :before-close="beforeClose"
            title="报销审批"
            width="400"
        >
            <el-form
                ref="formRef"
                label-width="100px"
                label-position="left"
                :model="form"
                :rules="rules"
            >
                <el-form-item prop="code" label="部门编码">
                    <el-input v-model="form.code" placeholder="请填写部门编码" />
                </el-form-item>
                <el-form-item prop="name" label="名称">
                    <el-input v-model="form.name" placeholder="请填写部门名称" />
                </el-form-item>
                <el-form-item prop="manager" label="部门负责人">
                    <el-input v-model="form.manager" placeholder="请填写部门负责人" />
                </el-form-item>
                <el-form-item prop="description" label="备注">
                    <el-input
                        v-model="form.description"
                        :rows="5"
                        type="textarea"
                        placeholder="请填写备注"
                    />
                </el-form-item>
                <el-form-item prop="status" label="部门状态">
                    <el-switch
                        v-model="form.status"
                        inline-prompt
                        style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                        :active-value=1
                        :inactive-value=2
                        active-text="使用"
                        inactive-text="禁用"
                    />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button type="info" @click="dialogFormVisible=false">取消</el-button>
                    <el-button type="primary" @click="confirm(formRef)">确认</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';

// 弹窗标题

// 分页
const paginationData = reactive({
    page: 1,
    page_size: 5,
})

const tableData = reactive({
    list: [],
    total: 0,
})



const handleSizeChange = (val) => {
    paginationData.page_size = val
    paginationData.page = 1 // 关键！修改每页大小后必须回到第一页
    getListData()
}
const handleCurrentChange = (val) => {
    paginationData.page = val
    getListData()
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
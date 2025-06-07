<template>
    <div class="reimbursement-table">
        <el-table :data="tableData.list" border stripe style="width: auto">
            <el-table-column prop="applicant_id" label="申请人" />
            <el-table-column prop="total_amount" label="报销总金额" />
            <el-table-column prop="approve_by" label="审批人" />
            <el-table-column prop="apply_date" label="申请时间" />
            <el-table-column prop="approve_time" label="审批时间" />
            <el-table-column prop="description" label="备注" />
            <el-table-column prop="status" label="状态">
                <template #default="{ row }">
                    <el-tag :type="tagStatus[row.reimbursement.status-1].type">{{ tagStatus[row.reimbursement.status-1].label }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="150px">
                <template #default="{row}">
                    <el-link :underline="false" type="warning" @click="open(row)">
                        <el-icon><CircleCheck /></el-icon>
                        审核
                    </el-link>
                </template>
            </el-table-column>
            <!-- <el-table-column prop="department" label="部门"/> -->
            <!-- <el-table-column prop="topic" label="主题"/> -->
            <!-- <el-table-column prop="type" label="类型"/> -->
            <!-- <el-table-column prop="certificate" label="凭证"><template #default="scoped"></template></el-table-column> -->
            <!-- <el-table-column prop="content" label="内容"/> -->
            <!-- <el-table-column label="审核意见">
                <template #default="{row}">
                    {{ row.status === '0' ? '--' : '同意' }}
                </template>
            </el-table-column> -->
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
            :title="dialogTitle"
            width="450"
        >
            <el-form
                ref="formRef"
                label-width="100px"
                label-position="left"
                :model="form"
                :rules="rules"
            >
                <el-form-item prop="applicant_name" label="申请人">
                    <el-input v-model="form.applicant_name" disabled />
                </el-form-item>
                <el-form-item prop="description" label="报销详情">
                    <el-input v-model="form.description" type="textarea" disabled />
                </el-form-item>
                <el-form-item prop="total_amount" label="报销金额">
                    <el-input v-model="form.total_amount" disabled />
                </el-form-item>
                <el-form-item prop="approver_name" label="审批人">
                    <el-input v-model="form.approver_name" disabled />
                </el-form-item>
                <el-form-item prop="opinion" label="审核意见">
                    <el-input v-model="form.opinion" type="textarea" />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button type="info" @click="dialogFormVisible=false">取消</el-button>
                    <el-button type="danger" @click="cancel(formRef)">驳回</el-button>
                    <el-button type="success" @click="confirm(formRef)">审核通过</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { nextTick, onMounted, reactive, ref } from 'vue';
import { reimburseApproval, reimburseList } from '@/api';
import { dayjs, ElMessage } from 'element-plus';
// 弹窗标题
const dialogTitle = ref('')
const dialogFormVisible = ref(false)

// 分页
const paginationData = reactive({
    page: 1,
    page_size: 5,
})

const tableData = reactive({
    list: [],
    total: 0,
})

onMounted(() => {
    getListData()
})

const beforeClose = () => {
    dialogFormVisible.value = false
    formRef.value.resetFields()
}

const rules = ref()
const formRef = ref()

// 表格状态栏
const tagStatus = ref([
    {
        label: '待审批',
        value: 1,
        type: 'warning',
    },
    {
        label: '已通过',
        value: 2,
        type: 'success',
    },
    {
        label: '已拒绝',
        value: 3,
        type: 'danger'
    },
    {
        label: '已通过',
        value: 4,
        type: 'success'
    },
    {
        label: '已拒绝',
        value: 5,
        type: 'danger'
    },
])

const user = JSON.parse(localStorage.getItem('fs_user'))

const getListData = () => {
    reimburseList({userId: user.id}).then(({data}) => {
        if (data.code === 0) {
            const { reimbursements, total } = data.data
            tableData.list = reimbursements
            tableData.total = total
            try {
                tableData.list.forEach(item => {
                    if (item.reimbursement.status === 2) {
                        if (user.id === 1) {
                            item.reimbursement.status = 1
                        }
                    }
                    item.approve_time = dayjs(item.approve_time).format('YYYY-MM-DD')
                    item.apply_date = dayjs(item.apply_date).format('YYYY-MM-DD')
                    if (item.approve_time === '2006-01-02') {
                        item.approve_time = '--'
                    }
                })
            } catch {
                console.log('暂无报销单');
            }
            ElMessage.success('成功')
            console.log('tabledata:', tableData)
        }
        else {
            console.log('失败');
        }
    })
}

const form = reactive({
    approver_id: null,
    applicant_name: '',
    approver_name: '',
    description: '',
    total_amount: null,
    opinion: '',
    status: null,
    steps: null,
    id: null,
})

const open = (rowData = {}) => {
    dialogFormVisible.value = true
    nextTick(() => {
        if (rowData) {
            console.log("rowData", rowData.reimbursement);
            dialogTitle.value = '报销审核'
            Object.assign(form, JSON.parse(JSON.stringify(rowData.reimbursement)))
            form.approver_id = user.id
            form.approver_name = user.real_name
            console.log('form', form);
            // form.createdAt = dayjs(form.createdAt).format('YYYY-MM-DD')
        }
    })
}

// 表单提交逻辑
const confirm = async (formEl) => {
    if (!formEl) return
    console.log('表单form:', form);
    
    await formEl.validate((valid, fields) => {
        if (valid) {
            if (user.id === 1) {
                form.steps = 2
                form.status = 2
                reimburseApproval(form.id, form).then(({ data }) => {
                    if (data.code === 0) {
                        ElMessage.success('审核成功')
                        beforeClose()
                        getListData()
                    }
                    else {
                        ElMessage.warning('错误')
                    }
                })
            }
            else {
                form.steps = 1
                form.status = 2
                reimburseApproval(form.id, form).then(({ data }) => {
                    if (data.code === 0) {
                        ElMessage.success('审核成功')
                        beforeClose()
                        getListData()
                    }
                    else {
                        ElMessage.warning('错误')
                    }
                })
            }
            
        }
        else {
            console.log('Error submit', fields)
        }
    })
}

const cancel = async (formEl) => {
    await formEl.validate((valid, fields) => {
        if (valid) {
            if (user.id === 1) {
                form.steps = 2
                form.status = 3
                reimburseApproval(form.id, form).then(({ data }) => {
                    if (data.code === 0) {
                        ElMessage.success('驳回成功')
                        beforeClose()
                        getListData()
                    }
                    else {
                        ElMessage.warning('错误')
                    }
                })
            }
            else {
                form.steps = 1
                form.status = 3
                reimburseApproval(form.id, form).then(({ data }) => {
                    if (data.code === 0) {
                        ElMessage.success('驳回成功')
                        beforeClose()
                        getListData()
                    }
                    else {
                        ElMessage.warning('错误')
                    }
                })
            }
            
        }
        else {
            console.log('Error submit', fields)
        }
    })
}

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
    padding: 20px;
    .el-table {
        margin-bottom: 20px;
        .el-link {
            margin: 0 5px;
        }
    }
}
</style>
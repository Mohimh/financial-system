<template>
    <div class="fund-transaction">
        <el-button type="primary" round size="small" @click="open(null)">
            <el-icon><CirclePlus/></el-icon>
            新增
        </el-button>

        <el-table :data="tableData.list" border stripe style="width: auto">
            <el-table-column prop="id" label="流水ID" />
            <el-table-column prop="account_name" label="账户名称" />
            <el-table-column prop="name" label="客户名称" />
            <el-table-column prop="transaction_type" label="交易类型" />
            <el-table-column prop="amount" label="金额" />
            <el-table-column prop="balance_before" label="交易前余额" />
            <el-table-column prop="balance_after" label="交易后余额" />
            <el-table-column prop="transaction_date" label="交易日期" />
            <el-table-column prop="remark" label="备注" />
            <el-table-column prop="created_at" label="创建时间" />
            <el-table-column label="操作" width="150">
                <template #default="{ row }">
                    <el-link :underline="false" type="primary" @click="check(row)">
                        <el-icon><EditPen /></el-icon>
                        查看
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
            :title="dialogTitle" 
            width="400"
        >
            <el-form 
                :model="form" 
                :rules="rules" 
                ref="formRef"
            >
                <el-form-item label="账户名称" prop="account_code">
                    <el-input v-model="form.account_code" />
                </el-form-item>
                <el-form-item label="初始余额" prop="account_name">
                    <el-input v-model="form.account_name" />
                </el-form-item>
                <el-form-item label="账户类型" prop="type">
                    <el-select 
                        v-model="form.account_type"
                        placeholder="请选择科目"
                        style="width: 240px"
                    >
                        <el-option 
                            v-for="item in TYPES"
                            :key="item.code"
                            :label="item.type"
                            :value="item.code"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item prop="status" label="状态">
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
                <el-button type="info" @click="dialogFormVisible=false">取消</el-button>
                <el-button type="primary" @click="confirm(formRef)">确认</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { accountCreate, accountDelete, accountList, accountUpdate, accountTypeList } from '@/api';
import { ref, reactive, nextTick, onMounted } from 'vue';
import { dayjs, ElMessage } from 'element-plus';

const dialogTitle = ref('')

const paginationData = reactive({
    page: 1,
    page_size: 5,
})

const tableData = reactive({
    list: [],
    total: 0,
})

let TYPES = ref([])

onMounted(() => {
    getListData()
    getAccountType()
})

const getListData = () => {
    accountList(paginationData).then(({ data }) => {
        const { accounts, total } = data.data
        tableData.list = accounts
        tableData.total = total
        try{
            tableData.list.forEach(item => {
                item.created_at = dayjs(item.created_at).format('YYYY-MM-DD')
            })
        } catch {
            console.log('暂无无账户')
        }
        console.log('账户列表:', tableData)
    })
}

const getAccountType = () => {
    accountTypeList().then(({ data }) => {
        const { types, total } = data.data
        TYPES = types
    })
}

const open = (rowData = {}) => {
    dialogFormVisible.value = true
    nextTick(() => {
        if (rowData) {
            dialogTitle.value = '账户编辑'
            Object.assign(form, JSON.parse(JSON.stringify(rowData)))
        } else {
            dialogTitle.value = '添加账户'
        }   
    })
} 

const edit = (rowData) => {
    dialogFormVisible.value = true
    open(rowData)
    console.log(rowData)
}

const cancel = (rowData) => {
    accountDelete(rowData.id).then(({ data }) => {
        if (data.code === 0) {
            ElMessage.success('删除成功')
            getListData()
        }
    })
}

const dialogFormVisible = ref(false)

const beforeClose = () => {
    dialogFormVisible.value = false
    formRef.value.resetFields()
}

const rules = reactive({
    account_code: [{ required: true, trigger: 'blur', message: '请填写账户编码'}],
    account_name: [{ required: true, trigger: 'blur', message: '请填写账户名称'}],
    status: [{ required: true, trigger: 'blur' }],
})

const formRef = ref()

const form = reactive({
    id: null,
    account_code: '',
    account_name: '',
    account_type: null,
    parent_id: null,
    status: 1,
    created_at: '',
})

const confirm = async (formEl) => {
    if (!formEl) return
    console.log('form:', form)
    await formEl.validate((valid, fields) => {
        if (valid) {
            // 添加会计科目
            if (dialogTitle.value === '添加账户') {
                accountCreate(form).then(({ data }) => {
                    if (data.code === 0) {
                        ElMessage.success('提交成功')
                        beforeClose()
                        getListData()
                    }
                })
            }
            // 会计科目编辑
            else {
                accountUpdate(form.id, form).then(({ data }) => {
                    if (data.code === 0) {
                        ElMessage.success('编辑成功')
                        beforeClose()
                        getListData()
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
    getListData()
}
const handleCurrentChange = (val) => {
    paginationData.page = val
    getListData()
}
</script>

<style lang="less" scoped>
.fund-transaction {
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
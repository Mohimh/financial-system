<template>
    <div class="account">
        <el-button type="primary" round size="small" @click="open(null)">
            <el-icon><CirclePlus/></el-icon>
            新增
        </el-button>

        <el-table :data="tableData.list" border stripe style="width: auto">
            <el-table-column prop="id" label="账户id" />
            <el-table-column prop="account_name" label="账户名称" />
            <el-table-column prop="account_type_name" label="账户类型" />
            <el-table-column prop="balance" label="当前余额" />
            <el-table-column prop="status" label="状态" />
            <el-table-column prop="created_at" label="创建时间" />
            <el-table-column label="操作" width="150">
                <template #default="{ row }">
                     <el-link :underline="false" type="primary" @click="edit(row)">
                        <el-icon><EditPen /></el-icon>
                        编辑
                    </el-link>
                    <el-link :underline="false" type="danger" @click="cancel(row)">
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
            :title="dialogTitle" 
            width="400"
        >
            <el-form 
                :model="form" 
                :rules="rules" 
                ref="formRef"
                label-width="100px"
                label-position="left"
            >
                <el-form-item label="账户名称" prop="account_name">
                    <el-input v-model="form.account_name" />
                </el-form-item>
                <el-form-item label="初始余额" prop="balance">
                    <el-input-number v-model.number="form.balance" :precision="2" :max="100000" :controls="false" :disabled="balanceDisabled" />
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
            balanceDisabled.value = true
            dialogTitle.value = '账户编辑'
            Object.assign(form, JSON.parse(JSON.stringify(rowData)))
        } else {
            balanceDisabled.value = false
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
const balanceDisabled = ref(false)

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
    balance: 0,
    account_type: null,
    parent_id: null,
    status: 1,
    created_at: '',
})

const confirm = async (formEl) => {
    if (!formEl) return
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
.account {
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
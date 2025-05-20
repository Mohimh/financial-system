<template>
    
    <div class="department-table">
        <el-button type="primary" round size="small" @click="open(null)">
            <el-icon><CirclePlus/></el-icon>
            新增
        </el-button>
        <el-table :data="tableData.list" border stripe style="width: auto;">
            <el-table-column prop="id" label="部门id"/>
            <el-table-column prop="name" label="名称"/>
            <el-table-column prop="manager" label="部门负责人"/>
            <el-table-column prop="description" label="备注"/>
            <el-table-column prop="createdAt" label="录入时间"/>
            <el-table-column prop="status" label="状态">
                <!-- 这里有问题 -->
                <template #default="{ row }">
                    <el-switch
                        v-model="row.status"
                        disabled
                        :active-value=1
                        :inactive-value=2
                        style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                    />
                </template>
            </el-table-column>
            <el-table-column label="操作">
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
            v-model="dialogFormVisable"
            :before-close="beforeClose"
            title="部门添加"
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
                 <el-form-item prop="status" label="性别">
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
                <el-form-item prop="createdAt" label="录入时间">
                    <el-input v-model="form.createdAt" disabled/>
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button type="info" @click="dialogFormVisable=false">取消</el-button>
                    <el-button type="primary" @click="confirm(formRef)">确认</el-button>
                </div>
            </template>
        </el-dialog>
    </div>

</template>

<script setup>
import { ref, reactive, nextTick, onMounted } from 'vue'
import { departmentList, departmentCreate, departmentDelete } from '@/api'
import { ElMessage } from 'element-plus';

// 分页
const paginationData = reactive({
    page: 1,
    page_size: 10,
})

// 测试数据
const tableData = reactive({
    list: [],
    total: 0
})

onMounted(() => {   
    getListData()
})

// 请求列表
const getListData = () => {
    departmentList(paginationData).then(({ data }) => {
        const { list, total } = data.data
        tableData.list = list
        tableData.total = total
        console.log(tableData.total)
        console.log(tableData.list)
    })
}

const open = (rowData = {}) => {
    dialogFormVisable.value = true
    nextTick(() => {
        if (rowData) {
            Object.assign(form, JSON.parse(JSON.stringify(rowData)))
        } else {
            form.createdAt = new Date().toLocaleString();
        }
    })
} 

const edit = (rowData) => {
    dialogFormVisable.value = true
    open(rowData)
    console.log(rowData)
}

const cancel = (rowData) => {
    departmentDelete(rowData.id).then(() => {
        ElMessage.success('删除成功')
        getListData()
    })
}

const dialogFormVisable = ref(false)

const beforeClose = () => {
    dialogFormVisable.value = false
    formRef.value.resetFields()
}

const rules = reactive({
    code: [{ required: true, trigger: 'blur', message: '请填写部门编码'}],
    name: [{ required: true, trigger: 'blur', message: '请填写姓名'}],
    status: [{ required: true, trigger: 'blur' }],
})

const formRef = ref()

const form = reactive({
    code: '',
    id: '',
    description: '',
    manager: '',
    name: '',
    status: 1,
    createdAt: '',
})

const confirm = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log('测试数据状态值为：', form.status)
            departmentCreate(form).then(({ data }) => {
                if (data.code === 0) {
                    ElMessage.success('成功')
                    beforeClose()
                    getListData()
                }
                else {
                    ElMessage.error(data.message)
                }
            })
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
    .el-dialog {
        .dialog-footer {
            .el-button {
                margin: 10px 10px;
            }
        }
    }
}

</style>
<template>
    
    <div class="department-table">
        <el-button type="primary" round size="small" @click="open(null)">
            <el-icon><CirclePlus/></el-icon>
            新增
        </el-button>
        <el-table :data="tableData.list" border stripe style="width: auto;">
            <el-table-column prop="name" label="名称"/>
            <el-table-column prop="notes" label="备注"/>
            <el-table-column prop="enter" label="录入时间"/>
            <el-table-column label="操作">
                <template #default=scoped>
                    <el-link :underline="false" type="primary" @click="edit(scoped.row)">
                    <el-icon><EditPen /></el-icon>
                    编辑
                </el-link>
                <el-link :underline="false" type="danger" @click="cancel(scoped.row)">
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
                <el-form-item prop="name" label="名称">
                    <el-input v-model="form.name" placeholder="请输入部门名称" />
                </el-form-item>
                <el-form-item prop="notes" label="备注">
                    <el-input v-model="form.notes" placeholder="请输入备注" />
                </el-form-item>
                <el-form-item prop="enter" label="录入时间">
                    <el-input v-model="form.enter" />
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
import { ref, reactive, nextTick } from 'vue'

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

const open = (rowData = {}) => {
    dialogFormVisable.value = true
    nextTick(() => {
        if (rowData) {
            Object.assign(form, { name: rowData.name, notes: rowData.notes, enter: rowData.enter})
        }
    })
} 

const edit = (rowData) => {
    dialogFormVisable.value = true
    open(rowData)
}

const cancel = (rowData) => {

}

const dialogFormVisable = ref(false)

const beforeClose = () => {
    dialogFormVisable.value = false
    formRef.value.resetFields()
}

const formRef = ref()

const form = reactive({
    name: '',
    notes: '',
    enter: '',
})

const rules = reactive({
    name: [{ require: true, trigger: 'blur', message: '请填写姓名'}],
})

const confirm = async (formEl) => {
    if (!formEl) return
    // await formEl.validate((valid, fields) => {
    //     if (valid) {
    //         companion(form).then(({ data }) => {
    //             if (data.code === 10000) {
    //                 ElMessage.success('成功')
    //                 beforeClose()
    //                 getListData()
    //             }
    //             else {
    //                 ElMessage.error(data.message)
    //             }
    //         })
    //     }
    //     else {
    //         console.log('Error submit', fields)
    //     }
    // })
}

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
    .el-dialog {
        .dialog-footer {
            .el-button {
                margin: 10px 10px;
            }
        }
    }
}

</style>
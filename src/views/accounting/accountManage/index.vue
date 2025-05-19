<template>
    <div class="account-manage">
        <el-button type="primary" round size="small" @click="open(null)">
            <el-icon><CirclePlus/></el-icon>
            新增
        </el-button>

        <el-table :data="tableData.list" border stripe style="width: auto">
            <el-table-column prop="code" label="科目编码" />
            <el-table-column prop="name" label="科目名称" />
            <el-table-column prop="type" label="科目类型" />
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
            v-model="dialogFormVisable"
            :before-close="beforeClose"
            :title="dialogTitle" 
            width="400"
        >
            <el-form 
                :model="form" 
                :rules="rules" 
                ref="formRef"
            >
                <el-form-item label="科目编码" prop="code">
                    <el-input v-model="form.code" />
                </el-form-item>
                <el-form-item label="科目名称" prop="name">
                    <el-input v-model="form.name" />
                </el-form-item>
                <el-form-item label="科目类型" prop="type">
                    <el-select 
                        v-model="form.type"
                        placeholder="请选择科目"
                        style="width: 240px"
                    >
                        <el-option 
                            v-for="item in ACCOUNTMANAGE_OPTIONS"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button @click="dialogFormVisable=false">取消</el-button>
                <el-button type="primary" @click="submitForm">确认</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, reactive, nextTick, onMounted } from 'vue';
import { accountRead } from '@/api';

const paginationData = reactive({
    page: 1,
    page_size: 10
})

const tableData = ({
    list: [
        {
            code: '123',
            name: 'name1',
            type: 1,
        },
        {
            code: '321',
            name: 'name2',
            type: 2,
        }
    ],
    total: 10
})

const getListData = () => {
    accountRead(paginationData).then(({ data }) => {
        console.log(data, 'accountRead')
        const { budgets, total } = data.data
        tableData.list = budgets
        tableData.total = total
    })
}


const open = (rowData = {}) => {
    dialogFormVisable.value = true
    nextTick(() => {
        if (rowData) {
            console.log('ok')
            dialogTitle.value = '会计科目查询'
            Object.assign(form, JSON.parse(JSON.stringify(rowData)))
        } else {
            dialogTitle.value = '会计科目添加'
            form.enter = new Date().toLocaleString();
        }   
    })
} 


onMounted(() => {
    getListData()
})


const dialogTitle = ref('')

const ACCOUNTMANAGE_OPTIONS = [
    {value: '1', label: '资产' },
    {value: '2', label: '负债' },
    {value: '3', label: '权益' },
]

const edit = (rowData) => {
    dialogFormVisable.value = true
    open(rowData)
}

const cancel = (rowData) => {

}

const submitForm = () => {}

const dialogFormVisable = ref(false)

const beforeClose = () => {
    dialogFormVisable.value = false
    formRef.value.resetFields()
}

const rules = reactive({})

const formRef = ref()

const form = reactive({

})

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
.account-manage {
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
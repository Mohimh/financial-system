<template>
    
    <div class="stuff-table">
        <el-button type="primary" round size="small" @click="open(null)">
            <el-icon><CirclePlus/></el-icon>
            新增
        </el-button>
        <el-table :data="tableData.list" border stripe style="width: auto">
            <el-table-column prop="department" label="部门" width="75px"/>
            <el-table-column prop="account" label="账号" width="80px"/>
            <el-table-column prop="name" label="姓名" width="80px"/>
            <el-table-column label="性别" width="75px">
                <template #default="scoped">  
                    <el-tag type="success">
                        {{ scoped.row.gender === 0 ? '男' : '女' }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="birth" label="生日"/>
            <el-table-column prop="tel" label="电话"/>
            <el-table-column prop="email" label="邮箱" width="150px"/>
            <el-table-column prop="entry" label="入职"/>
            <el-table-column prop="address" label="地址"/>
            <el-table-column prop="state" label="状态">
                <template #default="scoped">
                    <el-switch
                        v-model="scoped.row.state"
                        disabled
                        :style="scoped.row.state === true ? '--el-switch-on-color: #13ce66' : '--el-switch-off-color: #ff4949'"
                    />
                </template>
            </el-table-column>
            <el-table-column prop="enter" label="录入时间" width="175px"/>
            <el-table-column label="操作">
                <template #default="scoped">
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
            title="员工添加"
            width="500"
        >
            <el-form
                ref="formRef"
                label-width="100px"
                label-position="left"
                :model="form"
                :rules="rules"
            >
                <el-form-item prop="department" label="部门">
                    <el-dropdown trigger="click">
                        <span class="el-dropdown-link">
                        请选择所属部门<el-icon class="el-icon--right"><arrow-down /></el-icon>
                        </span>
                        <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>研发部</el-dropdown-item>
                            <el-dropdown-item>销售部</el-dropdown-item>
                        </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </el-form-item>
                <el-form-item prop="account" label="账号">
                    <el-input v-model="form.account" disabled />
                </el-form-item>
                <el-form-item prop="name" label="姓名">
                    <el-input v-model="form.name" placeholder="请输入员工姓名" />
                </el-form-item>
                <el-form-item prop="gender" label="性别">
                    <el-switch
                        v-model="form.gender"
                        class="ml-2"
                        inline-prompt
                        style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                        active-text="男"
                        inactive-text="女"
                    />
                </el-form-item>
                <el-form-item prop="tel" label="电话">
                    <el-input v-model="form.tel" placeholder="请输入手机号" />
                </el-form-item>
                <el-form-item prop="email" label="邮箱">
                    <el-input v-model="form.email" placeholder="请输入邮箱" />
                </el-form-item>
                <el-form-item prop="entry" label="入职时间">
                    <el-input v-model="form.entry" disabled />
                </el-form-item>
                <el-form-item prop="address" label="地址">
                    <el-input v-model="form.enter" placeholder="请填写地址"/>
                </el-form-item>
                <el-form-item prop="enter" label="录入时间">
                    <el-input v-model="form.enter" disabled/>
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button type="info" @click="beforeClose()">取消</el-button>
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
const tableData = reactive({
    list: 
    [
        {
            department: '研发部',
            account: '2024001',
            name: '张小斐',
            gender: 1,
            birth: '1996-07-11',
            tel: '11111111',
            email: '111@qq.com',
            entry: '2020-08-01',
            address: '广东深圳',
            state: true,
            enter: '2024-11-16 21:13:04'
        },
        {
            department: '研发部',
            account: '2024002',
            name: '张亮',
            gender: 0,
            birth: '1990-08-16',
            tel: '11111112',
            email: '111324@qq.com',
            entry: '2020-08-01',
            address: '广东深圳',
            state: true,
            enter: '2024-11-16 21:13:04'
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

const rules = reactive({
    department: [{ required: true}],
    account: [{ required: true, trigger: 'blur'}],
    name: [{ required: true, trigger: 'blur', message: '请填写姓名'}],
    gender: [{ required: true}],
    tel: [{ required: true, trigger: 'blur', message: '请填写电话'}],
    email: [{ required: true, trigger: 'blur', message: '请填写邮箱'}],
    address: [{ required: true, trigger: 'blur', message: '请填写地址'}]
})

const form = reactive({
    account: '',
    name: '',
    gender: '',
    tel: '',
    email: '',
    entry: '',
    address: '',
    enter: '',
})

const formRef = ref()

const confirm = async (formEl) => {
    if (!formEl) return
}

const handleSizeChange = () => {

}
const handleCurrentChange = () => {
    
}

</script>

<style lang="less" scoped>

.stuff-table {
    background-color: #fff;
    .el-button {
        margin: 15px 20px;
    }
    .el-table {
        margin: 0 20px;
        .el-link {
            margin: 0 3px;
        }
    }
}
</style>
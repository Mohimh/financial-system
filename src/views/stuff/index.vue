<template>
    
    <div class="stuff-table">
        <el-button type="primary" round size="small" @click="open(null)">
            <el-icon><CirclePlus/></el-icon>
            新增
        </el-button>
        <el-table :data="stuffData.list" border stripe style="width: auto">
            <el-table-column prop="department_name" label="部门" width="75px"/>
            <el-table-column prop="real_name" label="姓名" width="100px"/>
            <!-- 需要但尚未获取 -->
            <el-table-column label="性别" width="75px">
                <template #default="scoped">  
                    <el-tag type="success">
                        {{ scoped.row.sex === '男' ? '男' : '女' }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="phone" label="电话"/>
            <el-table-column prop="email" label="邮箱"/>
            <el-table-column prop="create_time" label="入职时间"/>
            <el-table-column prop="position" label="地址"/>
            <el-table-column prop="status" label="状态">
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
            <!-- <el-table-column prop="enter" label="录入时间" width="175px"/> -->
            <el-table-column label="操作">
                <template #default="{row}">
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
                v-model:current-page="stuffPaginationData.page"
                v-model:page-size="stuffPaginationData.page_size"
                :page-sizes="[5, 10]"
                size="small"
                :background="false"
                layout="total, sizes, prev, pager, next, jumper"
                :total="stuffData.total"
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
            <!-- 未就职员工筛选 -->
            <el-form :inline="true" label-width="100px" label-position="left">
                <el-form-item label="闲置员工">
                    <el-select 
                        v-model="query.id" 
                        style="width: 200px;" 
                        placeholder="在此处选择闲置员工"
                        @change="handleUserSelect"
                    >
                        <el-option 
                            v-for="item in nonUserData.list" 
                            :key="item.id" 
                            :label="item.real_name" 
                            :value="item.id" 
                        />
                    </el-select>
                </el-form-item>
            </el-form>

            <el-form
                ref="formRef"
                label-width="100px"
                label-position="left"
                :model="form"
                :rules="rules"
            >
                <el-form-item prop="department_id" label="部门">
                        <el-select
                            v-model="form.department_id"
                            placeholder="请选择部门"
                            size="default"
                        >
                            <el-option
                                v-for="item in DEPARTMENT_OPTIONS.list"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            />
                        </el-select>
                </el-form-item>
                <el-form-item prop="real_name" label="姓名">
                    <el-input v-model="query.real_name" placeholder="请输入员工姓名" disabled />
                </el-form-item>
                <el-form-item prop="sex" label="性别">
                    <el-switch
                        v-model="query.sex"
                        disabled
                        inline-prompt
                        style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                        active-value="男"
                        inactive-value="女"
                        active-text="男"
                        inactive-text="女"
                    />
                </el-form-item>
                <el-form-item prop="emerg_phone" label="电话">
                    <el-input v-model="form.emerg_phone" placeholder="请输入手机号" />
                </el-form-item>
                <el-form-item prop="email" label="邮箱">
                    <el-input v-model="query.email" placeholder="请输入邮箱" disabled />
                </el-form-item>
                <el-form-item prop="position" label="地址">
                    <el-input v-model="form.position" placeholder="请填写地址"/>
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
import { ref, reactive, nextTick, onMounted, watch } from 'vue'
import { stuffList, stuffCreate, nonEmployeeList, stuffDel, userList } from '@/api'
import { departmentList } from '@/api'
import { ElMessage } from 'element-plus'

// 员工分页
const stuffPaginationData = reactive({
    page: 1,
    page_size: 5,
})

// 员工筛选项
const query = reactive({
    id: null,
    job_number: '',
    real_name: '',
    sex: '男',
    phone: '',
    email: '',
})

// 表单字段
const form = reactive({
    user_id: null,
    department_id: '',
    emerg_phone: '',
    position: '',
})
const formRef = ref()

// 员工列表
const stuffData = reactive({
    list: [],
    total: 0,
})

// 未入职人员名单
const nonUserData = reactive({
    list: [],
    total: 0,
})

// 部门名单
const DEPARTMENT_OPTIONS = reactive({
    list: [],
    total: 0,
})

// 页面初始
onMounted(() => {
    getStuffData()
    getNonuserData()
    getDepartmentData()
    console.log('query:', query)
})

// 请求员工列表
const getStuffData = () => {
    stuffList(stuffPaginationData).then(({ data }) => {
        if (data.code === 0) {
            const { stuffs, total } = data.data
            stuffData.list = stuffs
            stuffData.total = total
            ElMessage.success('获取员工列表成功')
            console.log('员工列表:', stuffData)
        }
        else {
            ElMessage.warning('获取员工列表失败')
        }
    })
}

// 请求未入职人员列表
const getNonuserData = () => {
    nonEmployeeList().then(({ data }) => {
        if (data.code === 0) {
            nonUserData.list.splice(0, nonUserData.list.length)
            nonUserData.total = 0
            const { users } = data.data
            users.forEach(item => {
                if (item.real_name) {
                    nonUserData.list.push(item)
                    nonUserData.total += 1
                }
            });
            ElMessage.success('获取未入职人员列表成功')
            console.log('未入职人员列表:', nonUserData)
        }
        else {
            console.log('获取未入职人员列表失败');   
        }
    })
}

// 请求部门列表
const getDepartmentData = () => {
    departmentList().then(({ data }) => {
        if (data.code === 0) {
            const { list, total } = data.data
            DEPARTMENT_OPTIONS.list = list
            DEPARTMENT_OPTIONS.total = total
            ElMessage.success('获取部门列表请求成功')
            console.log('部门信息:', DEPARTMENT_OPTIONS)
        }
        else {
            ElMessage.success('获取部门列表请求失败')
        }
    })
}

// 选择未就业员工逻辑
const handleUserSelect = (id) => {
    try {
    const stuff = nonUserData.list.find((item) => item.id === id)
    if (stuff) {
        Object.assign(query, stuff)
    }
    } catch (error) {
        console.error('获取用户信息失败:', error);
    }
}

// 表单打开逻辑
const open = (rowData = {}) => {
    dialogFormVisable.value = true
    nextTick(() => {
        if (rowData) {
            Object.assign(form, JSON.parse(JSON.stringify(rowData)))
        } else {
            form.enter = new Date().toLocaleString();
        }
    })
} 

// 编辑表单
const edit = (rowData) => {
    dialogFormVisable.value = true
    open(rowData)
}

// 删除表单
const cancel = (rowData) => {

}

// 弹框是否可视
const dialogFormVisable = ref(false)

// 关闭弹框
const beforeClose = () => {
    dialogFormVisable.value = false
    formRef.value.resetFields()
    Object.keys(query).forEach(key => delete query[key])
    query.sex = '男'
}

// 表单校验逻辑
const rules = reactive({
    department_id: [{ required: true }],
})

// 表单提交逻辑
const confirm = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            form.job_number = `00${query.id}`
            form.user_id = query.id
            console.log('form:', form)
            stuffCreate(form).then(({ data }) => {
                if (data.code === 0) {
                    ElMessage.success('表单提交成功成功')
                    beforeClose()
                    getListData()
                } else {
                    ElMessage.warning('表单提交错误')
                }
            })
        }
        else {
            console.log('Error submit', fields)
        }
    })
}

// 员工列表分页切换
const handleSizeChange = (val) => {
    stuffPaginationData.page_size = val
    getListData()
}
const handleCurrentChange = (val) => {
    stuffPaginationData.page = val
    getListData()
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
<template>
    <div class="salary-table">
        <el-button type="primary" round size="small" @click="open(null)">
            <el-icon>
                <CirclePlus />
            </el-icon>
            新增
        </el-button>

        <el-table :data="tableData.list" border stripe style="width: auto;">
            <el-table-column prop="month" label="月份" />
            <el-table-column prop="department_name" label="部门" />
            <el-table-column prop="employee_name" label="员工" />
            <el-table-column prop="base_salary" label="基本工资" />
            <!-- <el-table-column prop="allowance" label="津贴" /> -->
            <!-- <el-table-column prop="overtime_pay" label="加班费" /> -->
            <!-- <el-table-column prop="performance_salary" label="绩效工资" /> -->
            <!-- <el-table-column prop="bonus" label="额外奖金" /> -->
            <!-- <el-table-column prop="deduction" label="扣除金额" /> -->
            <el-table-column prop="total_salary" label="工资合计" />
            <el-table-column label="状态">
                <template #default="{ row }">
                    <el-tag :type="row.state === '0' ? 'info' : 'success'">
                        {{ row.state === '0' ? '待发放' : '已发放' }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="remark" label="备注" />
            <el-table-column prop="payment_date" label="支付日期" />
            <el-table-column label="操作" width="200px">
                <template #default="{ row }">
                    <el-link :underline="false" type="info" @click="check(row)">
                        <el-icon><View /></el-icon>
                        查看
                    </el-link>
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
            width="900"
        >
            <el-form 
                ref="formRef" 
                label-width="100px" 
                :model="form" 
                :rules="rules"
            >
                <el-row :gutter="50">
                    <el-col :span="12">
                        <el-form-item prop="date" label="日期">
                            <el-date-picker v-model="form.date" type="date" placeholder="选择日期" size="default" />
                        </el-form-item>
                        <el-form-item prop="department_id" label="部门">
                            <el-select 
                                v-model="form.department_id" 
                                placeholder="请选择部门" 
                                style="width: 240px"
                                :disabled="departmentSelect"
                                @change="departmentChange"
                            >
                                <!-- :disabled="departmentSelect" -->
                                <el-option 
                                    v-for="item in DEPARTMENT_OPTIONS" 
                                    :key="item.id" 
                                    :label="item.name"
                                    :value="item.id" 
                                />
                            </el-select>
                        </el-form-item>
                        <el-form-item prop="employee_id" label="员工姓名">
                            <el-select 
                                v-model="form.employee_id" 
                                placeholder="请选择部门" 
                                style="width: 240px"
                                @change="stuffChange"
                            >
                                <el-option 
                                    v-for="item in STUFF_OPTIONS" 
                                    :key="item.stuff_id" 
                                    :label="item.real_name"
                                    :value="item.stuff_id" 
                                />
                            </el-select>
                        </el-form-item>
                        <el-form-item prop="remark" label="备注">
                            <el-input v-model="form.remark" :rows="6" type="textarea" />
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item prop="base_salary" label="基本工资">
                            <el-input v-model.number="form.base_salary" type="text" placeholder="请输入基本工资" />
                        </el-form-item>
                        <el-form-item prop="overtime_pay" label="加班费">
                            <el-input v-model.number="form.overtime_pay" type="text" placeholder="请输入加班费" />
                        </el-form-item>
                        <el-form-item prop="allowance" label="津贴">
                            <el-input v-model.number="form.allowance" type="text" placeholder="请输入津贴" />
                        </el-form-item>
                        <el-form-item prop="bonus" label="奖金">
                            <el-input v-model.number="form.bonus" type="text" placeholder="请输入奖金" />
                        </el-form-item>
                        <el-form-item prop="performance_salary" label="绩效工资">
                            <el-input v-model.number="form.performance_salary" type="text" placeholder="请输入绩效工资" />
                        </el-form-item>
                        <el-form-item prop="deduction" label="扣除金额">
                            <el-input v-model.number="form.deduct" type="text" placeholder="请输入扣除金额" />
                        </el-form-item>
                        <el-form-item label="工资合计">
                            <el-input :value="calculateTotal" disabled />
                        </el-form-item>
                    </el-col>
                </el-row>
                
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button type="info" @click="dialogFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="confirm(formRef)">确认</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, reactive, nextTick, computed, onMounted } from 'vue'
import { stuffList, departmentList, stuffDetailList } from '@/api'
import { salaryCreate, salaryList } from '@/api/salary'
import { dayjs, ElMessage } from 'element-plus'

// 弹框信息
const dialogTitle = ref('')

// 分页
const paginationData = reactive({
    page: 1,
    page_size: 5
})

// 测试数据
const tableData = reactive({
    list: [],
    total: 0
})

onMounted(() => {
    getListData()
    getDepartmentData()
    getStuffData()
})

const getListData = () => {
    salaryList(paginationData).then(({ data }) => {
        if (data.code === 0) {
            const { salaries, total } = data.data
            tableData.list = salaries 
            tableData.total = total
            try{
                tableData.list.forEach(item => {
                    item.created_at = dayjs(item.created_at).format('YYYY-MM-DD')
                });
                tableData.list.forEach(item => {
                    item.payment_date = dayjs(item.payment_date).format('YYYY-MM-DD')
                });
            } catch {
                console.log('暂无无工资信息')
                // 此处可添加无部门时部门编码问题
            }
            console.log('工资信息列表:', tableData)
        }
    })
}

const DEPARTMENT_OPTIONS = ref([])
const STUFF_OPTIONS = ref([])

const getDepartmentData = () => {
    departmentList().then(({ data }) => {
        if (data.code === 0) {
            const { list } = data.data
            DEPARTMENT_OPTIONS.value = list
            console.log('department:', DEPARTMENT_OPTIONS.value)
        }
    })
}

const getStuffData = () => {
    stuffList().then(({ data }) => {
        console.log(data.data);
        if (data.code === 0) {
            const { stuffs } = data.data
            STUFF_OPTIONS.value = stuffs
            console.log("stuff:", STUFF_OPTIONS.value)
        }
    })
}

const departmentSelect = ref(false)
const stuffChange = () => {
    departmentSelect.value = true
    stuffDetailList(form.employee_id).then(({data}) => {
        if (data.code === 0) {
            form.department_id = data.data.department_id
        }
    })
}
const departmentChange = () => {
    stuffList({department_id: form.department_id}).then(({ data }) => {
        if (data.code === 0) {
            const { stuffs } = data.data
            console.log('筛选后的stuff:', data.data)
            STUFF_OPTIONS.value = stuffs
            console.log("部门筛选后的stuff:", STUFF_OPTIONS.value)
        }
    })
}

const open = (rowData = {}) => {
    dialogFormVisible.value = true
    nextTick(() => {
        if (rowData) {
            Object.assign(form, JSON.parse(JSON.stringify(rowData)))
        } else {
            dialogTitle.value = '添加工资信息'
        }
    })
}

const check = (rowData) => {
    dialogFormVisible.value 
    dialogTitle.value = '工资信息查看'
    open(rowData)
}

const edit = (rowData) => {
    dialogFormVisible.value = true
    dialogTitle.value = '工资信息编辑'
    open(rowData)
    console.log(rowData)
}

const cancel = (rowData) => {
    salaryDel(rowData.id).then(({ data }) => {
        if (data.code === 0) {
            ElMessage.success('删除成功')
            getListData()
        }
    })
}

const dialogFormVisible = ref(false)

const beforeClose = () => {
    dialogFormVisible.value = false
    departmentSelect.value = false
    formRef.value.resetFields()
}

const rules = reactive({
    date: [{ required: true, message: '请选择日期' }],
    department_id: [{ required: true, message: '请选择部门' }],
    employee_id: [{ required: true, trigger: 'blur', message: '请填写姓名' }],
    base_salary: [{ required: true, trigger: 'blur', message: '请填写基本工资' }],
})

const form = reactive({
    date: '',
    month: null,
    year: null,
    department_id: null,
    employee_id: '',
    base_salary: null,
    allowance: null,
    bonus: null,
    overtime_pay: null,
    performance_salary: null,
    deduction: null,
    remark: '',
})
const formRef = ref()

// const calculateTotal = computed(() => {
//     return (
//         (form.base_salary || 0) +
//         (form.allowance || 0) +
//         (form.bonus || 0) +
//         (form.performance_salary || 0) +
//         (form.overtime_pay || 0) -
//         (form.deduction || 0)
//     )
// })

const confirm = async (formEl) => {
    form.year = parseInt(dayjs(form.date).format('YYYY'), 10)
    form.month = parseInt(dayjs(form.date).format('MM'), 10)
    console.log('表单form:', form)
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log('表单form:', form)
            salaryCreate(form).then(({ data }) => {
                if (data.code === 0) {
                    ElMessage.success('添加成功')
                    beforeClose()
                    getListData()
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
    paginationData.page = 1 // 关键！修改每页大小后必须回到第一页
    getListData()
}
const handleCurrentChange = (val) => {
    paginationData.page = val
    getListData()
}
</script>

<style lang="less" scoped>
.salary-table {
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

    .el-form {
        .el-form-item {
            .el-input {
                width: 80%;
            }
        }
    }
}
</style>